const express = require('express');
const router = express.Router();

const auth = require('./auth');
const tasks = require('./tasks');

router.use(auth);
router.use(tasks);

module.exports = router;