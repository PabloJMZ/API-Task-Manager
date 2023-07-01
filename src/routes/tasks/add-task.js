const express = require("express");
const router = express.Router();

const Task = require("../../database/schemas/Task");

router.post("/add-task", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id: created_by } = req.user;
    const newTask = new Task({ title, description, created_by });
    await newTask.save();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
