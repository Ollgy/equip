const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const image = require('gulp-image');
const sourcemaps = require('gulp-sourcemaps');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const paths = {
  root: './dist',
  template: {
    src: './index.html',
    dest: './dist/'
  },
  styles: {
    src: './src/**/**/*.scss',
    dest: './dist/assets/styles/'
  },
  scripts: {
    src: './src/**/**/*.js',
    main: './src/index.js',
    dest: './dist/assets/scripts/'
  },
  svg: {
    src: './src/**/**/icons/*.svg',
    dest: './dist/assets/sprite/'
  },
  img: {
    src: './src/img/*',
    dest: './dist/assets/img'
  }
}

// live reload
function server() {
  browserSync.init({
      server: paths.root
  });
  browserSync.watch(paths.root +
      '/**/*.*', browserSync.reload);
}

// watch
function watch() {
  gulp.watch(paths.scripts.src, scripts),
  gulp.watch(paths.styles.src, styles),
  gulp.watch(paths.template.src, template),
  gulp.watch(paths.svg.src, sprite),
  gulp.watch(paths.img.src, img)
}

// template
function template() {
  return gulp.src(paths.template.src)
    .pipe(gulp.dest(paths.template.dest));
}

// img
function img() {
  return gulp.src(paths.img.src)
    .pipe(image({
      svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
    }))
    .pipe(gulp.dest(paths.img.dest));
}

// sass
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sass({ outputStyle: 'nested' }))
    .pipe(autoprefixer({
      browserlist: [
        'last 3 version',
        '> 1%',
        'ie 10'
      ],
      cascade: true
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

function stylesBuild() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      browserlist: [
        'last 3 version',
        '> 1%',
        'ie 10'
      ],
      cascade: true
    }))
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// scripts
function scripts() {
  return gulp.src(paths.scripts.main)
    .pipe(webpack(webpackConfig('development')))
    .pipe(gulp.dest(paths.scripts.dest));
}

function scriptsBuild() {
  return gulp.src(paths.scripts.main)
    .pipe(webpack(webpackConfig('production')))
    .pipe(gulp.dest(paths.scripts.dest));
}

// sprite
const config = {
  mode: {
    symbol: {
      sprite: '../sprite.svg',
      example: {
          dest: '../tmp/spriteSvgDemo.html'
      }
    }
  }
}

function sprite() {
  return gulp.src(paths.svg.src)
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {
            xmlMode: true
        }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(config))
    .pipe(gulp.dest(paths.svg.dest))
}


gulp.task('start', 
  gulp.series(
    gulp.parallel(styles, scripts, sprite, template, img),
    gulp.parallel(server, watch)
  )
);

gulp.task('build', 
  gulp.parallel(stylesBuild, scriptsBuild, template),
);