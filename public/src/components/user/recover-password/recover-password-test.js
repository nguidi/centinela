import QUnit from 'steal-qunit';
import { ViewModel } from './recover-password';

// ViewModel unit tests
QUnit.module('centinela/components/user/recover-password');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the user-recover-password component');
});
