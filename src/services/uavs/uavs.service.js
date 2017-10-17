// Initializes the `uavs` service on path `/uavs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/uavs.model');
const hooks = require('./uavs.hooks');
const filters = require('./uavs.filters');

module.exports = function () {
	const app = this;
	const Model = createModel(app);
	const paginate = app.get('paginate');

	const options = {
		name: 'uavs',
		Model,
		paginate
	};

	// Initialize our service with any options it requires
	app.use(
		'/uavs'
	, Object.assign(
			createService(options)
		, {
				docs:
				{
					description: 'Gestión de UAVs'
				, definition: Model.jsonSchema()
				}
			}
		)
	);

	// Get our initialized service so that we can register hooks and filters
	const service = app.service('uavs');

	service.hooks(hooks);

	if (service.filter) {
		service.filter(filters);
	}
};
