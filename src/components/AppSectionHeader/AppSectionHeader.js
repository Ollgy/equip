import React from 'react';

const AppSectionHeader = ({ title, icon }) =>
  <div className='app-section__header'>
    <svg className='app-section__header-icon'>
      <use xlinkHref={`assets/sprite/sprite.svg#components--${icon.parent}--icons--${icon.name}`} />
    </svg>
    <span className='app-section__header-title' children={title}/>
  </div>

export default AppSectionHeader;