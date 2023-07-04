function handlerErrors(err, req, res, next){
    //console.error(err);
    const { status, statusCode, message } = err
    res.status(status || statusCode || 500).json({
        "message": message || "ocurrio un error"
    });
}


module.exports = handlerErrors;