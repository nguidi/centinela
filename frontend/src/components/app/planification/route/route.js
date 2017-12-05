import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import './route.less';
import view from './route.stache';

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
    var w = this.uav.weight;
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
    var vp = 12; // Media de velocidad DJI
    var mt = Math.ceil(b.capacity*0.0075+3.7);
    var tc = Math.ceil((b.discharge/100)*mt);
    var wc = this.cellWeightPeak(b.configuration) / (this.getWeight() + b.weight);
    var tm = (mt - tc) - ((wc > 1) ? 0 : (1-wc)*mt);
    return (b.capacity/(tm*vp));
  }

, setCurrentBattery: function(b)
  {
    this.remainingBattery = parseInt(this.batteries.get(b).capacity);
    this.currentConsumption = this.getConsumption(this.batteries.get(b))
  }

, calculateRoutes: function()
  {
    var self = this;
    var b = 0;

    var tempRoutes = permutation(this.points.get());
    
    tempRoutes.map(function(route){
      
      route.unshift(self.startPoint.get())
      route.push(self.startPoint.get())
      return route;
    });

    tempRoutes.each(
      function(possibleRoute, routeIndex)
      {
        var z = 0;
        self.routeConsumption.push(0);

        console.log(possibleRoute,(possibleRoute.length - 1))

        while (z < (possibleRoute.length - 1) && (b < self.batteries.length)) {
          
          console.log("POSSIBLE", possibleRoute, z)
          
          var cij = self.currentConsumption*self.getDistance(possibleRoute.get(z),possibleRoute.get(z+1));
          var cj0 = self.currentConsumption*self.getDistance(possibleRoute.get(z+1),self.startPoint);
          
          if (self.remainingBattery >= (cij + cj0)) {
            self.remainingBattery -= cij;
            self.routeConsumption[routeIndex] += cij;
          } else {
            self.remainingBattery -= cj0;
            self.routeConsumption[routeIndex] +=cj0;
            possibleRoute.splice(z+1,0,self.startPoint);
            b++;
            self.setCurrentBattery(b);
          }

          z++;
        }
      }
    )
  }

, init: function()
  {
    var self = this;

    let devData = JSON.parse(localStorage.wizardData);

    this.uav = new UAV(devData.uav)
    this.pilot = new User(devData.pilot)
    this.equipment = new Equipment.List(devData.equipment)
    this.batteries = new Battery.List(devData.batteries)
    this.points = new DefineList(devData.points)
    this.startPoint = new DefineMap(devData.startPoint)
    this.setCurrentBattery(0);
    
    console.log("Calculated Routes", this.calculateRoutes())
  }
});

export default Component.extend({
  tag: 'app-planification-route',
  ViewModel,
  view
});
