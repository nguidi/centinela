import QUnit from 'steal-qunit';
import Equipment from './equipment';

QUnit.module('models/equipment');

QUnit.test('getList', function(){
  stop();
  Equipment.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
