import QUnit from 'steal-qunit';
import { ViewModel } from './complete';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/complete');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-complete component');
});
