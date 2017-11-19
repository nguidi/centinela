import QUnit from 'steal-qunit';
import Battery from './battery';

QUnit.module('models/battery');

QUnit.test('getList', function(){
  stop();
  Battery.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
