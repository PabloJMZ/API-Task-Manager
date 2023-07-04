const express = require("express");
const router = express.Router();

const User = require("../../database/schemas/User");
const AssignTask = require("../../database/schemas/AssignTask");
const validateSchema = require("../../validations/validate-schemas");
const { assignTask: assignTaskSchema } = require("../../validations/request");

router.post("/assign-task",validateSchema(assignTaskSchema, "body"), async (req, res, next) => {
  try {
    const { username: assignUser } = req.body;
    const { title, description } = req.body;
    const { _id: created_by } = req.user;
    const user = await User.findOne({ username: assignUser });
    if (!user)
      return res
        .status(404)
        .json({ message: `el usuario ${assignUser} no existe` });
    const newAssignTask = new AssignTask({
      title,
      description,
      created_by,
      assigned_by: user._id,
    });
    await newAssignTask.save();
    res.status(200).json(newAssignTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
