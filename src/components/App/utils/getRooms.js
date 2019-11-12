const findNode = (buildings, id) => {
  let node; 

  function aroundTree(data) {
    for (let i = 0; i < data.length; i++) {

      if (node) {
        break;
      }

      const curId = data[i].id || data[i]._id;
      const nextNode = data[i].rooms || data[i].children;
      
      if (curId === id) {
        node = data[i];
      }

      if (nextNode) {
        aroundTree(nextNode);
      } 
    }

    return node;
  }

  return aroundTree(buildings);
}

const getRooms = (buildings, id) => {
  const node = findNode(buildings, id); 
  let rooms = [id];

  function aroundTree(data) {
    for (let i = 0; i < data.length; i++) {
      const curId = data[i].id || data[i]._id;
      const nextNode = data[i].rooms || data[i].children;
      
      rooms = [...rooms, curId];

      if (nextNode) {
        aroundTree(nextNode);
      } 
    }
  }

  if (node.rooms || node.children) {
    aroundTree(node.rooms || node.children);
  } 

  return rooms;
}

const getRoomsWithEquipment = (buildings, equipment) => {
  let rooms = [];

  function aroundTree(data) {
    for (let i = 0; i < data.length; i++) {
      const curId = data[i].id || data[i]._id;
      const nextNode = data[i].rooms || data[i].children;
      const withEq = equipment.find(eq => eq.room === curId);
      
      if (withEq) {
        rooms = [...rooms, curId];
      } 
      
      if (nextNode && !withEq) {
        const rl = rooms.length;
        aroundTree(nextNode);
        
        if (rl !== rooms.length) {
          rooms = [...rooms, curId];
        }
      } else if(nextNode) {
        aroundTree(nextNode);
      }
    }
  }

  aroundTree(buildings);

  return rooms;
}

export { getRooms, getRoomsWithEquipment };