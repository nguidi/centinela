import QUnit from 'steal-qunit';
import { ViewModel } from './register';

// ViewModel unit tests
QUnit.module('centinela/components/user/register');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the user-register component');
});
