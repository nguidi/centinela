// auth dependencies
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const auth = require('feathers-authentication');

// app services
const batteries = require('./batteries/batteries.service.js');
const uavs = require('./uavs/uavs.service.js');
const flights = require('./flights/flights.service.js');
const equipments = require('./equipments/equipments.service.js');
const users = require('./users/users.service.js');

const dashboard = require('./dashboard/dashboard.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars

  // configure app auth service
  app.configure(auth(app.get('auth')))
    .configure(jwt())
    .configure(local())

  app.service('authentication').hooks({
    before: {
      create: [
        // You can chain multiple strategies
        auth.hooks.authenticate(['jwt', 'local'])
      ],
      remove: [
        auth.hooks.authenticate('jwt')
      ]
    }
  });

  // configure app services
  app.configure(users);
  app.configure(uavs);
  app.configure(batteries);
  app.configure(equipments);
  app.configure(flights);
  app.configure(dashboard);
};
