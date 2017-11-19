import QUnit from 'steal-qunit';
import { ViewModel } from './dashboard';

// ViewModel unit tests
QUnit.module('centinela/components/app/dashboard');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-dashboard component');
});
