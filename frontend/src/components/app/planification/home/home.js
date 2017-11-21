import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './home.less';
import view from './home.stache';

import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'
import Equipment from 'centinela/models/equipment'
import Battery from 'centinela/models/battery'

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-notify';

export const ViewModel= DefineMap.extend({
  
  // data
  uav: {
    value: new UAV.List([])
  }

, pilot: {
    value: new User.List([])
  }

, equipment: {
    value: new Equipment.List([])
  }

, batteries: {
    value: new Battery.List([])
  }

, path: {
    value: []
  }
 
   // methods
,  nextStep: function() {
    $('.wizard .nav-tabs li.active').next().removeClass('disabled');
    $('.wizard .nav-tabs li.active').next().find('a[data-toggle="tab"]').click();
  }

, prevStep: function() {
    $('.wizard .nav-tabs li.active').prev().find('a[data-toggle="tab"]').click();
  }

});

export default Component.extend({
  tag: 'app-planification',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {      
      //Wizard
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

          var $target = $(e.target);
      
          if ($target.parent().hasClass('disabled')) {
              return false;
          }
      });
    }
  }
});