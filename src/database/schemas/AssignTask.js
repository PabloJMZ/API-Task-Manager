const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    created_by:{
        type: String,
        required: true
    },
    assigned_by: {
        type: String,
        required: true
    }
});

const AssignTask = new mongoose.model('Assign-Task', taskSchema);

module.exports = AssignTask;