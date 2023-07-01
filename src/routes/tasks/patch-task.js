const express = require("express");
const router = express.Router();

const Task = require("../../database/schemas/Task");

router.patch("/update-task", async (req, res, next) => {
  try {
    const { id: taskId } = req.query;
    const { _id: userId } = req.user;
    const searchTask = await Task.findOne({ _id: taskId });
    if (!searchTask)
      return res.json({ message: `La tarea con id: ${taskId} no existe` });
    if (searchTask.created_by != userId)
      return res.json({ message: `La tarea con id: ${taskId} no existe` });
    const updateTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
    });
    res.status(200).json({
      message: `La tarea con id: ${taskId} se modifico`,
      update: updateTask,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
