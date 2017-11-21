import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './flights.less';
import view from './flights.stache';

import 'bootstrap/dist/js/bootstrap';

import User from 'centinela/models/user'
import Flight from 'centinela/models/flight'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  },
  instances:{
    get () {
      return Flight.getList()
    }
  },
  instance: {
    value: new Flight({})
  }
});

export default Component.extend({
  tag: 'app-flights',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
      $('.modal').modal({ show: false })
    }
  }
});
