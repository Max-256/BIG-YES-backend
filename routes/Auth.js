
const express = require('express');
const {User, validateUser} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        location: user.location  }, "jwtPrivateKey");

    res.send(token);    
});



module.exports = router;