
const goods = require('../routes/Goods')
const user = require('../routes/users')
const auth = require('../routes/Auth')
require('express-async-errors');
const express = require('express');
const error = require('../middleware/error');

module.exports = function (app){
    app.use(express.json());
    app.use('/api/goods', goods);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use(error);
}