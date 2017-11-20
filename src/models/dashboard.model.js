// dashboard-model.js - A mongoose model
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
    
  const dashboard
  = new Schema(
      {
        organization: organizationSchema
      , users:  {type: Number}
      , equipments:  {type: Number}
      , batteries:  {type: Number}
      , flights:  {type: Number}
      , uavs:  {type: Number}
      , createdAt: { type: Date, default: Date.now }
      , updatedAt: { type: Date, default: Date.now }
      }
    );

  return mongooseClient.model('dashboard', dashboard);
};
