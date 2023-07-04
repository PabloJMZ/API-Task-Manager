const express = require('express');
const router = express.Router();

const skipAuthentication = require('../../auth/skipAuthentication');
const passport = require('passport');
const validateSchema = require('../../validations/validate-schemas');
const { signInBody } = require('../../validations/request');


router.post('/sign-in',skipAuthentication, validateSchema(signInBody, "body"),(req, res, next) => {
  passport.authenticate('SignIn',{failureFlash: true}, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: req.flash("messageSignIn")[0] || "error" });
    req.logIn(user, err => {
        if (err) return next(err);
        res.status(200).json({ user });
    });
  })(req, res, next);
});
        
module.exports = router;