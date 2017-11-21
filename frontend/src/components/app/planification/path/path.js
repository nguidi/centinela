import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './path.less';
import view from './path.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-planification-path component'
  }
});

export default Component.extend({
  tag: 'app-planification-path',
  ViewModel,
  view
});
