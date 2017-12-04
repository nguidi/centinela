import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './pilot.less';
import view from './pilot.stache';

import 'centinela/pagination.min.js';

import User from 'centinela/models/user'

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
      this.pilots = User.getList({$skip: val, search: this.filter, "profile.type": 3})
      this.pilots.then(function(raw){
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
  pilots: {
    get() {
      var self = this;
      return User.getList({"profile.type": 3}).then(function(raw){
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
      $('app-planification-pilot .pagination').data('twbsPagination').destroy();
      $('app-planification-pilot .pagination').twbsPagination({
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
    this.filter = $('app-planification-pilot [name=search]').val();
    this.skip = 0;
  }
  
, hasBeenSelected: function(possiblePilot)
  {
    return (this.selectedPilot.indexOf(possiblePilot) >= 0 ) ? 'active' : ''
  }

, selectedPilot:
  {
    value: new User.List([])
  }

, addPilot: function(pilotToAdd)
  {
    if (this.selectedPilot.length == 0) {
      this.selectedPilot.push(pilotToAdd);
    } else
      $.notify(
        {
          message: 'Solo se puede seleccionar un piloto.' 
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

, removePilot: function(pilotToRemove)
  {
    this.selectedPilot.pop();
    $('.organization-pilots tr.active').removeClass('active');
  }
});

export default Component.extend({
  tag: 'app-planification-pilot',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      // paginador
      $('app-planification-pilot .pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
