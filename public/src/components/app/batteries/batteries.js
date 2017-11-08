import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './batteries.less';
import view from './batteries.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-batteries component'
  }
});

export default Component.extend({
  tag: 'app-batteries',
  ViewModel,
  view
});
