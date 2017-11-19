import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './dashboard.less';
import view from './dashboard.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-dashboard component'
  }
});

export default Component.extend({
  tag: 'app-dashboard',
  ViewModel,
  view
});
