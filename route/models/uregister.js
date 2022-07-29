const mongoose = require('mongoose')
var registrationSchema = new mongoose.Schema({
    exampleInputEmail1: {
        type: String
    },
    exampleInputUserName: {
        type: String
    },
    exampleInputPassword1: {
        type: String
    }
});

module.exports = mongoose.model('User', registrationSchema)