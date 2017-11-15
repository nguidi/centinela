import QUnit from 'steal-qunit';
import { ViewModel } from './email-sent';

// ViewModel unit tests
QUnit.module('centinela/components/user/email-sent');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the user-email-sent component');
});
