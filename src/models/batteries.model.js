// batteries-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;

	const batteries
	=	new Schema(
			{
				brand: { type: String, required: true }
			,	model: { type: String, required: true }
			,	configuration: { type: String, required: true }
			,	capacity: { type: Number, required: true }
			,	height: { type: Number, required: true }
			,	width: { type: Number, required: true }
			,	length: { type: Number, required: true }
			,	weight: { type: Number, required: true }
			,	discharge: { type: Number, required: true }
			,	dischargePeak: { type: Number, required: true }
			,	createdAt: { type: Date, default: Date.now }
			,	updatedAt: { type: Date, default: Date.now }
			}
		);

	return mongooseClient.model('batteries', batteries);
};
