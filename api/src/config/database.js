const mongoose = require("mongoose");

const {DATABASE_CONNECTION_STRING} = process.env;

exports.connect = () => {

mongoose.connect(DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;


  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

}