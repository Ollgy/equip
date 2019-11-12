import React from 'react';
import CloseButton from '../CloseButton';
import EditButton from '../EditButton';

const EquipmentItem = ({ item, index, editable, activity}) => <li className='equipment__item'>
  <div className='equipment__info'>
    <span className='equipment__info-text'>{`${index + 1}. ${item.name}`}</span>
    <span className='equipment__info-count'>{item.count}</span>
  </div>
  {
    editable 
      ? <div className='equipment__buttons'>
          <EditButton onClick={activity.changeDialog.bind(null, true, 'edit', item )}/>
          <CloseButton onClick={activity.delItem.bind(null, item._id)}/>
        </div>
      : null
  }
</li>

export default EquipmentItem;