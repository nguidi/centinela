const batteries = require('./batteries/batteries.service.js');
const uavs = require('./uavs/uavs.service.js');
const flights = require('./flights/flights.service.js');
const equipments = require('./equipments/equipments.service.js');
const users = require('./users/users.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(uavs);
  app.configure(batteries);
  app.configure(equipments);
  app.configure(flights);
};
