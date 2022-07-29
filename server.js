const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/pages');
const path = require('path');
const { default: mongoose } = require('mongoose');
const app = express(); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', route);

// app.listen(8000, () => { 
//     console.log(`Server is running on port 8000`)  
// }) 

mongoose.connect("", {useNewURLParser: true, useUnifiedTopology: true})
.then(() => {
	app.listen(3000, () => {
	    console.log("server is running on 3000")
	})
})
