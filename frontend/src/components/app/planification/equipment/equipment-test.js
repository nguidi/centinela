import QUnit from 'steal-qunit';
import { ViewModel } from './equipment';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/equipment');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-equipment component');
});
