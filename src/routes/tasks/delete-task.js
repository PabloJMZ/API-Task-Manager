const express = require("express");
const router = express.Router();

const Task = require("../../database/schemas/Task");
const validateSchema = require("../../validations/validate-schemas");
const { idValid } = require("../../validations/request");

router.delete("/delete-task",validateSchema(idValid, "query"), async (req, res, next) => {
  try {
    const { id: taskId } = req.query;
    const { _id: userId } = req.user;
    const searchTask = await Task.findOne({ _id: taskId });
    if (!searchTask)
      return res
        .status(404)
        .json({ message: `la tarea con id: ${taskId} no existe` });
    if (searchTask.created_by != userId)
      return res
        .status(404)
        .json({ message: `la tarea con id: ${taskId} no existe` });
    const deleteTask = await Task.findOneAndDelete({ _id: taskId });
    res.status(200).json({
      message: `la tarea con id: ${taskId} se elimino`,
      delete: deleteTask,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
