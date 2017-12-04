import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './equipment.less';
import view from './equipment.stache';

import User from 'centinela/models/user'
import Equipment from 'centinela/models/equipment'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  },
  filter:
  {
    value: ''
  },
  skip:
  {
    value: 0
  , set: function(val)
    {
      var self = this;
      this.equipment = Equipment.getList({$skip: val, search: this.filter})
      this.equipment.then(function(raw){
        self.updatePagination(raw.total, raw.skip, raw.limit, raw.length, self);
        return raw;
      });
      return val;
    }
  },
  limit:
  {
    value: 5
  },
  count:
  {
    value: 0
  },
  total:
  {
    value: 0
  },
  equipment: {
    value () {
      var self = this;
      return  Equipment.getList().then(function(raw){
                self.updatePagination(raw.total, raw.skip, raw.limit, raw.length, self);
                return raw;
              });
    }
  },
  updatePagination: function(total, skip, limit, count, self)
  {
    self.limit = limit;
    self.count = count;
    self.total = total;
    if (total > 0) {
      $('app-planification-equipment .pagination').data('twbsPagination').destroy();
      $('app-planification-equipment .pagination').twbsPagination({
        totalPages: Math.ceil(total/limit)
      , startPage: Math.ceil(skip/limit) + 1
      , initiateStartPageClick: false
      , onPageClick: function (event, page) {
          self.skip = (page-1)*limit;
        }
      });
    }
  },
  search: function()
  {
    this.filter = $('app-planification-equipment [name=search]').val();
    this.skip = 0;
  }

, hasBeenSelected: function(possibleEquipment)
  {
    return (this.selectedEquipment.indexOf(possibleEquipment) >= 0 ) ? 'active' : ''
  }

, selectedEquipment:
  {
    value: new Equipment.List([])
  }

, addEquipment: function(equipmentToAdd)
  {
    if (this.selectedEquipment.indexOf(equipmentToAdd) == -1) {
      this.selectedEquipment.push(equipmentToAdd);
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
  view,
  events:
  {
    inserted: function()
    {
      // paginador
      $('app-planification-equipment .pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
