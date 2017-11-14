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
	app.use(
		'/recoverPassword'
	,	{
			find(params, cb)
			{
				app.service('users')
					.find(
						{
							query: { email: params.query.email }
						}
					).then(
						function(result)
						{
							console.log(result)
							if (result.total) {
								// do complex stuff here
								const user = result.data[0];
								
								var fromEmail = new MailHelper.Email('no-reply@centinela.azurewebsites.net');
								var toEmail = new MailHelper.Email(user.email);
								var subject = 'Recupere su cuenta';
								var content = new MailHelper.Content('text/plain', 'Para recuperar su contraseña, por favor ingrese al siguiente enlace http://centinela.azurewebsites.net/recoverme/'+user._id);
								var mail = new MailHelper.Mail(fromEmail, subject, toEmail, content);
								
								var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
								var request
								=	sg.emptyRequest(
										{
											method: 'POST'
										,	path: '/v3/mail/send'
										,	body: mail.toJSON()
										}
									);

								sg.API(
									request
								, function (error, response)
									{
										if (error) {
											console.log('Error response received');
										}
										cb(null,'Email sent');
									}
								);
							} else {
								cb(404,'User not found');
							}
						}
					);
			}
	  }
	);

};