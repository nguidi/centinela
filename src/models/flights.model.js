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
				name: {type: String, required: true, minlegth: 3}
			,	cuit: {type: Number, required: true}
			}
	);
	
	const pointsSchema
	=	new Schema(
			{
				name: {type: String, required: true, minlegth: 3}
			,	description: {type: String, maxlength: 128}
			,	lat: {type: Number, required: true}
			,	lng: {type: Number, required: true}
			}
    );

	const flights
	=	new Schema(
		{
			name: { type: String, required: true, maxlength: 128, minlegth: 3 }
		,	flightDate: { type: Date, required: true }
		,	uav: uavsSchema
		,	batteries: [ batteriesSchema ]
		,	equipments: [ equipmentsSchema]
		,	organization: organizationSchema
		,	startPoint: pointsSchema
		,	checkPoints: [ pointsSchema ]
		,	createdAt: { type: Date, default: Date.now }
		,	updatedAt: { type: Date, default: Date.now }
		}
	);

	return mongooseClient.model('flights', flights);
};
