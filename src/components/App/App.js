import React, { PureComponent } from 'react';
import AppSection from '../AppSection';
import AppTitle from '../AppTitle';
import BuildingList from '../BuildingList';
import Equipment from '../Equipment';
import Preloader from '../Preloader';
import { getRooms, getRoomsWithEquipment } from './utils/getRooms';
import formatList from './utils/formatList';
import textConst from '../../const/text/textConst';
import api from '../../api/api';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      equipment: [],
      activeZone : {
        id: null,
        rooms: [],
        equipment: []
      },
      query: {
        isLoading: false,
        error: false,
        type: null,
        params: {}
      },
      dialog: {
        isOpened: false,
        mode: 'add',
        data: null
      }
    }

    this.onItemClick = this.onItemClick.bind(this);
    this.onDel = this.onDel.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDialogChange = this.onDialogChange.bind(this);
  }

  componentDidMount() {
    const baseState = {};

    api.getData('buildings', data => {
      baseState.buildings = data;
      api.getData('equipment', data => {
        baseState.equipment = data;
        this.setState(baseState);
      })
    });
  }

  componentDidUpdate() {
    const { isLoading, type, params } = this.state.query;
    const { activeZone, equipment } = this.state;
    const initQueryState =  {
      isLoading: false,
      type: null,
      params: {}
    };

    if (isLoading && type) {
      switch (type) {
        case 'delete': 
          api.delItem('equipment', params.id, () => 
            api.getData('equipment', data => {
              this.setState({ 
                equipment: data, 
                activeZone: {
                  ...activeZone,
                  equipment: formatList(
                    data.filter(eq => activeZone.rooms.includes(eq.room))
                  )
                },
                query: initQueryState });
            }));

          break;

        case 'add': 
          api.addItem('equipment', params, () => 
            api.getData('equipment', data => {
              this.setState({ 
                equipment: data, 
                activeZone: {
                  ...activeZone,
                  equipment: formatList(
                    data.filter(eq => activeZone.rooms.includes(eq.room))
                  )
                },
                query: initQueryState });
            }));

          break;

        case 'edit':
          api.editItem('equipment', params, () => 
            api.getData('equipment', data => {
              this.setState({ 
                equipment: data, 
                activeZone: {
                  ...activeZone,
                  equipment: formatList(
                    data.filter(eq => activeZone.rooms.includes(eq.room))
                  )
                },
                query: initQueryState });
            }));

          break;

        default: 
          this.setState({ query: initQueryState})
      }
    }
  }

  onItemClick(id) {
    const { buildings, equipment } = this.state;
    const rooms = getRooms(buildings, id);

    this.setState({
      dialog: {
        isOpened: false,
        mode: 'add',
        data: null
      },
      activeZone: {
        id,
        rooms,
        equipment: formatList(
          equipment.filter(eq => rooms.includes(eq.room))
        )
      }
    })
  };

  onDel(id) {
    this.setState({
      query: {
        isLoading: true,
        type: 'delete',
        params: {
          id
        }
      }
    });
  }

  onAdd(params) {
    this.setState({
      query: {
        isLoading: true,
        type: 'add',
        params
      }
    });
  }

  onEdit(params) {
    this.setState({
      query: {
        isLoading: true,
        type: 'edit',
        params
      }
    });
  }


  onDialogChange(isOpened, mode, data) {
    this.setState({
      dialog: {
        isOpened,
        mode: mode || 'add',
        data: data || null
      }
    })
  }

  render() {
    const { buildings, equipment, activeZone, dialog } = this.state;

    return <div className='wrapper'>
      <main className='app'>
        <AppTitle children={textConst.title}/>
        {
          !buildings.length
            ? <Preloader/>
            : <div className='app__section-block'>
            <AppSection 
              title={textConst.buildings}
              icon={{name: "task", parent: "App"}}
              children={
                <BuildingList 
                  data={buildings} 
                  activeZone={activeZone}
                  onClick={this.onItemClick}
                  roomsWithEquip={equipment.filter(eq => eq.room).map(eq => eq.room)}
                />}
            />
            <AppSection 
              title={textConst.equipment} 
              icon={{name: "work", parent: "App"}}
              children={
                <Equipment 
                  activeZone={activeZone}
                  activity={{
                    delItem: this.onDel,
                    addItem: this.onAdd,
                    editItem: this.onEdit,
                    changeDialog: this.onDialogChange
                  }}
                  editable={activeZone.rooms.length === 1}
                  dialog={dialog}
                />
              }
            />
          </div>
        }
      </main>
    </div>
  }
}  

export default App;