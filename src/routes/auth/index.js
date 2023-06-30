const express = require('express');
const router = express.Router();

const sign_in = require('./sign-in');
const sign_up = require('./sign-up');

router.use('/auth',sign_in);
router.use('/auth',sign_up);

module.exports = router;