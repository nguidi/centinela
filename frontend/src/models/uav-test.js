import QUnit from 'steal-qunit';
import Uav from './uav';

QUnit.module('models/uav');

QUnit.test('getList', function(){
  stop();
  Uav.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
