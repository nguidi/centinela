import fixture from 'can-fixture';
import Uav from '../uav';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}], Uav.connection.algebra);

fixture('/uavs/{_id}', store);

export default store;
