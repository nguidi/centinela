import QUnit from 'steal-qunit';
import { ViewModel } from './batteries';

// ViewModel unit tests
QUnit.module('centinela/components/app/batteries');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-batteries component');
});
