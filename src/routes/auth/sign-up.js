const express = require('express');
const router = express.Router();

const skipAuthentication = require('../../auth/skipAuthentication');
const passport = require('passport');

router.post('/sign-up', skipAuthentication,(req, res, next) => {
  passport.authenticate('SignUp',{failureFlash: true}, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: req.flash("messageSignUp")[0] || "error" });
    req.logIn(user, err => {
        if (err) return next(err);
        res.status(200).json({ user });
    });
  })(req, res, next);
});
        
module.exports = router;