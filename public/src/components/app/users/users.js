import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './users.less';
import view from './users.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-users component'
  }
});

export default Component.extend({
  tag: 'app-users',
  ViewModel,
  view
});
