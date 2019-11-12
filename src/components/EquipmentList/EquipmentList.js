import React from 'react';
import EquipmentItem from '../EquipmentItem';

const EquipmentList = ({ data, ...props }) => <ul className='equipment__list'>
  {
    data.map((item, index) => <EquipmentItem 
      key={item._id} 
      item={item} 
      index={index} 
      {...props}
      />)
  }
</ul>

export default EquipmentList;