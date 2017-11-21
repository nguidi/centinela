import QUnit from 'steal-qunit';
import { ViewModel } from './path';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/path');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-path component');
});
