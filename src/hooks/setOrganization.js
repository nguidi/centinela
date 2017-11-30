module.exports = function () {

  return function (hook) {

    if (hook.params.user) {
        hook.params.query['organization._id'] = hook.params.user.organization._id
      }

  };

};
