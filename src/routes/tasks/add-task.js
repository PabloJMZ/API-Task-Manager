const express = require('express');
const router = express.Router();

const isAuthenticated = require('../../auth/isAuthenticated');
const Task = require('../../database/schemas/Task');

router.post('/add-task',
    isAuthenticated,
    async (req, res)=>{
        const { title, description } = req.body;
        const { _id: created_by } = req.user;
        const newTask = new Task({ title, description, created_by });
        await newTask.save();
        res.sendStatus(200);
});


module.exports = router;