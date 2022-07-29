const mongoose = require('mongoose')
var registrationSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    userName: {
        type: String
    },
    userPass: {
        type: String
    }
});

module.exports = mongoose.model('users', registrationSchema)