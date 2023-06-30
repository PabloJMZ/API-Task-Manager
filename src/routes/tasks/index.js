const express = require('express');
const router = express.Router();

const getAllTasks = require('./get-all-tasks');
const addTask = require('./add-task');

router.use('/tasks',addTask);
router.use('/tasks',getAllTasks);

module.exports = router;