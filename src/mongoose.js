const mongoose = require('mongoose');

module.exports = function () {
  const app = this;

  let mongodbpath = app.get('mongodb').replace('{{user}}',process.env.MONGODB_USER).replace('{{password}}',process.env.MONGODB_PASSWORD)

console.log(mongodbpath)

  mongoose.connect(mongodbpath, {
    useMongoClient: true
  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
