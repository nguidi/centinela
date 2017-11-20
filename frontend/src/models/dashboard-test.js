import QUnit from 'steal-qunit';
import Dashboard from './dashboard';

QUnit.module('models/dashboard');

QUnit.test('getList', function(){
  stop();
  Dashboard.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
