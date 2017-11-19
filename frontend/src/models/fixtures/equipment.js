import fixture from 'can-fixture';
import Equipment from '../equipment';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}], Equipment.connection.algebra);

fixture('/equipment/{_id}', store);

export default store;
