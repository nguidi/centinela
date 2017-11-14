// Initializes the `users` service on path `/users`
const mongoose = require('mongoose');
const createService = require('feathers-mongoose');
const swagger = require('feathers-swagger');
require('mongoose-schema-jsonschema')(mongoose);
var MailHelper = require('sendgrid').mail;

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

	//	Custom methods
	app.use('/recoverPassword', {
		find(params, cb) {
		  // do complex stuff here
			console.log(params.query.email)
			
		  var fromEmail = new MailHelper.Email('recover@centinela.azurewebsites.net');
			var toEmail = new MailHelper.Email('neri3004@gmail.com.com');
			var subject = 'Sending with SendGrid is Fun';
			var content = new MailHelper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
			var mail = new MailHelper.Mail(fromEmail, subject, toEmail, content);
			 
			var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
			var request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: mail.toJSON()
			});
			 
			sg.API(request, function (error, response) {
				if (error) {
					console.log('Error response received');
				}
				console.log(response.statusCode);
				console.log(response.body);
				console.log(response.headers);
				cb();
			});
		}
	  }
	);

};