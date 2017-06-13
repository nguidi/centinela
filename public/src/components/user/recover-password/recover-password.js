import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './recover-password.less';
import view from './recover-password.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the user-recover-password component'
  }
});

export default Component.extend({
  tag: 'user-recover-password',
  ViewModel,
  view
});
