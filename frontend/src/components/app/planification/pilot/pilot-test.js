import QUnit from 'steal-qunit';
import { ViewModel } from './pilot';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/pilot');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-pilot component');
});
