const express = require("express");
const router = express.Router();

const AssignTask = require("../../database/schemas/AssignTask");
const validateSchema = require("../../validations/validate-schemas");
const { idValid } = require("../../validations/request");

router.delete("/delete-assign",validateSchema(idValid, "query"), async (req, res, next) => {
  try {
    const { id: taskId } = req.query;
    const { _id: userId } = req.user;
    const searchTask = await AssignTask.findOne({ _id: taskId });
    if (!searchTask)
      return res
        .status(404)
        .json({ message: `la asignacion con id: ${taskId} no existe` });
    if (searchTask.created_by != userId)
      return res
        .status(404)
        .json({ message: `la asignacion con id: ${taskId} no existe` });
    const deleteTask = await AssignTask.findOneAndDelete({ _id: taskId });
    res.status(200).json({
      message: `la asignacion con id: ${taskId} se elimino`,
      delete: deleteTask,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;