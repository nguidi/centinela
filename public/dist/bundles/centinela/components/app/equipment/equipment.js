define("centinela@0.0.0#components/app/equipment/equipment.stache!steal-stache@3.1.3#steal-stache",["module","can-stache","can-stache/src/mustache_core","can-view-import@3.2.5#can-view-import","can-stache-bindings@3.11.1#can-stache-bindings"],function(e,n,t){var a=n("components/app/equipment/equipment.stache",[{tokenType:"start",args:["p",!1,1]},{tokenType:"end",args:["p",!1,1]},{tokenType:"special",args:["message",1]},{tokenType:"close",args:["p",1]},{tokenType:"done",args:[1]}]);return function(n,s,p){var i={module:e};return s instanceof t.Options||(s=new t.Options(s||{})),a(n,s.add(i),p)}}),define("centinela@0.0.0#components/app/equipment/equipment",["exports","can-component","can-define/map/","./equipment.stache","./equipment.less"],function(e,n,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.ViewModel=void 0;var p=s(n),i=s(t),o=s(a),c=e.ViewModel=i.default.extend({message:{value:"This is the app-equipment component"}});e.default=p.default.extend({tag:"app-equipment",ViewModel:c,view:o.default})});