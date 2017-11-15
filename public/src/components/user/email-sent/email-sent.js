import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './email-sent.less';
import view from './email-sent.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the user-email-sent component'
  }
});

export default Component.extend({
  tag: 'user-email-sent',
  ViewModel,
  view
});
