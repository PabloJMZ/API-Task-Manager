const express = require('express');
const router = express.Router();

const isAuthenticated = require('../../auth/isAuthenticated');
const Task = require('../../database/schemas/Task');
const AssignTask = require('../../database/schemas/AssignTask');

router.get('/all-tasks',
    isAuthenticated,
    async (req, res) => {
        const allTasks = {};
        const { _id } = req.user;
        const tasks = await Task.find({ created_by: _id });
        const assignTasks = await AssignTask.find({ assigned_by: _id });
        if(tasks.length > 0) allTasks.tasks = tasks;
        if(assignTasks.length > 0) allTasks.assignTasks = assignTasks;
        res.json(allTasks);
    });


module.exports = router;