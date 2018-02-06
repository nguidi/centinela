import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './complete.less';
import view from './complete.stache';

import Flight from 'centinela/models/flight'
import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'
import Equipment from 'centinela/models/equipment'
import Battery from 'centinela/models/battery'

let flightToCreate = new Flight();

export const ViewModel = DefineMap.extend({
 
  //	Istancia del usuario a registrarse
  flight:
  {
    value:	flightToCreate
  }

, uav: {
    value: new UAV.List([])
  }

, flightRoute: {
    value: new DefineMap()
  }

, pilot: {
    value: new User.List([])
  }

, equipment: {
    value: new Equipment.List([])
  }

, batteries: {
    value: new Battery.List([])
  }

});

export default Component.extend({
  tag: 'app-planification-complete',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      /*
      //	Validador de Formularios
      $('flight-form').formValidation();

      //  Datepickers
      $('flight-form .datepicker').datepicker({
        format: 'dd/mm/yyyy'
      , language: 'es'
      }).on('changeDate', function(e) {
        userToRegister.person.birthday = e.date.toJSON()
        $('form').data('formValidation').validateField('birthday')
      });
      */
    }
  }
});
