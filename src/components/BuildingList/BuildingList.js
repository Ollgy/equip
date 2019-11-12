import React from 'react';
import addComps from './utils/addTree.js';

const BuildingList = ({ data, activeZone, roomsWithEquip, onClick }) => <div className='buildings'>
  {
    addComps(data, activeZone, roomsWithEquip, onClick, 'buildings')
  }
</div>

export default BuildingList;