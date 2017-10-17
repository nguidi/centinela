// Initializes the `batteries` service on path `/batteries`
const createService = require('feathers-mongoose');
const createModel = require('../../models/batteries.model');
const hooks = require('./batteries.hooks');
const filters = require('./batteries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'batteries',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use(
    '/batteries'
  , Object.assign(
      createService(options)
    , {
        docs:
        {
          description: 'Gestión de Baterias'
        , definition: Model.jsonSchema()
        }
      }
    )
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('batteries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
