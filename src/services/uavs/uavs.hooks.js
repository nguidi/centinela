

module.exports = {
  before: {
    all: [],
    find: [
      function(hook)
      {
        if (hook.params.user)
          hook.params.query = { 'organization._id': hook.params.user.organization._id};
        return hook;
      }
    ],
    get: [],
    create: [
      function(hook)
      {
        Object.assign(
          hook.data
        , {
            organization: hook.params.user ? hook.params.user.organization : hook.data.organization
          }
        );
        return hook;
      }
    ],
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
                                  'uavs': 1
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
    remove: [
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
                                  'uavs': -1
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
    ]
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
