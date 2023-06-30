function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.status(401).json({
        message: "inicie sesion para poder acceder" 
    });
}

module.exports = isAuthenticated;