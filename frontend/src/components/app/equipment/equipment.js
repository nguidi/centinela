import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './equipment.less';
import view from './equipment.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'bootstrap-notify';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'
import Equipment from 'centinela/models/equipment'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  },
  instances:{
    get () {
      return Equipment.getList({'organization._id': this.user.organization._id})
    }
  },
  instance: {
    value: new Equipment({})
  , set: function()
    {
      this.instances = Equipment.getList({'organization._id': this.user.organization._id})
    }  
  },
  setToEdit: function(instanceToEdit)
  {
    this.instance = instanceToEdit;
    $('#editEquipment').modal('toggle');
  },
  setToRemove: function(instanceToRemove)
  {
    this.instance = instanceToRemove;
    $('#removeEquipment').modal('toggle');
  },
  create: function()
  {
    var self = this;

    if (this.validateForm())
    {
      // Pongo el boton en modo loading
      $('button.save:visible').button('loading');

      this.instance.organization = this.user.organization;

      this.instance.save()
        .then(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Equipamiento creado correctamente' 
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
            self.instance = new Equipment({});
            $('#createEquipment form.create')[0].reset();
            $('#createEquipment form.create').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al crear el equipamiento. Intentelo nuevamente.' 
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
                message: 'Equipamiento actualizado correctamente' 
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
            self.instance = new Equipment({});
            $('#editEquipment form.edit')[0].reset();
            $('#editEquipment form.edit').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al actualizar el equipamiento. Intentelo nuevamente.' 
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
          console.log("then",arguments)
          // Muestro la notificacion
          $.notify(
            {
              message: 'Equipamiento eliminado correctamente' 
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
          self.instance = new Equipment({});
        }
      ).catch(
        function()
        {
          console.log("Chatch",arguments)
          // Muestro la notificacion
          $.notify(
            {
              message: 'Ocurrio un error al eliminar el equipamiento. Intentelo nuevamente.' 
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
  tag: 'app-equipment',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
			$('form').formValidation();
      
      //	modales
      $('.modal').modal({ show: false })
    }
  }
});
