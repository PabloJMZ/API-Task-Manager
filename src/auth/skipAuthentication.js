function skipAuthentication (req, res, next){
    if (req.isAuthenticated()){
        return res.status(409).json({
            message: "Esta operación causa conflicto, cierra la sesion actual"
        });
    }
    next();
}

module.exports = skipAuthentication;