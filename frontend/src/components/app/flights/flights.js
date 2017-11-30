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
  instances:{
    value () {
      var self = this;
      return  Flight.getList().then(
                function(raw)
                {
                  if (raw.total) {
                    $('.pagination').data('twbsPagination').destroy();
                    $('.pagination').twbsPagination({
                      totalPages: Math.ceil(raw.total/raw.limit)
                    , startPage: Math.ceil(raw.skip/raw.limit) + 1
                    , onPageClick: function (event, page) {
                        self.instances = Flight.getList({$skip: (page-1)*raw.limit})
                      }
                    });
                  }

                  return raw;
                }
              )
    }
  },
  instance: {
    value: new Flight({})
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
