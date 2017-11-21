import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './path.less';
import view from './path.stache';

import 'gmap3'

export const ViewModel = DefineMap.extend({
  point: {
    value: new DefineMap({})
  },
  points: {
    value: new DefineList({})
  },
  addMarker: function()
  {
    let mapPoint = $('#add-marker').data('point');

    $('.map').data('gmap3')
      .marker(
        {
          position: mapPoint.latLng,
          icon: 'images/rsz_marker.png'
        }
      )
    $('.map').data('gmap3')
        .overlay({
        position: mapPoint.latLng,
        content: '<div class="box box-primary"> <div class="box-body">'+ this.point.name + '</div> </div>',
        x: 36,
        y:-64
      });

    this.points.push(this.point)

    this.point = new DefineMap({});
    
    $('#add-marker').modal('toggle');
  },
  cancelMarker: function()
  {
    console.log("CANCEL MARKER")
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

            /*
            $('.map').data('gmap3')
              .marker(
                {
                  position: event.latLng,
                  icon: 'images/rsz_marker.png'
                }
              ).then(function(marker){
               
                  .on(
                    'hidden.bs.modal'
                  , function()
                    {
                      marker.overlay({
                        position: center,
                        content:  '<div style="color:#000000; border:1px solid #FF0000;background-color: #00FF00; width:200px; line-height:20px; height: 20px; text-align:center">' +
                          'Hello World !' +
                        '</div>',
                        x:12,
                        y:-32
                      })
                    }
                  )
              })
            */
          })
    }
  }
});
