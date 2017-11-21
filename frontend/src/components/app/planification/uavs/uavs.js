import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './uavs.less';
import view from './uavs.stache';

import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'

export const ViewModel = DefineMap.extend({

  user: {
    value: User
  }

,  uavs: {
    get() {
      return UAV.getList({'organization._id': this.user.organization._id})
    }
  }

, selectedUAV:
  {
    value: new UAV.List([])
  }

, addUAV: function(uavToAdd, uavIndex)
  {
    if (this.selectedUAV.length == 0) {
      this.selectedUAV.push(uavToAdd);
      $('.organization-uavs tr[uav-index="'+uavIndex+'"]').addClass('active');
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
  view
});
