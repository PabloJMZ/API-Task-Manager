const express = require('express');
const router = express.Router();

const isAuthenticated = require('../../auth/isAuthenticated');

router.get('/log-out', 
    isAuthenticated,
    (req, res, next) => {
        req.logOut(err => {
            if(err) return next(err);
            res.status(200).json({message: "cerraste sesion"});
        })
    }
);

module.exports = router;