import fixture from 'can-fixture';
import Battery from '../battery';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}], Battery.connection.algebra);

fixture('/batteries/{_id}', store);

export default store;
