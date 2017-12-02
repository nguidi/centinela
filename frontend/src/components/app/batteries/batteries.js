import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './batteries.less';
import view from './batteries.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'centinela/pagination.min.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'
import Battery from 'centinela/models/battery'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  , Type: User
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
      this.instances = Battery.getList({$skip: val, search: this.filter})
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
      return  Battery.getList().then(function(raw){
                self.updatePagination(raw.total, raw.skip, raw.limit, raw.length, self);
                return raw;
              });
    }
  },
  instance: {
    value: new Battery({})
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

            // disparo el cambio de datos
            self.skip = Math.ceil((self.total+1)/self.limit)*self.limit-self.limit; 

            // Oculto el modal
            $('.modal:visible').modal('hide');

            // Reseteo los valores de la instancia
            self.instance = new Battery({});
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

            // disparo el cambio de datos
            self.skip = self.skip

            // Oculto el modal
            $('.modal:visible').modal('hide');

            // Reseteo los valores de la instancia
            self.instance = new Battery({});
            $('#editBattery form.create')[0].reset();
            $('#editBattery form.create').data('formValidation').resetForm();
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
    var self = this;

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

          // disparo el cambio de datos
          self.skip = (self.count == 1) ? (self.skip - self.limit) : self.skip
          
          // Oculto el modal
          $('.modal:visible').modal('hide');

          // Reseteo los valores de la instancia
          self.instance = new Battery({});
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
      
      // paginador
      $('.pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
