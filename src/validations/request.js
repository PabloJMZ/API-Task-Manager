const Joi = require('joi');
const mongoose = require('mongoose');

const id = Joi.string().custom((value, helpers) => {
    if (!mongoose.isValidObjectId(value)) {
      return helpers.message('Invalid Id');
    }
    return value;
});

const signInBody = Joi.object({
    username: Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).required(),
    password: Joi.string().min(3).max(30).required()
});

const signUpBody = Joi.object({
    username: Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required()
});

const addTask = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required()
});

const assignTask = Joi.object({
    username: Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).required(),
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required()
});

const patchTask = Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(100),
    complete: Joi.boolean()
});

const idValid = Joi.object({
    id: id.required()
});

module.exports = {
    signInBody,
    signUpBody,
    addTask,
    assignTask,
    idValid,
    patchTask
}