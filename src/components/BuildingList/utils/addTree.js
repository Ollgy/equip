import React from 'react';

const addTree = (data, activeZone, roomsWithEquip, activity, area) => <ul className={`${area}__list`}>
  {
    data.map(item => {
      const nextNode = item.rooms || item.children;
      const id = item.id || item._id;
      
      return  <li key={id} 
        className={`
          ${area}__item 
          ${nextNode ? `${area}__item--node` : ''}
          ${id === activeZone.id ? `${area}__item--active` : ''}
        `}>
        <span className={`${area}__status 
          ${roomsWithEquip.includes(id) ? `${area}__status--full` : `${area}__status--empty`}`}/>
        <span className={`${area}__text`} onClick={activity.bind(null, id)}>
          {item.name}
        </span>
        {
          nextNode ?
            addTree(nextNode, activeZone, roomsWithEquip, activity, area) :
            null
        }
      </li>
    })
  }
</ul>

export default addTree;