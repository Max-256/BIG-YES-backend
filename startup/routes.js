
const Goods = require('../routes/Goods')
const User = require('../routes/users')
const Auth = require('../routes/Auth')
require('express-async-errors');
const express = require('express');
const error = require('../middleware/error');

module.exports = function (app){
    app.use(express.json());
    app.use('/api/goods', Goods);
    app.use('/api/user', User);
    app.use('/api/auth', Auth);
    app.use(error);
}