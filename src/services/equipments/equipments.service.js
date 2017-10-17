// Initializes the `equipments` service on path `/equipments`
const createService = require('feathers-mongoose');
const createModel = require('../../models/equipments.model');
const hooks = require('./equipments.hooks');
const filters = require('./equipments.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'equipments',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use(
    '/equipments'
  , Object.assign(
      createService(options)
    , {
        docs:
        {
          description: 'Gestión de Equipamiento'
        , definition: Model.jsonSchema()
        }
      }
    )
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('equipments');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
