// batteries-model.js - A mongoose model
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

	const batteries
	=	new Schema(
			{
				brand: { type: String, required: true, maxlength: 128, minlegth: 3}
			,	model: { type: String, required: true, maxlength: 128, minlegth: 3}
			,	configuration: { type: String, required: true, validate: {
          validator: function(v) {
            return /^(c1|c2|c3|c4|c6)$/igm.test(v);
          },
          message: '{VALUE} is not a valid battery configuration!'
        }}
			,	capacity: { type: Number, required: true, max: 99999999 }
			,	height: { type: Number, required: true, max: 99999999 }
			,	width: { type: Number, required: true, max: 99999999 }
			,	length: { type: Number, required: true, max: 99999999 }
			,	weight: { type: Number, required: true, max: 99999999 }
			,	discharge: { type: Number, required: true, max: 99999999 }
			,	dischargePeak: { type: Number, required: true, max: 99999999 }
			,	organization: organizationSchema
			,	createdAt: { type: Date, default: Date.now }
			,	updatedAt: { type: Date, default: Date.now }
			}
		);

	return mongooseClient.model('batteries', batteries);
};
