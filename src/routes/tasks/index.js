const express = require("express");
const router = express.Router();

const getAllTasks = require("./get-all-tasks");
const addTask = require("./add-task");
const deleteTask = require("./delete-task");
const updateTask = require("./patch-task");
const assignTask = require("./assign-task");
const completeAssign = require("./complete-assign");
const deleteAssign = require("./deleteAssign");
const getAllAsigns = require("./get-all-assigns");

router.use("/tasks", addTask);
router.use("/tasks", getAllTasks);
router.use("/tasks", deleteTask);
router.use("/tasks", updateTask);
router.use("/tasks", assignTask);
router.use("/tasks", completeAssign);
router.use("/tasks", deleteAssign);
router.use("/tasks", getAllAsigns);


module.exports = router;
