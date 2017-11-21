import QUnit from 'steal-qunit';
import { ViewModel } from './batteries';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/batteries');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-batteries component');
});
