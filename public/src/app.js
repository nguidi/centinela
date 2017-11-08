import DefineMap from 'can-define/map/';
import route from 'can-route';
import $ from 'jquery'
import 'can-stache-bindings'

import Session from '~/models/session';
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
   * Session.current is provided by the can-connect-feathers session behavior.
   * It will automatically populate when `new Session().save()` occurs in the app
   * or on refresh after login.
   */
  session: {
    get () {
      console.log(Session.current)
      return Session.current;
    }
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
  page: 'string'
});


route('/{page}');
route.ready();

export default AppViewModel;