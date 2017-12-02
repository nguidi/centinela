import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './uavs.less';
import view from './uavs.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'centinela/pagination.min.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  },
  filter:
  {
    value: ''
  },
  skip:
  {
    value: 0
  , set: function(val)
    {
      var self = this;
      this.instances = UAV.getList({$skip: val, search: this.filter})
      this.instances.then(function(raw){
        self.updatePagination(raw.total, raw.skip, raw.limit, raw.length, self);
        return raw;
      });
      return val;
    }
  },
  limit:
  {
    value: 5
  },
  count:
  {
    value: 0
  },
  total:
  {
    value: 0
  },
  instances:{
    value () {
      var self = this;
      return  UAV.getList().then(function(raw){
                self.updatePagination(raw.total, raw.skip, raw.limit, raw.length, self);
                return raw;
              });
    }
  },
  instance: {
    value: new UAV({})
  },
  updatePagination: function(total, skip, limit, count, self)
  {
    self.limit = limit;
    self.count = count;
    self.total = total;
    if (total > 0) {
      $('.pagination').data('twbsPagination').destroy();
      let page = Math.ceil(skip/limit)+1;
      let firstInstance = ((page-1)*limit+1);
      let lastInstance = (((page-1)*limit)+limit) > total ? total : (((page-1)*limit)+limit);
      $('span.displayed-instances').html(firstInstance+' al '+lastInstance);
      $('span.total-instances').html(total);
      $('.pagination').twbsPagination({
        totalPages: Math.ceil(total/limit)
      , startPage: Math.ceil(skip/limit) + 1
      , initiateStartPageClick: false
      , onPageClick: function (event, page) {
          self.skip = (page-1)*limit;
        }
      });
    }
  },
  search: function()
  {
    this.filter = $('[name=search]').val();
    this.skip = 0;
  },
  setToCreate: function()
  {
    this.instance = new UAV({});
    $('#createUAV').modal('toggle');
  },
  setToEdit: function(instanceToEdit)
  {
    this.instance = instanceToEdit;
    $('#editUAV').modal('toggle');
  },
  setToRemove: function(instanceToRemove)
  {
    this.instance = instanceToRemove;
    $('#removeUAV').modal('toggle');
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
                message: 'UAV creado correctamente' 
              }
            , {
                type: 'success'
              , placement: {
                  from: 'bottom'
                , align: "right"
                }
              }
            );

            // disparo el cambio de datos
            self.skip = Math.ceil((self.total+1)/self.limit)*self.limit-self.limit; 

            // Oculto el modal
            $('.modal:visible').modal('hide');

            // Reseteo los valores de la instancia
            self.instance = new UAV({});
            $('#createUAV form.create')[0].reset();
            $('#createUAV form.create').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al crear el UAV. Intentelo nuevamente.' 
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
                message: 'UAV actualizado correctamente' 
              }
            , {
                type: 'success'
              , placement: {
                  from: 'bottom'
                , align: "right"
                }
              }
            );

            // disparo el cambio de datos
            self.skip = self.skip

            // Oculto el modal
            $('.modal:visible').modal('hide');

            // Reseteo los valores de la instancia
            self.instance = new UAV({});
            $('#editUAV form.edit')[0].reset();
            $('#editUAV form.edit').data('formValidation').resetForm();
          }
        ).catch(
          function()
          {
            // Reseteo el boton
            $('button.save:visible').button('reset');
            
            // Muestro la notificacion
            $.notify(
              {
                message: 'Ocurrio un error al actualizar el UAV. Intentelo nuevamente.' 
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
    var self = this;

    this.instance.destroy()
      .then(
        function()
        {
          // Muestro la notificacion
          $.notify(
            {
              message: 'UAV eliminado correctamente' 
            }
          , {
              type: 'success'
            , placement: {
                from: 'bottom'
              , align: "right"
              }
            }
          );
          
          // disparo el cambio de datos
          self.skip = (self.count == 1) ? (self.skip - self.limit) : self.skip

          // Oculto el modal
          $('.modal:visible').modal('hide');

          // Reseteo los valores de la instancia
          self.instance = new UAV({});
        }
      ).catch(
        function()
        {
          // Muestro la notificacion
          $.notify(
            {
              message: 'Ocurrio un error al eliminar el UAV. Intentelo nuevamente.' 
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
    =	$('form.form-instance:visible').data('formValidation');

    //	Fuerzo la validación el formulario
    //	Si algun campo no se valido, se mostrara el
    //	error de validación
    FormValidator.validate();

    //	Verifico que todo el formulario este OK
    return (FormValidator.isValid())      
  }
});

export default Component.extend({
  tag: 'app-uavs',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
			$('#createUAV form.create, #editUAV form.edit').formValidation();
      
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
