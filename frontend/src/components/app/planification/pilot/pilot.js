import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './pilot.less';
import view from './pilot.stache';

import User from 'centinela/models/user'

export const ViewModel = DefineMap.extend({
  user: {
    value: User
  }

, pilots: {
    get() {
      return User.getList({"profile.type": 3})
    }
  }

, selectedPilot:
  {
    value: new User.List([])
  }

, addPilot: function(pilotToAdd, pilotIndex)
  {
    if (this.selectedPilot.length == 0) {
      this.selectedPilot.push(pilotToAdd);
      $('.organization-pilots tr[pilot-index="'+pilotIndex+'"]').addClass('active');
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
  view
});
