import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './recover-password.less';
import view from './recover-password.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'node_modules/formvalidation/dist/js/framework/bootstrap.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

export const ViewModel = DefineMap.extend(
  {
    user: {
      value: {
        email: ''
      }
    }
  , recoverPassword: function()
    {
      $('.send-msg').button('loading');
      $('.go-back').addClass('disabled');

      //	Obtengo el formulario
      var	$form
      =	$('form');

      //	Obtengo el validador del formulario
      var FormValidator
      =	$('form').data('formValidation');

      //	Fuerzo la validación el formulario
      //	Si algun campo no se valido, se mostrara el
      //	error de validación
      FormValidator.validateContainer($form);

      //	Verifico que todo el formulario este OK
      if (FormValidator.isValidContainer($form)) {

        $.get(
          '/recoverPassword'
        , this.user
        ).done(
          function()
          {
            $('.recover-section').hide();
            $('.email-sent-section').show();
          }
        ).fail(
          function()
          {
            $('.recover-section').hide();
            $('.wrong-email-section').show();
          }
        ).always(
          function()
          {
            $('.send-msg').button('reset');
            $('.go-back').removeClass('disabled');
          }
        );
      } else {
        $('.send-msg').button('reset');
        $('.go-back').removeClass('disabled');
      }
      
    }

  , return: function()
    {
      $('.wrong-email-section').hide();
      $('.recover-section').show();
    }
  }
);

export default Component.extend(
  {
    tag: 'user-recover-password'
  , ViewModel
  , view
  ,	events:
    {
      inserted: function()
      {
        //	Validador de Formularios
        $('form').formValidation();
      }
    }
  }
);
