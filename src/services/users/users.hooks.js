const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
var MailHelper = require('sendgrid').mail;

const {
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [
      auth.hooks.authenticate('jwt'),
      queryWithCurrentUser(),
      function(hook)
      {
        if (hook.params.user)
          hook.params.query = { 'organization._id': hook.params.user.organization._id};
        return hook;
      }
    ],
    get: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ],
    create: [
      local.hooks.hashPassword(),
      function(hook)
      {
        if (hook.params.user)
          Object.assign(
            hook.data
          , {
              organization: hook.params.user.organization
            }
          );
        return hook;
      }
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
                                  'users': 1
                                }
                              }
                            ).then(function(dashboards){
                              // Returning will resolve the promise with the `hook` object
                              return hook;
                            });
                  } else {
                    return hook.app.service('dashboard')
                            .create(
                              {
                                organization: hook.result.organization
                              , users: 1
                              , equipments: 0
                              , batteries: 0
                              , uavs: 0
                              , flights: 0
                              }
                            ).then(function(dashboards){
                              // Returning will resolve the promise with the `hook` object
                              return hook;
                            });
                  }
                });
      },
      function(hook)
      {
        if (hook.result.pending) {
          var user = hook.result;
          var fromEmail = new MailHelper.Email('no-reply@centinela.azurewebsites.net');
          var toEmail = new MailHelper.Email(user.email);
          var subject = 'Invitacion a '+user.organization.name;
          var content = new MailHelper.Content('text/plain', 'Hola, fue invitado a formar parte de '+user.organization.name+'. Siga el siguiente enlace para ingresar a Centinela http://centinela.azurewebsites.net/joinorganization?'+user._id);
          var mail = new MailHelper.Mail(fromEmail, subject, toEmail, content);
          
          var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
          var request
          =	sg.emptyRequest(
              {
                method: 'POST'
              ,	path: '/v3/mail/send'
              ,	body: mail.toJSON()
              }
            );
  
          sg.API(
            request
          , function (error, response)
            {
              if (error) {
                console.log('Error response received');
              }
              return hook;
            }
          );
        }
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
                                  'users': -1
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
