import QUnit from 'steal-qunit';
import { ViewModel } from './flights';

// ViewModel unit tests
QUnit.module('centinela/components/app/flights');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-flights component');
});
