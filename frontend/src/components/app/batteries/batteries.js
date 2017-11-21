import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './batteries.less';
import view from './batteries.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'
import Battery from 'centinela/models/battery'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  , Type: User
  },
  instances:{
    Type: Battery.List
  ,  get () {
      return Battery.getList({})
    }
  },
  instance: {
    value: new Battery({})
  },
  setToCreate: function()
  {
    this.instance = new Battery({});
    $('#createBattery').modal('toggle');
  },
  setToEdit: function(instanceToEdit)
  {
    this.instance = instanceToEdit;
    $('#editBattery').modal('toggle');
  },
  setToRemove: function(instanceToRemove)
  {
    this.instance = instanceToRemove;
    $('#removeBattery').modal('toggle');
  },
  create: function()
  {
    if (this.validateForm())
    {
      // Pongo el boton en modo loading
      $('button.save:visible').button('loading');
      
      this.instance.save()
        .then(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Bateria creada correctamente' 
              }
            , {
                type: 'success'
              , placement: {
                  from: 'bottom'
                , align: "right"
                }
              }
            );

            // Oculto el modal
            $('.modal:visible').modal('hide');

            // Reseteo los valores de la instancia
            $('#createBattery form.create')[0].reset();
            $('#createBattery form.create').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al crear la bateria. Intentelo nuevamente.' 
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
  },
  update: function()
  {
    if (this.validateForm())
    {
      // Pongo el boton en modo loading
      $('button.save:visible').button('loading');

      this.instance.save()
        .then(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Bateria actualizada correctamente' 
              }
            , {
                type: 'success'
              , placement: {
                  from: 'bottom'
                , align: "right"
                }
              }
            );

            // Oculto el modal
            $('.modal:visible').modal('hide');

            // Reseteo los valores de la instancia
            $('#editBattery form.edit')[0].reset();
            $('#editBattery form.edit').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al actualizar la bateria. Intentelo nuevamente.' 
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
  },
  destroy: function()
  {
    this.instance.destroy()
      .then(
        function()
        {
          // Muestro la notificacion
          $.notify(
            {
              message: 'Bateria eliminada correctamente' 
            }
          , {
              type: 'success'
            , placement: {
                from: 'bottom'
              , align: "right"
              }
            }
          );
          
          // Oculto el modal
          $('.modal:visible').modal('hide');
        }
      ).catch(
        function()
        {
          // Muestro la notificacion
          $.notify(
            {
              message: 'Ocurrio un error al eliminar la bateria. Intentelo nuevamente.' 
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
  },
  validateForm: function()
  {
    //	Obtengo el validador del formulario
    var FormValidator
    =	$('form:visible').data('formValidation');

    //	Fuerzo la validación el formulario
    //	Si algun campo no se valido, se mostrara el
    //	error de validación
    FormValidator.validate();

    //	Verifico que todo el formulario este OK
    return (FormValidator.isValid())      
  }
});

export default Component.extend({
  tag: 'app-batteries',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
			$('#createBattery form.create, #editBattery form.edit').formValidation();

      //	modales
      $('.modal').modal({ show: false })
      
    }
  }
});
