
const express = require('express');
const mongoose = require('mongoose');
const Goods = require('./routes/Goods');
const User = require('./routes/users');
const Auth = require('./routes/Auth');
const app = express();

app.use(express.json());

app.use('/api/goods', Goods);
app.use('/api/user', User);
app.use('/api/auth', Auth);



mongoose.connect('mongodb://localhost/bigyes')
        .then(() => console.log('connection to db succesful'))
        .catch((ex) => console.log('connection unsucessful' + ex));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = server;