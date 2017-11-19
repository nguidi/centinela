import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './home.less';
import view from './home.stache';
import feathersClient from '~/models/feathers-client';
import User from '~/models/user';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'bootstrap-notify';
import 'bootstrap-datepicker';
import 'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

export const ViewModel = DefineMap.extend(
  {
    setOption: function(el)
    {
      $('ul.sidebar-menu li.active').removeClass('active');
      $(el).parents('.menu-option').addClass('active');
      if (!$(el).hasClass('tree-option') && $('ul.treeview-menu').hasClass('active'))
        this.toggleTree($('ul.treeview-menu'))
    }
  , toggleTree: function(el)
    {
      $(el).parent().find('ul.treeview-menu').toggleClass('active');
      $(el).parent().find('i.tree-marker').toggleClass('fa-angle-down fa-angle-up')
    }
  , user: {
    value: User
  }
  , logout: function()
    {
      var self = this;
      $('#logout').one(
        'hidden.bs.modal'
      , function (e)
        {
          feathersClient.logout();
          self.user = undefined;
        }
      );
      $('#logout').modal('hide');
    }
  , update: function()
    {
      //	Obtengo el validador del formulario
      var FormValidator
      =	$('form').data('formValidation');

      //	Fuerzo la validación el formulario
      //	Si algun campo no se valido, se mostrara el
      //	error de validación
      FormValidator.validate();

      //	Verifico que todo el formulario este OK
      if (FormValidator.isValid()) {
        // Pongo el boton en modo loading
        $('#update-user-profile').button('loading');

        this.user.save()
            .then(
              function()
              {
                // Reseteo el boton
                $('#update-user-profile').button('reset');

                // Muestro la notificacion
                $.notify(
                  {
                    message: 'Su perfil se actualizo correctamente' 
                  }
                , {
                    type: 'success'
                  , placement: {
                      from: 'bottom'
                    , align: "right"
                    }
                  }
                );
              }
            ).catch(
              function(error){
                //  Ocurrio un error al autentificar
                //  Volvemos el boton a su estado normal
                $('#update-user-profile').button('reset');

                //  Mostramos un aviso en pantalla
                $.notify(
                  {
                    message: 'Ocurrio un error al actualizar el perfil, por favor intentelo de nuevo.' 
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
  , page: 'string'
  }
);

export default Component.extend({
  tag: 'app-home',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
      $('form#profile-form').formValidation();

      //  Modales
      $('.modal').modal({ show: false });

      //  Datepickers
      $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'
      , language: 'es'
      });
    }
  }
});