// users-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;
	
	const organizationSchema
	=	new Schema(
			{
				name: {type: String, required: true}
			,	cuit: {type: Number, required: true}
			}
		);

	const profileSchema
	=	new Schema(
			{
				name: { type: String, required: true}
			,	description: { type: String, required: true}
			,	type: {type: Number, required: true}
			}
		);

	const users
	=	new Schema(
			{
				email: { type: String, required: true }
			,	password: {type: String}
			,	pending: {type: Boolean}
			,	organization: organizationSchema
			,	profile: profileSchema
			,	person:
				{
					name: { type: String}
				,	lastName: { type: String}
				,	dni: { type: Number, required: true}
				,	birthday: { type: Date}
				,	license:
					{
						number: { type: Number}
					,	creationDate: { type: Date }
					,	expirationDate: { type: Date }
					}
				}
			,	createdAt: { type: Date, default: Date.now }
			,	updatedAt: { type: Date, default: Date.now }
			}
		);

	return mongooseClient.model('users', users);
};