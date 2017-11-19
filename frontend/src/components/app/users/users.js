import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './users.less';
import view from './users.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'

export const ViewModel = DefineMap.extend({
  instances:{
    get () {
      return User.getList()
    }
  },
  instance: {
    value: new User()
  },
  setToEdit: function(instanceToEdit)
  {
    this.instance = instanceToEdit;
    $('#editUser').modal('toggle');
  },
  setToRemove: function(instanceToRemove)
  {
    this.instance = instanceToRemove;
    $('#removeUser').modal('toggle');
  },
  create: function()
  {
    var self = this;

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
                message: 'Usuario creado correctamente. Se le enviara un email para que confirme la creación.' 
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
            self.instance = new User();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al crear el usuario. Intentelo nuevamente.' 
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
                message: 'Usuario actualizado correctamente.' 
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
            self.instance = new User();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al actualizar el usuario. Intentelo nuevamente.' 
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
              message: 'Usuario eliminado correctamente' 
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
          self.instance = new Equipment();
        }
      ).catch(
        function()
        {
          console.log("Chatch",arguments)
          // Muestro la notificacion
          $.notify(
            {
              message: 'Ocurrio un error al eliminar el usuario. Intentelo nuevamente.' 
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
  tag: 'app-users',
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
