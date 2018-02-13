import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './home.less';
import view from './home.stache';

import Flight from 'centinela/models/flight'
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

, flight: {
    value: new Flight()
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
    console.log(this.flight)
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

, validateForm: function()
{
  //	Obtengo el validador del formulario
  var FormValidator
  =	$('.flight-form').data('formValidation');

  //	Fuerzo la validación el formulario
  //	Si algun campo no se valido, se mostrara el
  //	error de validación
  FormValidator.validate();

  //	Verifico que todo el formulario este OK
  return (FormValidator.isValid())      
}

, saveFlight: function()
  {
    var self = this;

    if (this.validateForm())
    {
      // Pongo el boton en modo loading
      $('button.save:visible').button('loading');
      
      this.flight = new Flight({
        uav: this.uav.get(0)
      , pilot: this.pilot
      , equipment: this.equipment
      , batteries: this.batteries
      , points: this.points
      , startPoint: this.startPoint
      , flightRoute: this.flightRoute
      , name: $('[name="flightName"]').val()
      , flightDate: $('[name="flightDate"]').val()
      });

      this.flight.save()
        .then(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
              
            // Muestro la notificacion
            $.notify(
              {
                message: 'Planificación creado correctamente' 
              }
            , {
                type: 'success'
              , placement: {
                  from: 'bottom'
                , align: "right"
                }
              }
            );

            // Reseteo los valores de la instancia
            self.flight = new Flight({});
            $('.flight-form')[0].reset();
            $('.flight-form').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al crear la planificación. Intentelo nuevamente.' 
              }
            , {
                type: 'danger'
              , placement: {
                  from: 'bottom'
                , align: "right"
                }
              }
            );
          }
        );
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