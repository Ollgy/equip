import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import Cap from '../Cap';
import Button from '../Button';
import EquipmentList from '../EquipmentList';
import EquipmentForm from '../EquipmentForm';
import textConst from '../../const/text/textConst';

const Equipment = ({ activeZone, activity, editable, dialog }) => <div className='equipment'>
  {
    editable
      ? <Fragment>
          <div className='equipment__button-block'>
            <Button children={textConst.buttons.addEquip} 
              onClick={activity.changeDialog.bind(null, true, 'add')}
            />
          </div>
          <CSSTransition
            in={dialog.isOpened}
            timeout={300}
            appear
            unmountOnExit={true}
            classNames={{
              appear: 'appear',
              enter: 'enter',
              enterActive: 'enterActive',
              exit: 'exit',
              exitActive: 'exitActive'
            }}
          >
            <EquipmentForm 
              roomId={activeZone.id} 
              dialog={dialog} 
              activity={activity}/>
          </CSSTransition>
        </Fragment>
      : null
  }
  {
    !activeZone.id
      ? <Cap children={textConst.roomUndefined}/>
      : activeZone.id && !activeZone.equipment.length
        ? <Cap children={textConst.equipmentEmpty}/>
        : <EquipmentList 
            data={activeZone.equipment} 
            activity={activity}
            editable={editable}
          />
}
</div> 

export default Equipment;