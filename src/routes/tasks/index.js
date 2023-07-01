const express = require("express");
const router = express.Router();

const getAllTasks = require("./get-all-tasks");
const addTask = require("./add-task");
const deleteTask = require("./delete-task");
const updateTask = require("./patch-task");

router.use("/tasks", addTask);
router.use("/tasks", getAllTasks);
router.use("/tasks", deleteTask);
router.use("/tasks", updateTask);

module.exports = router;
