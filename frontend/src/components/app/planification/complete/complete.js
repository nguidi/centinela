import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './complete.less';
import view from './complete.stache';

import 'gmap3';

import Flight from 'centinela/models/flight'
import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'
import Equipment from 'centinela/models/equipment'
import Battery from 'centinela/models/battery'

let flightToCreate = new Flight();

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'bootstrap-notify';
import 'bootstrap-datepicker';
import 'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

export const ViewModel = DefineMap.extend({
 
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
      //	Validador de Formularios
      $('.flight-form').formValidation();

      //  Datepickers
      $('.flight-form .datepicker').datepicker({
        format: 'dd/mm/yyyy'
      , language: 'es'
      }).on('changeDate', function(e) {
        flightToCreate.date = e.date.toJSON()
        $('form').data('formValidation').validateField('birthday')
      });
    }
  }
});
