export default {
  getData: (field="buildings", cb) => {
    new Scorocode.Query(field)
      .find().then(finded => {
        console.info(finded.result);
        cb(finded.result)
      })
  },
  delItem: (field="equipment", id, cb) => {
    const comp = new Scorocode.Object(field);
      comp.getById(id)
        .then(item => { 
          comp.remove(item)
            .then(() => {
              console.info("Done");
              cb();
          });
      });
  },
  addItem: (field="equipment", data, cb) => {
    if (data.name && data.roomId && +data.count) {
      const comp = new Scorocode.Object(field);

      comp.set("name", data.name);
      comp.set("room", data.roomId);
      comp.set("count", +data.count);
      comp.save()
        .then(() => {
          console.info("Done");
          cb();
        });
    }
  },
  editItem: (field="equipment", data, cb) => {
    if (data.id && data.name && +data.count) {
      let comp = new Scorocode.Object(field);
      
      comp.set("_id", data.id)
      comp.set("name", data.name)
      comp.set("count", +data.count);
      comp.save().then(() => {
        console.info("Done");
        cb();
      });
    }
  } 
}