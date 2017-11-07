const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');

const {
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [
      auth.hooks.authenticate('jwt'),
      queryWithCurrentUser()
    ],
    get: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ],
    create: [
      local.hooks.hashPassword()
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' }),
      local.hooks.hashPassword()
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' }),
      local.hooks.hashPassword()
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
