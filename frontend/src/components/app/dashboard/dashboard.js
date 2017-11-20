import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './dashboard.less';
import view from './dashboard.stache';

import User from 'centinela/models/user'
import Dashboard from 'centinela/models/dashboard'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  },
  dashboard: {
    get () {
      return Dashboard.getList({'organization._id': this.user.organization._id})
    }
  }
});

export default Component.extend({
  tag: 'app-dashboard',
  ViewModel,
  view
});
