

module.exports = {
  before: {
    all: [],
    find: [
      function(hook)
      {
        hook.params.query = { 'organization._id': hook.params.user.organization._id};
        return hook;
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(hook) {
        return  hook.app.service('dashboard').find({
                  query: {
                    'organization._id':  hook.result.organization._id
                  }
                }).then(function(dashboards){
                  if (dashboards.total) {
                    return hook.app.service('dashboard')
                            .patch(
                              dashboards.data[0]._id
                            , {
                                $inc:
                                {
                                  'flights': 1
                                }
                              }
                            ).then(function(dashboards){
                              // Returning will resolve the promise with the `hook` object
                              return hook;
                            });
                  } else 
                    return hook;
                });
      }
    ],
    update: [],
    patch: [],
    remove: [function(hook) {
      return  hook.app.service('dashboard').find({
                query: {
                  'organization._id':  hook.result.organization._id
                }
              }).then(function(dashboards){
                if (dashboards.total) {
                  return hook.app.service('dashboard')
                          .patch(
                            dashboards.data[0]._id
                          , {
                              $inc:
                              {
                                'flights': -1
                              }
                            }
                          ).then(function(dashboards){
                            // Returning will resolve the promise with the `hook` object
                            return hook;
                          });
                } else 
                  return hook;
              });
    }]
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
