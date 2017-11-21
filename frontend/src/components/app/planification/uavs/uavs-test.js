import QUnit from 'steal-qunit';
import { ViewModel } from './uavs';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/uavs');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-uavs component');
});
