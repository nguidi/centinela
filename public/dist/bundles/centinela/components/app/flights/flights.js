define("centinela@0.0.0#components/app/flights/flights.stache!steal-stache@3.1.3#steal-stache",["module","can-stache","can-stache/src/mustache_core","can-view-import@3.2.3#can-view-import","can-stache-bindings@3.11.1#can-stache-bindings"],function(e,t,n){var s=t("components/app/flights/flights.stache",[{tokenType:"start",args:["p",!1,1]},{tokenType:"end",args:["p",!1,1]},{tokenType:"special",args:["message",1]},{tokenType:"close",args:["p",1]},{tokenType:"done",args:[1]}]);return function(t,a,i){var o={module:e};return a instanceof n.Options||(a=new n.Options(a||{})),s(t,a.add(o),i)}}),define("centinela@0.0.0#components/app/flights/flights",["exports","can-component","can-define/map/","./flights.stache","./flights.less"],function(e,t,n,s){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.ViewModel=void 0;var i=a(t),o=a(n),c=a(s),l=e.ViewModel=o.default.extend({message:{value:"This is the app-flights component"}});e.default=i.default.extend({tag:"app-flights",ViewModel:l,view:c.default})});