import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './users.less';
import view from './users.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'centinela/pagination.min.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  },
  instances:{
    value () {
      var self = this;
      return  User.getList().then(
                function(raw)
                {
                  if (raw.total) {
                    $('.pagination').data('twbsPagination').destroy();
                    $('.pagination').twbsPagination({
                      totalPages: Math.ceil(raw.total/raw.limit)
                    , startPage: Math.ceil(raw.skip/raw.limit) + 1
                    , onPageClick: function (event, page) {
                        self.instances = User.getList({$skip: (page-1)*raw.limit})
                      }
                    });
                  }

                  return raw;
                }
              )
    }
  },
  instance: {
    value: new User({})
  },
  setToCreate: function()
  {
    this.instance = new User({});
    $('#createUser').modal('toggle');
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

      switch(this.instance.profile.type) {
        case 1:
          this.instance.profile = {
            type: 1
          , name: 'Administrador'
          , description: 'Administrador de la organización'
          }
          break;
        case 2:
          this.instance.profile = {
            type: 2
          , name: 'Despachante'
          , description: 'Despachante de la organización'
          }
          break;
        case 3:
          this.instance.profile = {
            type: 3
          , name: 'Piloto'
          , description: 'Piloto de la organización'
          }
          break;
      }

      this.instance.pending = true;

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
            self.instance = new User({});
            $('#createUser form.create')[0].reset();
            $('#createUser form.create').data('formValidation').resetForm();
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

      switch(this.instance.profile.type) {
        case 1:
          this.instance.profile = {
            type: 1
          , name: 'Administrador'
          , description: 'Administrador de la organización'
          }
          break;
        case 2:
          this.instance.profile = {
            type: 2
          , name: 'Despachante'
          , description: 'Despachante de la organización'
          }
          break;
        case 3:
          this.instance.profile = {
            type: 3
          , name: 'Piloto'
          , description: 'Piloto de la organización'
          }
          break;
      }

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
            self.instance = new User({});
            $('#editUser form.edit')[0].reset();
            $('#editUser form.edit').data('formValidation').resetForm();
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
          self.instance = new User({});
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
			$('#createUser form.create, #editUser form.edit').formValidation();
      
      //	modales
      $('.modal').modal({ show: false });

      // paginador
      $('.pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
