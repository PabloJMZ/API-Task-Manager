function routeNotFound(req, res){
    res.status(404).send('esta ruta no existe');
}

module.exports = routeNotFound;