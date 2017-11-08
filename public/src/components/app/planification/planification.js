import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './planification.less';
import view from './planification.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-planification component'
  }
});

export default Component.extend({
  tag: 'app-planification',
  ViewModel,
  view
});
