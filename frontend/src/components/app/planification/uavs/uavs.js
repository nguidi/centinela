import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './uavs.less';
import view from './uavs.stache';

import 'centinela/pagination.min.js';

import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'


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
      this.uavs = UAV.getList({$skip: val, search: this.filter})
      this.uavs.then(function(raw){
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
  uavs: {
    value () {
      var self = this;
      return  UAV.getList().then(function(raw){
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
      $('app-planification-uavs .pagination').data('twbsPagination').destroy();
      $('app-planification-uavs .pagination').twbsPagination({
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
    this.filter = $('app-planification-uavs [name=search]').val();
    this.skip = 0;
  }
  
, hasBeenSelected: function(possibleUAV)
{
  return (this.selectedUAV.indexOf(possibleUAV) >= 0 ) ? 'active' : ''
}

, selectedUAV:
  {
    value: new UAV.List([])
  }

, addUAV: function(uavToAdd)
  {
    if (this.selectedUAV.length == 0) {
      this.selectedUAV.push(uavToAdd);
    } else
      $.notify(
        {
          message: 'Solo se puede seleccionar un UAV.' 
        }
      , {
          type: 'warning'
        , placement: {
            from: 'bottom'
          , align: "right"
          }
        }
      );
  }

, removeUAV: function(uavToRemove)
  {
    this.selectedUAV.pop();
    $('.organization-uavs tr.active').removeClass('active');
  }
});

export default Component.extend({
  tag: 'app-planification-uavs',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      // paginador
      $('app-planification-uavs .pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
