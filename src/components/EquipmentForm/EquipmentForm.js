import React, { PureComponent } from 'react';
import Input from '../Input';
import Button from '../Button';
import CloseButton from '../CloseButton';
import fieldsData from './fieldsData';
import textConst from '../../const/text/textConst';

class EquipmentForm extends PureComponent {
  constructor(props) {
    super(props);

    const { dialog } = this.props;

    this.state = {
      mode: dialog.mode,
      fields: {
        name: dialog.data.name || '',
        count: dialog.data.count || ''
      }
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.activeInput = React.createRef();
  }

  componentDidMount() {
    this.activeInput.current.focus();
  }

  onInputChange(e) {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        [e.target.name]: e.target.value
      }
    })
  };

  onSubmit(e) {
    e.preventDefault();

    const { roomId, activity, dialog } = this.props;
    const { mode, fields } = this.state;
    const isEmpty = !!Object.keys(fields).find(key => !fields[key]);


    if (!isEmpty) {
      switch(mode) {
        case 'add':
          activity.addItem({ ...fields, roomId });
          break;

        case 'edit':
          activity.editItem({ ...fields, id: dialog.data._id });
          break;

        default:
          f => f
      }
    }
  }
  
  render() {
    const { fields, mode } = this.state;
    const { activity } = this.props;

    return (
      <div className='form-container'>
        <div className='form-wrap'>
          <form
            className='form'
            onSubmit={this.onSubmit}
          >
            {fieldsData.map((field, i) => (
              <div
                className='form__item'
                key={field.name}
              >
                <label className='form__label'>
                  <span>{field.label}</span>
                </label>
                <Input
                  type={field.type}
                  name={field.name}
                  ref={i === 0
                      ? this.activeInput
                      : null
                  }
                  value={fields[field.name]}
                  placeholder='. . .'
                  onChange={this.onInputChange}
                />
              </div>
            ))}
            <div className='form__buttons'>
              <Button type='submit' name='submit' children={textConst.buttons[mode]} />
            </div>
          </form>
          <div className='form-close'>
            <CloseButton onClick={activity.changeDialog.bind(null, false)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default  EquipmentForm;
