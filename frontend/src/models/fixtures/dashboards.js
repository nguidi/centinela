import fixture from 'can-fixture';
import Dashboard from '../dashboard';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}], Dashboard.connection.algebra);

fixture('/dashboard/{_id}', store);

export default store;
