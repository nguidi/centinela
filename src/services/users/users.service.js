// Initializes the `users` service on path `/users`
const mongoose = require('mongoose');
const createService = require('feathers-mongoose');
const swagger = require('feathers-swagger');
require('mongoose-schema-jsonschema')(mongoose);

const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const filters = require('./users.filters');

module.exports = function () {
	const app = this;
	const Model = createModel(app);
	const paginate = app.get('paginate');

	const options = {
		name: 'users',
		Model,
		paginate
	};

	// Initialize our service with any options it requires
	app.use(
		'/users'
	, Object.assign(
			createService(options)
		, {
				docs:
				{
					description: 'Gestión de Usuarios'
				,	definition: Model.jsonSchema()
				,	definitions:
					{
						'Paginate':
						{
							attributes:
							{
								total: {type: Number},
								limit: {type: Number},
								skip: {type: Number},
								data: {type: Array}
							}
						}
					}
				,	find:
					{
				        parameters: [{
				          description: 'Get examples by name',
				          in : 'query',
				          required: false,
				          name: 'email',
				          type: 'string'
				        }],
				        responses: {
				          '200': {
				            description: 'successful operation',
				            schema: {
								'$ref': '#/definitions/Paginate'
							}
				          }
				        }
				    }
				}
			}
		)
	);

	// Get our initialized service so that we can register hooks and filters
	const service = app.service('users');

	service.hooks(hooks);

	if (service.filter) {
		service.filter(filters);
	}
};