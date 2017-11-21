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

, batteries: {
    get() {
      return Battery.getList()
    }
  }

, selectedBatteries:
  {
    value: new Battery.List([])
  }

, addBattery: function(batteryToAdd)
  {
    if (this.selectedBatteries.indexOf(batteryToAdd) == -1) {
      this.selectedBatteries.push(batteryToAdd);
      $('.organization-batteries tr[battery-index="'+batteryToAdd._id+'"]').addClass('active');
    }
  }

, removeBattery: function(batteryToRemove)
  {
    this.selectedBatteries.pop();
    $('.organization-batteries tr[battery-index="'+batteryToRemove._id+'"]').removeClass('active');
  }
});

export default Component.extend({
  tag: 'app-planification-batteries',
  ViewModel,
  view
});
