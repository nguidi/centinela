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
			,	cuil: {type: Number, required: true}
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
			,	password: {type: String, required: true}
			,	organization: organizationSchema
			,	profile: profileSchema
			,	person:
				{
					name: { type: String, required: true}
				,	lastName: { type: String, required: true}
				,	dni: { type: Number, required: true}
				,	birthday: { type: Date, required: true }
				,	contact:
					{
						phone: { type: Number, required: true}
					}
				,	license:
					{
						number: { type: Number, required: true}
					,	creationDate: { type: Date, required: true }
					,	expirationDate: { type: Date, required: true }
					}
				}
			,	createdAt: { type: Date, default: Date.now }
			,	updatedAt: { type: Date, default: Date.now }
				}
			);

	return mongooseClient.model('users', users);
};