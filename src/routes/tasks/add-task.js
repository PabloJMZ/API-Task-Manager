const express = require("express");
const router = express.Router();

const Task = require("../../database/schemas/Task");
const validateSchema = require("../../validations/validate-schemas");
const { addTask } = require("../../validations/request");

router.post("/add-task",validateSchema(addTask, "body"), async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id: created_by } = req.user;
    const newTask = new Task({ title, description, created_by });
    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
