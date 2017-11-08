import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './flights.less';
import view from './flights.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-flights component'
  }
});

export default Component.extend({
  tag: 'app-flights',
  ViewModel,
  view
});
