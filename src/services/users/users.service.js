// Initializes the `users` service on path `/users`
const mongoose = require('mongoose');
const createService = require('feathers-mongoose');
const swagger = require('feathers-swagger');
require('mongoose-schema-jsonschema')(mongoose);
const sendGridMail = require('@sendgrid/mail');;

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

	//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 Copied!

	// Get our initialized service so that we can register hooks and filters
	const service = app.service('users');

	service.hooks(hooks);

	if (service.filter) {
		service.filter(filters);
	}

	sendGridMail.setApiKey('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');

	//	Custom methods
	app.use('/recoverPassword', {
		find(params, cb) {
		  // do complex stuff here
		  console.log(params.query.email)
		  const msg = {
			to: params.query.email,
			from: 'test@example.com',
			subject: 'Sending with SendGrid is Fun',
			text: 'and easy to do anywhere, even with Node.js',
			html: '<strong>and easy to do anywhere, even with Node.js</strong>',
		  };
		  sendGridMail.send(msg)
		  cb()
		}
	  }
	);

};