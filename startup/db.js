
const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

mongoose.set('strictQuery', true);

module.exports = function(){
    const db = config.get('db');
    mongoose.connect(db, {useUnifiedTopology: true})
        .then(() => winston.info(`connection to ${db} succesful`))
}