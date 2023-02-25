
const express = require('express');
const mongoose = require('mongoose');
const Goods = require('./routes/Goods');
const User = require('./routes/users');
const Auth = require('./routes/Auth');
const error = require('./middleware/error');
require('express-async-errors');
const config = require('config');
const winston = require('winston');
require('winston-mongodb');
const app = express();

if(!config.get('jwtPrivateKey'))
  throw new Error("FATAL ERROR: jwtPrivateKey is not defined");

winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: "uncaughtExceptions.log"})
);

process.on('unhandledRejection', function(ex){
        winston.error(ex.message, ex);
        process.exit(1)
});

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: config.get('db'), options: {useUnifiedTopology: true}, level: "error"});

app.use(express.json());
app.use('/api/goods', Goods);
app.use('/api/user', User);
app.use('/api/auth', Auth);
app.use(error);

mongoose.set('strictQuery', true);

const db = config.get('db');

mongoose.connect(db, {useUnifiedTopology: true})
        .then(() => winston.info(`connection to ${db} succesful`))

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`listening on port ${port}`));

module.exports = server;