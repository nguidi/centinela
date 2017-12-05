import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './path.less';
import view from './path.stache';

import 'gmap3';

var Point = DefineMap.extend({
    seal: false
  }
, {
    name: {
      type: 'string'
    }
  , description: {
      type: 'string'
    , value: ''
    }
  , lat: {
      type: 'number'
    , value: 0
    }
  , lng: {
      type: 'number'
    , value: 0
    }
  }
);

Point.List = DefineList.extend({
    "#": Point
});


export const ViewModel = DefineMap.extend({
  point: {
    value: new Point({})
  },
  points: {
    value: new Point.List([])
  },
  startPoint: {
    value: new Point.List([])
  },
  setToEdit: function(pointToEdit)
  {
    this.point = pointToEdit;
    $('#edit-marker').modal('toggle');
  },
  setToRemove: function(pointToRemove)
  {
    this.point = pointToRemove;
    $('#remove-marker').modal('toggle');
  },
  create: function()
  {
    let self = this;

    let mapPoint = $('#add-marker').data('point');

    $('.map').data('gmap3')
      .marker(
        {
          position: mapPoint.latLng,
          icon: (self.startPoint.length == 0) ? 'images/rsz_marker_base.png' : 'images/rsz_marker.png',
        }
      ).then(function(marker){
        self.point.marker = marker;

        $('.map').data('gmap3')
            .overlay({
              position: mapPoint.latLng,
              content: '<div class="box '+((self.startPoint.length == 0) ? 'box-success' : 'box-primary')+'"> <div class="box-body">'+ self.point.name + '</div> </div>',
              x: 36,
              y:-64
            }).then(function(overlay){
              self.point.overlay = overlay;

              self.point.lat = mapPoint.latLng.lat()
              self.point.lng = mapPoint.latLng.lng()

              if (self.startPoint.length > 0) {
                self.points.push(self.point);
              } else {
                self.point.start = true;
                self.startPoint.push(self.point);
              }
      
              self.point = new Point({});
              
              $('#add-marker').modal('toggle');
            });
      })
  },
  update: function()
  {
    this.point.overlay.$.find('.box-body').html(this.point.name)
    $('#edit-marker').modal('toggle');
  },
  destroy: function()
  {
    this.point.marker.setMap(null);
    this.point.overlay.setMap(null);

    if (this.point.start) {
      this.startPoint.pop();
    } else {
      this.points.splice(this.points.indexOf(this.point),1);
    }
    
    $('#remove-marker').modal('toggle');
  }
});

export default Component.extend({
  tag: 'app-planification-path',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
			$('#createEquipment form.create, #editEquipment form.edit').formValidation();
      
      //	modales
      $('.modal').modal({ show: false })

      // maps
      $('.map')
        .gmap3(
          {
            address: "San Martin 1171, Campana, Buenos Aires, Argentina"
          , zoom: 14
          , mapTypeId : google.maps.MapTypeId.ROADMAP
          }
        ).on(
          'click'
        , function (gmap, event) {
            $('#add-marker').data('point', event)
            $('#add-marker').modal('toggle');
          }
        );
    }
  }
});
