import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './batteries.less';
import view from './batteries.stache';

import User from 'centinela/models/user'
import Battery from 'centinela/models/battery'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  }

, battery: {
    get() {
      return Battery.getList({'organization._id': this.user.organization._id})
    }
  }

, selectedBatteries:
  {
    value: new Battery.List([])
  }

, selectedBatteries: function(batteryToAdd)
  {
    if (this.selectedBattery.indexOf(batteryToAdd) == -1) {
      this.selectedBattery.push(batteryToAdd);
      $('.organization-battery tr[battery-index="'+batteryToAdd._id+'"]').addClass('active');
    }
  }

, removeBattery: function(batteryToRemove)
  {
    this.selectedBattery.pop();
    $('.organization-battery tr[battery-index="'+batteryToRemove._id+'"]').removeClass('active');
  }
});

export default Component.extend({
  tag: 'app-planification-batteries',
  ViewModel,
  view
});
