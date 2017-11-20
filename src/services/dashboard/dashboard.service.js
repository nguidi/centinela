// Initializes the `dashboard` service on path `/dashboard`
const createService = require('feathers-mongoose');
const createModel = require('../../models/dashboard.model');
const hooks = require('./dashboard.hooks');
const filters = require('./dashboard.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'dashboard',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use(
    '/dashboard'
  , Object.assign(
      createService(options)
    , {
        docs:
        {
          description: 'Dashboard'
        , definition: Model.jsonSchema()
        }
      }
    )
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('dashboard');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
