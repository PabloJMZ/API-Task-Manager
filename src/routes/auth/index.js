const express = require('express');
const router = express.Router();

const sign_in = require('./sign-in');
const sign_up = require('./sign-up');
const log_out = require('./log-out');

router.use('/auth',sign_in);
router.use('/auth',sign_up);
router.use('/auth', log_out)

module.exports = router;