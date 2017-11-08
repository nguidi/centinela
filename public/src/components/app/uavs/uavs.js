import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './uavs.less';
import view from './uavs.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-uavs component'
  }
});

export default Component.extend({
  tag: 'app-uavs',
  ViewModel,
  view
});
