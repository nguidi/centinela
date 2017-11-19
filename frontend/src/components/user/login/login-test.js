import QUnit from 'steal-qunit';
import { ViewModel } from './login';

// ViewModel unit tests
QUnit.module('centinela/components/user/login');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the user-login component');
});
