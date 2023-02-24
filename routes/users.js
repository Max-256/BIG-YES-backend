
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, validateUser} = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('email already in use');

    user = await User.findOne({phoneNumber: req.body.phoneNumber});
    if(user) return res.status(400).send('phone number already in use');

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({
        _id: user._id, 
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location  }, "jwtPrivateKey");

    res.send(token);
});


module.exports = router;