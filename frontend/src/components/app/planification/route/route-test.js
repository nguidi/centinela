import QUnit from 'steal-qunit';
import { ViewModel } from './route';

// ViewModel unit tests
QUnit.module('centinela/components/app/planification/route');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-planification-route component');
});
