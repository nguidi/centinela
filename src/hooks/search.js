module.exports = function (opt) {
    
      return function (hook) {
    
        hook.params.query.$or = [];

        opt.fields.forEach(fieldName => {

            let fieldNameQuery = {};
            
            fieldNameQuery[fieldName] = {
                $regex: new RegExp(hook.params.query.search)
            }

            hook.params.query.$or.push(fieldNameQuery);
        });

        delete hook.params.query.search
    
      };
    
    };
    