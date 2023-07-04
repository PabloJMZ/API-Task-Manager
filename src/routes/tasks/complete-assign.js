const express = require("express");
const router = express.Router();

const AssignTask = require("../../database/schemas/AssignTask");
const validateSchema = require("../../validations/validate-schemas");
const { idValid } = require("../../validations/request");

router.patch("/complete-assign",validateSchema(idValid, "query"), async (req, res, next) => {
  try {
    const { id: taskId } = req.query;
    const { _id: userId } = req.user;
    const searchTask = await AssignTask.findOne({ _id: taskId });
    if (!searchTask)
      return res
        .status(404)
        .json({ message: `la tarea con id: ${taskId} no existe` });
    if (searchTask.assigned_by != userId)
      return res
        .status(404)
        .json({ message: `la tarea con id: ${taskId} no existe` });
    const completeTask = await AssignTask.findOneAndUpdate({ _id: taskId }, { complete: true }, { new: true });
    res.status(200).json({
      message: `la tarea con id: ${taskId} se completo`,
      complete: completeTask,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
