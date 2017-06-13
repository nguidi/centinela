import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './login.less';
import view from './login.stache';
import 'can-stache/helpers/route'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the user-login component'
  }
});

export default Component.extend({
  tag: 'user-login',
  ViewModel,
  view
});
