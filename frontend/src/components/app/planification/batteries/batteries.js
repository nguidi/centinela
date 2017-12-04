import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './batteries.less';
import view from './batteries.stache';

import 'centinela/pagination.min.js';

import User from 'centinela/models/user';
import Battery from 'centinela/models/battery';

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
      this.batteries = Battery.getList({$skip: val, search: this.filter})
      this.batteries.then(function(raw){
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
  batteries: {
    value () {
      var self = this;
      return  Battery.getList().then(function(raw){
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
      $('app-planification-batteries .instances-pagination .pagination').data('twbsPagination').destroy();
      $('app-planification-batteries .instances-pagination .pagination').twbsPagination({
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
    this.filter = $('app-planification-batteries [name=search]').val();
    this.skip = 0;
  }

, hasBeenSelected: function(possibleBattery)
  {
    return (this.selectedBatteries.indexOf(possibleBattery) >= 0 ) ? 'active' : ''
  }

, selectedBatteries:
  {
    value: new Battery.List([])
  }

, addBattery: function(batteryToAdd)
  {
    if (this.selectedBatteries.indexOf(batteryToAdd) == -1) {
      this.selectedBatteries.push(batteryToAdd);
    }
  }

, removeBattery: function(batteryToRemove)
  {
    this.selectedBatteries.splice(this.selectedBatteries.indexOf(batteryToRemove),1)
  }
});

export default Component.extend({
  tag: 'app-planification-batteries',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      // paginador
      $('app-planification-batteries .pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
