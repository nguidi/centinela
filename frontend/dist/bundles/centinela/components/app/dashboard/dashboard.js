define("centinela@0.0.0#components/app/dashboard/dashboard.stache!steal-stache@3.1.3#steal-stache",["module","can-stache","can-stache/src/mustache_core","can-view-import@3.2.3#can-view-import","can-stache-bindings@3.11.1#can-stache-bindings"],function(e,a,t){var r=a("components/app/dashboard/dashboard.stache",[{tokenType:"start",args:["section",!1,1]},{tokenType:"attrStart",args:["class",1]},{tokenType:"attrValue",args:["content",1]},{tokenType:"attrEnd",args:["class",1]},{tokenType:"end",args:["section",!1,1]},{tokenType:"chars",args:[" ",1]},{tokenType:"special",args:["#if dashboard.isResolved",1]},{tokenType:"chars",args:["\r\n    ",1]},{tokenType:"comment",args:[" Small boxes (Stat box) ",2]},{tokenType:"chars",args:["\r\n    ",2]},{tokenType:"special",args:["#each dashboard.value",3]},{tokenType:"chars",args:["\r\n    ",3]},{tokenType:"start",args:["div",!1,4]},{tokenType:"attrStart",args:["class",4]},{tokenType:"attrValue",args:["row",4]},{tokenType:"attrEnd",args:["class",4]},{tokenType:"end",args:["div",!1,4]},{tokenType:"chars",args:["\r\n      ",4]},{tokenType:"start",args:["div",!1,5]},{tokenType:"attrStart",args:["class",5]},{tokenType:"attrValue",args:["col-lg-3 col-xs-6",5]},{tokenType:"attrEnd",args:["class",5]},{tokenType:"end",args:["div",!1,5]},{tokenType:"chars",args:["\r\n        ",5]},{tokenType:"comment",args:[" small box ",6]},{tokenType:"chars",args:["\r\n        ",6]},{tokenType:"start",args:["div",!1,7]},{tokenType:"attrStart",args:["class",7]},{tokenType:"attrValue",args:["small-box bg-aqua",7]},{tokenType:"attrEnd",args:["class",7]},{tokenType:"end",args:["div",!1,7]},{tokenType:"chars",args:["\r\n          ",7]},{tokenType:"start",args:["div",!1,8]},{tokenType:"attrStart",args:["class",8]},{tokenType:"attrValue",args:["inner",8]},{tokenType:"attrEnd",args:["class",8]},{tokenType:"end",args:["div",!1,8]},{tokenType:"chars",args:["\r\n            ",8]},{tokenType:"start",args:["h3",!1,9]},{tokenType:"end",args:["h3",!1,9]},{tokenType:"special",args:["users",9]},{tokenType:"close",args:["h3",9]},{tokenType:"chars",args:["\r\n            ",9]},{tokenType:"start",args:["p",!1,10]},{tokenType:"end",args:["p",!1,10]},{tokenType:"chars",args:["Usuarios",10]},{tokenType:"close",args:["p",10]},{tokenType:"chars",args:["\r\n          ",10]},{tokenType:"close",args:["div",11]},{tokenType:"chars",args:["\r\n          ",11]},{tokenType:"start",args:["div",!1,12]},{tokenType:"attrStart",args:["class",12]},{tokenType:"attrValue",args:["icon",12]},{tokenType:"attrEnd",args:["class",12]},{tokenType:"end",args:["div",!1,12]},{tokenType:"chars",args:["\r\n            ",12]},{tokenType:"start",args:["i",!1,13]},{tokenType:"attrStart",args:["class",13]},{tokenType:"attrValue",args:["fa fa-users",13]},{tokenType:"attrEnd",args:["class",13]},{tokenType:"end",args:["i",!1,13]},{tokenType:"close",args:["i",13]},{tokenType:"chars",args:["\r\n          ",13]},{tokenType:"close",args:["div",14]},{tokenType:"chars",args:["\r\n          ",14]},{tokenType:"start",args:["a",!1,15]},{tokenType:"attrStart",args:["href",15]},{tokenType:"special",args:["routeUrl page='users'",15]},{tokenType:"attrEnd",args:["href",15]},{tokenType:"attrStart",args:["class",15]},{tokenType:"attrValue",args:["small-box-footer",15]},{tokenType:"attrEnd",args:["class",15]},{tokenType:"end",args:["a",!1,15]},{tokenType:"chars",args:["\r\n              Gestionar\r\n              ",15]},{tokenType:"start",args:["i",!1,17]},{tokenType:"attrStart",args:["class",17]},{tokenType:"attrValue",args:["fa fa-arrow-circle-right",17]},{tokenType:"attrEnd",args:["class",17]},{tokenType:"end",args:["i",!1,17]},{tokenType:"close",args:["i",17]},{tokenType:"chars",args:["\r\n          ",17]},{tokenType:"close",args:["a",18]},{tokenType:"chars",args:["\r\n        ",18]},{tokenType:"close",args:["div",19]},{tokenType:"chars",args:["\r\n      ",19]},{tokenType:"close",args:["div",20]},{tokenType:"chars",args:["\r\n      ",20]},{tokenType:"comment",args:[" ./col ",21]},{tokenType:"chars",args:["\r\n      ",21]},{tokenType:"start",args:["div",!1,22]},{tokenType:"attrStart",args:["class",22]},{tokenType:"attrValue",args:["col-lg-3 col-xs-6",22]},{tokenType:"attrEnd",args:["class",22]},{tokenType:"end",args:["div",!1,22]},{tokenType:"chars",args:["\r\n        ",22]},{tokenType:"comment",args:[" small box ",23]},{tokenType:"chars",args:["\r\n        ",23]},{tokenType:"start",args:["div",!1,24]},{tokenType:"attrStart",args:["class",24]},{tokenType:"attrValue",args:["small-box bg-green",24]},{tokenType:"attrEnd",args:["class",24]},{tokenType:"end",args:["div",!1,24]},{tokenType:"chars",args:["\r\n          ",24]},{tokenType:"start",args:["div",!1,25]},{tokenType:"attrStart",args:["class",25]},{tokenType:"attrValue",args:["inner",25]},{tokenType:"attrEnd",args:["class",25]},{tokenType:"end",args:["div",!1,25]},{tokenType:"chars",args:["\r\n            ",25]},{tokenType:"start",args:["h3",!1,26]},{tokenType:"end",args:["h3",!1,26]},{tokenType:"special",args:["equipments",26]},{tokenType:"close",args:["h3",26]},{tokenType:"chars",args:["\r\n            ",26]},{tokenType:"start",args:["p",!1,27]},{tokenType:"end",args:["p",!1,27]},{tokenType:"chars",args:["Equipos",27]},{tokenType:"close",args:["p",27]},{tokenType:"chars",args:["\r\n          ",27]},{tokenType:"close",args:["div",28]},{tokenType:"chars",args:["\r\n          ",28]},{tokenType:"start",args:["div",!1,29]},{tokenType:"attrStart",args:["class",29]},{tokenType:"attrValue",args:["icon",29]},{tokenType:"attrEnd",args:["class",29]},{tokenType:"end",args:["div",!1,29]},{tokenType:"chars",args:["\r\n            ",29]},{tokenType:"start",args:["i",!1,30]},{tokenType:"attrStart",args:["class",30]},{tokenType:"attrValue",args:["fa fa-camera",30]},{tokenType:"attrEnd",args:["class",30]},{tokenType:"end",args:["i",!1,30]},{tokenType:"close",args:["i",30]},{tokenType:"chars",args:["\r\n          ",30]},{tokenType:"close",args:["div",31]},{tokenType:"chars",args:["\r\n          ",31]},{tokenType:"start",args:["a",!1,32]},{tokenType:"attrStart",args:["href",32]},{tokenType:"special",args:["routeUrl page='equipment'",32]},{tokenType:"attrEnd",args:["href",32]},{tokenType:"attrStart",args:["class",32]},{tokenType:"attrValue",args:["small-box-footer",32]},{tokenType:"attrEnd",args:["class",32]},{tokenType:"end",args:["a",!1,32]},{tokenType:"chars",args:["\r\n              Gestionar\r\n              ",32]},{tokenType:"start",args:["i",!1,34]},{tokenType:"attrStart",args:["class",34]},{tokenType:"attrValue",args:["fa fa-arrow-circle-right",34]},{tokenType:"attrEnd",args:["class",34]},{tokenType:"end",args:["i",!1,34]},{tokenType:"close",args:["i",34]},{tokenType:"chars",args:["\r\n          ",34]},{tokenType:"close",args:["a",35]},{tokenType:"chars",args:["\r\n        ",35]},{tokenType:"close",args:["div",36]},{tokenType:"chars",args:["\r\n      ",36]},{tokenType:"close",args:["div",37]},{tokenType:"chars",args:["\r\n      ",37]},{tokenType:"comment",args:[" ./col ",38]},{tokenType:"chars",args:["\r\n      ",38]},{tokenType:"start",args:["div",!1,39]},{tokenType:"attrStart",args:["class",39]},{tokenType:"attrValue",args:["col-lg-3 col-xs-6",39]},{tokenType:"attrEnd",args:["class",39]},{tokenType:"end",args:["div",!1,39]},{tokenType:"chars",args:["\r\n        ",39]},{tokenType:"comment",args:[" small box ",40]},{tokenType:"chars",args:["\r\n        ",40]},{tokenType:"start",args:["div",!1,41]},{tokenType:"attrStart",args:["class",41]},{tokenType:"attrValue",args:["small-box bg-yellow",41]},{tokenType:"attrEnd",args:["class",41]},{tokenType:"end",args:["div",!1,41]},{tokenType:"chars",args:["\r\n          ",41]},{tokenType:"start",args:["div",!1,42]},{tokenType:"attrStart",args:["class",42]},{tokenType:"attrValue",args:["inner",42]},{tokenType:"attrEnd",args:["class",42]},{tokenType:"end",args:["div",!1,42]},{tokenType:"chars",args:["\r\n            ",42]},{tokenType:"start",args:["h3",!1,43]},{tokenType:"end",args:["h3",!1,43]},{tokenType:"special",args:["batteries",43]},{tokenType:"close",args:["h3",43]},{tokenType:"chars",args:["\r\n            ",43]},{tokenType:"start",args:["p",!1,44]},{tokenType:"end",args:["p",!1,44]},{tokenType:"chars",args:["Baterias",44]},{tokenType:"close",args:["p",44]},{tokenType:"chars",args:["\r\n          ",44]},{tokenType:"close",args:["div",45]},{tokenType:"chars",args:["\r\n          ",45]},{tokenType:"start",args:["div",!1,46]},{tokenType:"attrStart",args:["class",46]},{tokenType:"attrValue",args:["icon",46]},{tokenType:"attrEnd",args:["class",46]},{tokenType:"end",args:["div",!1,46]},{tokenType:"chars",args:["\r\n            ",46]},{tokenType:"start",args:["i",!1,47]},{tokenType:"attrStart",args:["class",47]},{tokenType:"attrValue",args:["fa fa-battery-3",47]},{tokenType:"attrEnd",args:["class",47]},{tokenType:"end",args:["i",!1,47]},{tokenType:"close",args:["i",47]},{tokenType:"chars",args:["\r\n          ",47]},{tokenType:"close",args:["div",48]},{tokenType:"chars",args:["\r\n          ",48]},{tokenType:"start",args:["a",!1,49]},{tokenType:"attrStart",args:["href",49]},{tokenType:"special",args:["routeUrl page='batteries'",49]},{tokenType:"attrEnd",args:["href",49]},{tokenType:"attrStart",args:["class",49]},{tokenType:"attrValue",args:["small-box-footer",49]},{tokenType:"attrEnd",args:["class",49]},{tokenType:"end",args:["a",!1,49]},{tokenType:"chars",args:["\r\n              Gestionar\r\n              ",49]},{tokenType:"start",args:["i",!1,51]},{tokenType:"attrStart",args:["class",51]},{tokenType:"attrValue",args:["fa fa-arrow-circle-right",51]},{tokenType:"attrEnd",args:["class",51]},{tokenType:"end",args:["i",!1,51]},{tokenType:"close",args:["i",51]},{tokenType:"chars",args:["\r\n          ",51]},{tokenType:"close",args:["a",52]},{tokenType:"chars",args:["\r\n        ",52]},{tokenType:"close",args:["div",53]},{tokenType:"chars",args:["\r\n      ",53]},{tokenType:"close",args:["div",54]},{tokenType:"chars",args:["\r\n      ",54]},{tokenType:"comment",args:[" ./col ",55]},{tokenType:"chars",args:["\r\n      ",55]},{tokenType:"start",args:["div",!1,56]},{tokenType:"attrStart",args:["class",56]},{tokenType:"attrValue",args:["col-lg-3 col-xs-6",56]},{tokenType:"attrEnd",args:["class",56]},{tokenType:"end",args:["div",!1,56]},{tokenType:"chars",args:["\r\n        ",56]},{tokenType:"comment",args:[" small box ",57]},{tokenType:"chars",args:["\r\n        ",57]},{tokenType:"start",args:["div",!1,58]},{tokenType:"attrStart",args:["class",58]},{tokenType:"attrValue",args:["small-box bg-red",58]},{tokenType:"attrEnd",args:["class",58]},{tokenType:"end",args:["div",!1,58]},{tokenType:"chars",args:["\r\n          ",58]},{tokenType:"start",args:["div",!1,59]},{tokenType:"attrStart",args:["class",59]},{tokenType:"attrValue",args:["inner",59]},{tokenType:"attrEnd",args:["class",59]},{tokenType:"end",args:["div",!1,59]},{tokenType:"chars",args:["\r\n            ",59]},{tokenType:"start",args:["h3",!1,60]},{tokenType:"end",args:["h3",!1,60]},{tokenType:"special",args:["uavs",60]},{tokenType:"close",args:["h3",60]},{tokenType:"chars",args:["\r\n            ",60]},{tokenType:"start",args:["p",!1,61]},{tokenType:"end",args:["p",!1,61]},{tokenType:"chars",args:["UAVs",61]},{tokenType:"close",args:["p",61]},{tokenType:"chars",args:["\r\n          ",61]},{tokenType:"close",args:["div",62]},{tokenType:"chars",args:["\r\n          ",62]},{tokenType:"start",args:["div",!1,63]},{tokenType:"attrStart",args:["class",63]},{tokenType:"attrValue",args:["icon",63]},{tokenType:"attrEnd",args:["class",63]},{tokenType:"end",args:["div",!1,63]},{tokenType:"chars",args:["\r\n            ",63]},{tokenType:"start",args:["i",!1,64]},{tokenType:"attrStart",args:["class",64]},{tokenType:"attrValue",args:["fa fa-plane",64]},{tokenType:"attrEnd",args:["class",64]},{tokenType:"end",args:["i",!1,64]},{tokenType:"close",args:["i",64]},{tokenType:"chars",args:["\r\n          ",64]},{tokenType:"close",args:["div",65]},{tokenType:"chars",args:["\r\n          ",65]},{tokenType:"start",args:["a",!1,66]},{tokenType:"attrStart",args:["href",66]},{tokenType:"special",args:["routeUrl page='uavs'",66]},{tokenType:"attrEnd",args:["href",66]},{tokenType:"attrStart",args:["class",66]},{tokenType:"attrValue",args:["small-box-footer",66]},{tokenType:"attrEnd",args:["class",66]},{tokenType:"end",args:["a",!1,66]},{tokenType:"chars",args:["\r\n              Gestionar\r\n              ",66]},{tokenType:"start",args:["i",!1,68]},{tokenType:"attrStart",args:["class",68]},{tokenType:"attrValue",args:["fa fa-arrow-circle-right",68]},{tokenType:"attrEnd",args:["class",68]},{tokenType:"end",args:["i",!1,68]},{tokenType:"close",args:["i",68]},{tokenType:"chars",args:["\r\n          ",68]},{tokenType:"close",args:["a",69]},{tokenType:"chars",args:["\r\n        ",69]},{tokenType:"close",args:["div",70]},{tokenType:"chars",args:["\r\n      ",70]},{tokenType:"close",args:["div",71]},{tokenType:"chars",args:["\r\n      ",71]},{tokenType:"comment",args:[" ./col ",72]},{tokenType:"chars",args:["\r\n    ",72]},{tokenType:"close",args:["div",73]},{tokenType:"chars",args:["\r\n    ",73]},{tokenType:"special",args:["/each",74]},{tokenType:"chars",args:["\r\n  ",74]},{tokenType:"special",args:["/if",75]},{tokenType:"chars",args:["\r\n\n",75]},{tokenType:"close",args:["section",77]},{tokenType:"done",args:[77]}]);return function(a,s,n){var o={module:e};return s instanceof t.Options||(s=new t.Options(s||{})),r(a,s.add(o),n)}}),define("centinela@0.0.0#models/dashboard",["exports","can-define/map/","can-define/list/list","can-connect","./feathers-client","can-connect-feathers/service","./behaviors","./algebra"],function(e,a,t,r,s,n,o,p){"use strict";function g(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var y=g(a),T=g(t),k=g(r),c=g(s),l=g(n),d=g(o),i=g(p),h=y.default.extend({name:"string",cuit:"string"}),u=y.default.extend("Dashboard",{seal:!1},{_id:"any",users:"number",batteries:"number",equipments:"number",flights:"number",organization:{Type:h,value:h}});u.List=T.default.extend({"#":u}),u.connection=(0,k.default)([l.default].concat(function(e){if(Array.isArray(e)){for(var a=0,t=Array(e.length);a<e.length;a++)t[a]=e[a];return t}return Array.from(e)}(d.default)),{Map:u,List:u.List,feathersService:c.default.service("/dashboard"),name:"dashboard",algebra:i.default}),u.algebra=i.default,e.default=u}),define("centinela@0.0.0#components/app/dashboard/dashboard",["exports","can-component","can-define/map/","./dashboard.stache","centinela/models/user","centinela/models/dashboard","./dashboard.less"],function(e,a,t,r,s,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.ViewModel=void 0;var p=o(a),g=o(t),y=o(r),T=o(s),k=o(n),c=e.ViewModel=g.default.extend({user:{value:T.default},dashboard:{get:function(){return k.default.getList({"organization._id":this.user.organization._id})}}});e.default=p.default.extend({tag:"app-dashboard",ViewModel:c,view:y.default})});