

const validation = (schema) => {
    return(req, res, next) => {
        const {error} = schema.validate(req.body);
        console.log(error.details[0].type);
        if(error && error.details[0].type === 'string.base'){
            error.status = 400;
            error.message= `missing required ${error.details[0].context.key} field`;
            next(error);
        } else if (error) {
            error.status = 400;
            next(error);
        } else  {
            next()
        }
    }
}

module.exports = validation;