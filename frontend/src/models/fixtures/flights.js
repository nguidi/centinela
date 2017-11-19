import fixture from 'can-fixture';
import Flight from '../flight';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}], Flight.connection.algebra);

fixture('/flights/{_id}', store);

export default store;
