const express = require('express');
const router = express.Router();

const auth = require('./auth');
const tasks = require('./tasks');
const isAuthenticated = require('../auth/isAuthenticated');

router.use(auth);
router.use("/tasks", isAuthenticated)
router.use(tasks);

module.exports = router;