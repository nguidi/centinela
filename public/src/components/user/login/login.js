import Component from 'can-component';
import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-stache/helpers/route'
import feathersClient from 'centinela/models/feathers-client'

import './login.less';
import view from './login.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'node_modules/formvalidation/dist/js/framework/bootstrap.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

export const ViewModel = DefineMap.extend({
  user: {
    value: {
      email: ''
    , password: ''
    }
  }
, login: function(el)
  {
    // Comenzamos a cargar, animamos el boton de ingreso
    $(el).button('loading');
    console.log("login")
    // Intentamos autentificar el usuario
    feathersClient
      .authenticate(
        {
          strategy: 'local'
        , email: this.user.email
        , password: this.user.password
        }
      ).then(response => {
          //  Usuario autentificado, obtenemos el token de acceso
          //  y lo almacenamos en el localstorage
          return feathersClient.passport.verifyJWT(response.accessToken);
        }
      ).then(payload => {
          //  Usamos el ID del usuario autentificado para obtener el
          //  Usuario logeado
          return feathersClient.service('users').get(payload.userId);
        }
      ).then(user => {
          //  Guardamos el usuario logeado en el cliente
          feathersClient.set('user', user);
          //  Volvemos el boton de ingreso a su estado normal
          $(el).button('reset');
          //  Ingresamos al home de la app
          console.log(user)
        }
      ).catch(function(error){
          //  Ocurrio un error al autentificar
          //  Volvemos el boton a su estado normal
          $(el).button('reset');
          //  Mostramos un aviso en pantalla

      });
  }
});

export default Component.extend({
  tag: 'user-login',
  ViewModel,
  view
});
