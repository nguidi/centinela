import QUnit from 'steal-qunit';
import { ViewModel } from './users';

// ViewModel unit tests
QUnit.module('centinela/components/app/users');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-users component');
});
