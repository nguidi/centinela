// flights-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {

	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;

	const uavsSchema = app.service('uavs').Model.schema;
	const batteriesSchema = app.service('batteries').Model.schema;
	const equipmentsSchema = app.service('equipments').Model.schema;

	const organizationSchema
	=	new Schema(
			{
				name: {type: String, required: true}
			,	cuit: {type: Number, required: true}
			}
    );

	const flights
	=	new Schema(
		{
			name: { type: String, required: true }
		,	uav: uavsSchema
		,	batteries: [ batteriesSchema ]
		,	equipments: [ equipmentsSchema]
		,	organization: organizationSchema
		,	createdAt: { type: Date, default: Date.now }
		,	updatedAt: { type: Date, default: Date.now }
		}
	);

	return mongooseClient.model('flights', flights);
};
