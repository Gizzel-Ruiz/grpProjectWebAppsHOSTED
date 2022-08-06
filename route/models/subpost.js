const mongoose = require('mongoose') 

var submitpostSchema = new mongoose.Schema({ 
    userName:{ 
        type: String 
    }, 
    category: { 
        type: String 
    }, 
    title: { 
        type: String 
    }, 
    description: { 
        type: String 
    }
}); 

module.exports = mongoose.model('posts', submitpostSchema) 
