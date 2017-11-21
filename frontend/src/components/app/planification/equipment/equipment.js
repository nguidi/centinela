import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './equipment.less';
import view from './equipment.stache';

import User from 'centinela/models/user'
import Equipment from 'centinela/models/equipment'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  }

, equipment: {
    get() {
      return Equipment.getList({'organization._id': this.user.organization._id})
    }
  }

, selectedEquipment:
  {
    value: new Equipment.List([])
  }

, addEquipment: function(equipmentToAdd)
  {
    if (this.selectedEquipment.indexOf(equipmentToAdd) == -1) {
      this.selectedEquipment.push(equipmentToAdd);
      $('.organization-equipment tr[equipment-index="'+equipmentToAdd._id+'"]').addClass('active');
    }
  }

, removeEquipment: function(equipmentToRemove)
  {
    this.selectedEquipment.pop();
    $('.organization-equipment tr[equipment-index="'+equipmentToRemove._id+'"]').removeClass('active');
  }
});

export default Component.extend({
  tag: 'app-planification-equipment',
  ViewModel,
  view
});
