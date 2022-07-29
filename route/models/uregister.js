const mongoose = require('mongoose')
var registrationSchema = new mongoose.Schema({
    userEmal: {
        type: String
    },
    userName: {
        type: String
    },
    userPass: {
        type: String
    }
});

module.exports = mongoose.model('User', registrationSchema)