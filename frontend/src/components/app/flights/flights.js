import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './flights.less';
import view from './flights.stache';

import 'bootstrap/dist/js/bootstrap';
import 'centinela/pagination.min.js';

import User from 'centinela/models/user'
import Flight from 'centinela/models/flight'

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
      this.instances = Flight.getList({$skip: val, search: this.filter})
      this.instances.then(function(raw){
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
  instances:{
    value () {
      var self = this;
      return  Flight.getList().then(function(raw){
                self.updatePagination(raw.total, raw.skip, raw.limit, raw.length, self);
                return raw;
              });
    }
  },
  instance: {
    value: new Flight({})
  },
  updatePagination: function(total, skip, limit, count, self)
  {
    self.limit = limit;
    self.count = count;
    self.total = total;
    if (total > 0) {
      $('.pagination').data('twbsPagination').destroy();
      let page = Math.ceil(skip/limit)+1;
      let firstInstance = ((page-1)*limit+1);
      let lastInstance = (((page-1)*limit)+limit) > total ? total : (((page-1)*limit)+limit);
      $('span.displayed-instances').html(firstInstance+' al '+lastInstance);
      $('span.total-instances').html(total);
      $('.pagination').twbsPagination({
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
    this.filter = $('[name=search]').val();
    this.skip = 0;
  }
});

export default Component.extend({
  tag: 'app-flights',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	modales
      $('.modal').modal({ show: false });

      // paginador
      $('.pagination').twbsPagination({
        totalPages: 1,
        visiblePages: 5
      });
    }
  }
});
