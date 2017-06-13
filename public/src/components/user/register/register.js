import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './register.less';
import view from './register.stache';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-datepicker';
import 'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the user-register component'
  }
});

export default Component.extend({
  tag: 'user-register',
  ViewModel,
  view
});
