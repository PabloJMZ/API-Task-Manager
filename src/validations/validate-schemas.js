function validateSchema(schema, property){
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req[property], { abortEarly: false });
            if (error){
                error.status = 400;
                return next(error);   
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = validateSchema;