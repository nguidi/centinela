import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './equipment.less';
import view from './equipment.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-equipment component'
  }
});

export default Component.extend({
  tag: 'app-equipment',
  ViewModel,
  view
});
