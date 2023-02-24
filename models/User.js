
const mongoose = require('mongoose');
const Joi = require('joi-browser');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 255,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255,
        trim: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true,
        maxLength: 255,
        trim: true
    },

    password: {
        type: String,
        required: true,
        maxLength: 1024,
        trim: true
    }

});

const User = mongoose.model("User", userSchema);   

const validateUser = (user) => {
    const userSchema = {
        username: Joi.string().trim().max(255).required(),
        email: Joi.string().email().trim().max(255).required(),
        phoneNumber: Joi.number().required(),
        location: Joi.string().trim().max(255).required(),
        password: Joi.string().trim().max(255).required()
    }

    return Joi.validate(user, userSchema);
};

module.exports.User = User;
module.exports.validateUser = validateUser;