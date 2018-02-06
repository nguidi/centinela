import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './home.less';
import view from './home.stache';

import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'
import Equipment from 'centinela/models/equipment'
import Battery from 'centinela/models/battery'

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-notify';

export const ViewModel= DefineMap.extend({
  
  // data
  uav: {
    value: new UAV.List([])
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

, points: {
    value: new DefineList()
  }

, startPoint: {
    value: new DefineList()
  }

, routes: {
    value: new DefineList()
  }

, flightRoute: {
    value: new DefineMap()
  }
 
   // methods
, triggerStepAlert: function(stepErrorToTrigger)
  {
    switch(stepErrorToTrigger) {
      case 'selectUAV':
        var msg = 'Debe seleccionar un UAV';
        break;
      case 'selectPilot':
        var msg = 'Debe seleccionar un Piloto';
        break;
      case 'selectEquipment':
        var msg = 'Debe seleccionar al menos un equipamiento';
        break;
      case 'selectBatteries':
        var msg = 'Debe seleccionar al menos una batería';
        break;
      case 'selectPath':
        var msg = 'Debe seleccionar al menos dos puntos a recorrer';
        break;
      case 'routes':
        var msg = 'Debe existir al menos una ruta optima';
        break;
    }

     // Muestro la notificacion
     $.notify(
      {
        message: msg 
      }
    , {
        type: 'warning'
      , placement: {
          from: 'bottom'
        , align: "right"
        }
      }
    );
  }

, stepIsValid: function(stepToCheck)
  {
    let isValid = false;

    switch(stepToCheck) {
      case 'selectUAV':
        isValid =  (this.uav.length > 0)
        break;
      case 'selectPilot':
        isValid =  (this.pilot.length > 0)
        break;
      case 'selectEquipment':
        isValid =  (this.equipment.length > 0)
        break;
      case 'selectBatteries':
        isValid =  (this.batteries.length > 0)
        break;
      case 'selectPath':
        isValid =  ((this.startPoint.length > 0) && (this.points.length > 0))
        break;
      case 'routes':
        isValid =  (this.routes.length > 0) && (this.flightRoute)
        break;
      default:
        isValid =  false;
        break;
    }

    if (isValid) {
      $('.wizard .nav-tabs li.active').removeClass('with-errors').addClass('done')
    } else {
      $('.wizard .nav-tabs li.active').removeClass('done').addClass('with-errors');
    }

    return isValid;
  }

, canToggleToStep: function(currentStep, stepToToggle)
  {
    let isNext = $('.wizard .nav-tabs li[tab-li='+stepToToggle+']').index() > $('.wizard .nav-tabs li[tab-li='+currentStep+']').index()

    return isNext ? this.stepIsValid(currentStep) : true;
  }

,  nextStep: function() {
    let currentStep = $('.wizard .nav-tabs li.active a').attr('aria-controls');
    if (this.stepIsValid(currentStep)) {
      $('.wizard .nav-tabs li.active').next().removeClass('disabled');
      $('.wizard .nav-tabs li.active').next().find('a[data-toggle="tab"]').click();
    } else {
      this.triggerStepAlert(currentStep);
    }
    window.wizardData = this
  }

, prevStep: function() {
    $('.wizard .nav-tabs li.active').prev().find('a[data-toggle="tab"]').click();
  }

, toggleStep: function(ev, el)
  {
    if (!$(el).parent().hasClass('disabled')) {

      let currentStep = $('.wizard .nav-tabs li.active a').attr('aria-controls')
      ,   stepToToggle = $(el).attr('aria-controls');

      if (!this.canToggleToStep(currentStep, stepToToggle)) {
        ev.preventDefault()
        ev.stopPropagation();

        // Muestro la notificacion
        this.triggerStepAlert(currentStep)
      }
      
    }
  }

});

export default Component.extend({
  tag: 'app-planification',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {      
      //Wizard
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

          var $target = $(e.target);
      
          if ($target.parent().hasClass('disabled')) {
              return false;
          }
      });
    }
  }
});