import QUnit from 'steal-qunit';
import Flight from './flight';

QUnit.module('models/flight');

QUnit.test('getList', function(){
  stop();
  Flight.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
