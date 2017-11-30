import DefineMap from 'can-define/map/';
import route from 'can-route';
import $ from 'jquery'
import 'can-stache-bindings'

import Session from '~/models/session';
import feathersClient from '~/models/feathers-client';
import User from '~/models/user';
// Uncomment this line if you don't have a Feathers Server running, but want to test auth.
// import '~/models/fixtures/';

const AppViewModel = DefineMap.extend({

  /**
   * Make it so viewModel attributes will not be serialized automatically into
   * the URL as route attributes.
   */
  '*': {
    serialize: false
  },

  /**
   * Current user
   */
  user: {
    value: undefined
  },

  logout () {
    return Session.current.destroy();
  },

  /**
   * The `title` attribute is used in index.stache as the HTML title.
   */
  title: {
    value: 'Centinela'
  },

  /**
   * The `page` where we are.
   */
  page: 'string',

  init: function()
  {
    var self = this;
    feathersClient
      .authenticate()
      .then(response => {
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
          self.user = new User(user);
        }
      ).catch(
        err => {
          self.user = undefined;
        }
      );
  }
});


route('/{page}');
route.ready();

export default AppViewModel;