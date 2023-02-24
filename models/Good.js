
const mongoose = require('mongoose');
const Joi = require('joi-browser');

const goodSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },

    good: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    price: {
        type: Number,
        required: true,
    },

    description:{
        type: String,
        required: true,
        trim: true
    },

    condition: {
        type: String,
        required: true,
        trim: true
    },

    seller: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    contact: {
        type: Number,
        required: true
    },

    datePosted: {
        type: Date,
        default: Date.now
    }
});

const Good = mongoose.model('Good', goodSchema);

const valiateGood = (good) => {
    const goodSchema = {
        image: Joi.string().trim().required(),
        good: Joi.string().trim().max(50).required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().trim().required(),
        condition: Joi.string().trim().required(),
        seller: Joi.string().trim().required(),
        contact: Joi.number().required(),
    }

    return Joi.validate(good, goodSchema);
}

module.exports.Good = Good;
module.exports.valiateGood = valiateGood;