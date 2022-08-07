// const mongo = require('./mongo') 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const route = require('./route/pages'); 
const path = require('path'); 
const app = express();  
const session = require('express-session'); 
// const scrt = require('./scrt') 

app.use(session({secret: process.env.SCRT, resave:false, saveUninitialized:true})) 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/', route); 

mongoose.connect(process.env.MONGODB_URI, {useNewURLParser: true, useUnifiedTopology: true}) 
.then(() => { 
    app.listen(process.env.PORT || 3000, () => { 
        console.log("Server has started running on 3000") 
    }) 
}) 