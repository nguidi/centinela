import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './route.less';
import view from './route.stache';

import 'gmap3';

import User from 'centinela/models/user'
import UAV from 'centinela/models/uav'
import Equipment from 'centinela/models/equipment'
import Battery from 'centinela/models/battery'

function permutation(a){
  
    let res = [];
    for(let i=0; i<a.length; i++){
      let restA = a.slice(0,i).concat(a.slice(i+1));
      let rest = permutation( restA);
      if(rest.length === 0){
        res.push([a[i]]);
      }else{
        for(let j=0; j<rest.length; j++){
          res.push([a[i]].concat(rest[j]));
        }
      }
    }
  
    return res;
  }

export const ViewModel = DefineMap.extend({
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

, points: {
    value: new DefineList()
  }

, startPoint: {
    value: new DefineList()
  }

, remainingBattery: {
    value: 0  
  }

, routeConsumption: {
    value: new DefineList()  
  }

, currentConsumption: {
    value: 0 
  }

, possiblesRoutes: {
  value: []
}

// methods
, rad: function(x)
  {
    return x * Math.PI / 180;
  }

, getDistance: function(p1, p2)
  {
    var R = 6378137;
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

, getWeight: function()
  {
    var w = this.uav.get(0).weight;
    this.equipment.each(function(e) {
      w+=e.weight;
    })
    return w;    
  }

, cellWeightPeak: function(s)
  {
    switch(s) {
      case 'C1':
        return 100;
        break;
      case 'C2':
        return 220;
        break;
      case 'C3':
        return 850;
        break;
      case 'C4':
        return 1800;
        break;
      case 'C6':
        return 2600;
        break;
    }
  }

, getConsumption: function(b)
  {
    var vp = 16; // Media de velocidad DJI
    var mt = Math.ceil(b.capacity*0.0075+3.7);
    var tc = Math.ceil((b.discharge/100)*mt);
    var wc = (this.getWeight() + b.weight) / this.cellWeightPeak(b.configuration);
    var tm = (mt - tc) - ((wc > 1) ? 0 : wc*mt);
    return (b.capacity/(4*tm*vp));
  }

, setCurrentBattery: function(b)
  {
    this.remainingBattery = parseInt(this.batteries.get(b).capacity);
    this.currentConsumption = this.getConsumption(this.batteries.get(b))
  }

, calculateRoutes: function()
  {
    var self = this; 

    var tempRoutes = permutation(this.points.get());
    self.routeConsumption = [];
    self.possiblesRoutes = [];
    
    tempRoutes.map(function(route){
      
      route.unshift(self.startPoint.get(0).get())
      route.push(self.startPoint.get(0).get())
      return route;
    });

    tempRoutes.forEach(
      function(possibleRoute, routeIndex)
      {
        var z = 0;
        var b = 0;
        var prevReturn = 0;
        var gotBattery = true;
        self.setCurrentBattery(b);

        self.routeConsumption.push(0);
        
        while (z < (possibleRoute.length - 1) && gotBattery) {
          
          var i = z;
          var j = z +1;
          
          var cij = self.currentConsumption*self.getDistance(possibleRoute[i],possibleRoute[j]);
          var cj0 = self.currentConsumption*self.getDistance(possibleRoute[j],self.startPoint.get(0));
          
          if (self.remainingBattery >= (cij + cj0)) {
            self.remainingBattery -= cij;
            self.routeConsumption[routeIndex] += cij;
            prevReturn = cj0;
          } else {
            self.remainingBattery -= prevReturn;
            self.routeConsumption[routeIndex] += prevReturn;
            possibleRoute.splice(j,0,self.startPoint.get(0).get());
            if (b == (self.batteries.length -1))
              gotBattery = false;
            else
              b++;
            self.setCurrentBattery(b);
          }

          z++;
        }

        self.possiblesRoutes.push(gotBattery);
      }
    );

    return  tempRoutes.map(
              function(r, i)
              {
                return  {
                          path: r.map(function(p){p.start = (p.name == self.startPoint.get(0).name); return p;})
                        , consumption:  parseInt(self.routeConsumption.get(i))
                        , possible: self.possiblesRoutes.get(i)
                        }
              }
            );
  }
//  view
, routes:
  {
    value: new DefineList([])
  }

, flightRoute:
  {
    value: new DefineMap()
  }


, currentPath:
  {
    value: undefined
  }

, routeNumber: function(index)
  {
    return index+1;
  }

, setRoute: function(routeToVisualize)
  {
    var self = this;
    console.log(routeToVisualize)
    if (self.currentPath)
      self.currentPath.setMap(null);

    $('.map-routes').data('gmap3')
      .polyline({
        strokeColor: "#5bc0de",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        icons: [{
            icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
            offset: '100%',
            repeat: '100px'
        }],
        path: routeToVisualize.path.map(function(p){
                return [p.lat, p.lng]
              }).get()
        }).then(function(polyline){
          self.currentPath = polyline;
        });

    this.flightRoute = routeToVisualize;
  }

, init: function()
  {
    var self = this;
    /*
    let devData = JSON.parse(localStorage.wizardData);

    this.uav = new UAV(devData.uav)
    this.pilot = new User(devData.pilot)
    this.equipment = new Equipment.List(devData.equipment)
    this.batteries = new Battery.List(devData.batteries)
    this.points = new DefineList(devData.points)
    this.startPoint = new DefineMap(devData.startPoint)
    this.setCurrentBattery(0);
    */
    $('[aria-controls=routes]').on(
      'click'
    , function()
      {
        self.routes = self.calculateRoutes().filter(
                        function(r)
                        {
                          return r.possible
                        }
                      ).sort(
                        function(a,b)
                        {
                          return a.consumption < b.consumption
                        }
                      ).slice(0,3);

          if (!$('.map-routes').data('gmap3'))
            $('.map-routes')
              .gmap3(
                {
                  address: "San Martin 1171, Campana, Buenos Aires, Argentina"
                , zoom: 14
                , mapTypeId : google.maps.MapTypeId.ROADMAP
                }
              ).then(
                function()
                {
                  $('.map-routes').data('gmap3')
                    .marker(
                      {
                        position: [self.startPoint.get(0).lat , self.startPoint.get(0).lng],
                        icon: 'images/rsz_marker_base.png'
                      }
                    );
        
                  self.points.each(function(p) {
                    $('.map-routes').data('gmap3')
                      .marker(
                        {
                          position: [p.lat, p.lng],
                          icon: 'images/rsz_marker.png'
                        }
                      );
                  });
                }
              );
      }
    );
    
  }
  */
});

export default Component.extend({
  tag: 'app-planification-route',
  ViewModel,
  view
});
