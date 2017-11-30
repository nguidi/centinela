// uavs-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {

	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;

	const organizationSchema
	=	new Schema(
			{
				name: {type: String, required: true, minlegth: 3}
			,	cuit: {type: Number, required: true}
			}
    );

	const uavs
	=	new Schema(
		{
			brand: { type: String, required: true, maxlength: 128, minlegth: 3 }
		,	model: { type: String, required: true, maxlength: 128, minlegth: 3 }
		,	size: { type: Number, required: true, max: 9999 }
		,	height: { type: Number, required: true, max: 99999999 }
		,	width: { type: Number, required: true, max: 99999999 }
		,	length: { type: Number, required: true, max: 99999999 }
		,	weight: { type: Number, required: true, max: 99999999 }
		,	organization: organizationSchema
		,	createdAt: { type: Date, default: Date.now }
		,	updatedAt: { type: Date, default: Date.now }
		}
	);

	return mongooseClient.model('uavs', uavs);
};
