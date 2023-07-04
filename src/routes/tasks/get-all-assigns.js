const express = require("express");
const router = express.Router();

const AssignTask = require("../../database/schemas/AssignTask");

router.get("/all-assigns", async (req, res, next) => {
  try {
    const { _id } = req.user;
    const assignTasks = await AssignTask.find({ created_by: _id });
    res.json(assignTasks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
