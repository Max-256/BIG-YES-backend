
const winston = require('winston');
require('winston-mongodb');
const config = require('config');

module.exports = function(){
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: "uncaughtExceptions.log"})
    );

    process.on('unhandledRejection', function(ex){
        winston.error(ex.message, ex);
        process.exit(1)
    });

    winston.add(winston.transports.File, {filename: 'logfile.log'});

    winston.add(winston.transports.MongoDB, 
                        {db: config.get('db'), 
                        options: {useUnifiedTopology: true}, level: "error"});
}