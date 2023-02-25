
const express = require('express');
const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi-browser');
const config = require('config');
const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');

    const token = jwt.sign({
        _id: user._id, 
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location  }, config.get('jwtPrivateKey'));

    res.send(token);    
});

const validateUser = (user) => {
    const userSchema = {
        email: Joi.string().trim().email().max(255).required(),
        password: Joi.string().trim().max(255).required()
    };

    return Joi.validate(user, userSchema);
}

module.exports = router;