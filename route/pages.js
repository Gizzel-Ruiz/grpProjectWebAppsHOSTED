const express = require('express');  
const router = express.Router();  
const Register = require('./models/register')  
const SubmitPosts = require('./models/subpost') 

router.get('/', (req, res) => {  
    res.render('usrregi')  
})  

router.get('/usrsign', (req, res) => {  
    res.render('usrsign')  
})  

router.get('/prof', (req, res) => {
    const {  
        userName,  
        userPass  
    } = req.body; 
    SubmitPosts.find({userName: userName}, function(err, post) {
        if(!err) {
            console.log("Post queried for users")
            res.render('prof', {
                postList: post
            })
        }else {
            console.log("On Posts...FAIL!")
        }
    })
})  

router.get('/feed', (req, res) => {  
    res.render('feed')  
})  

router.get('/cat1', (req, res) => {  
    res.render('cat1')  
})   

router.get('/cat2', (req, res) => {  
    res.render('cat2')  
})  

router.get('/post', (req, res) => {  
    if(!req.session.user){ 
        res.render('usrsign') 
        console.log("Post submission attempted and failed...user is not logged in") 
    }else{ 
        res.render('post', {userName : req.session.user})
    } 
}) 

router.get('/errorusrsign', (req, res) => {  
    res.render('errorusrsign')  
})  

router.post("/submitRegister", (req, res) => {  
    const register = new Register ({  
        userEmail: req.body.userEmail,  
        userName: req.body.userName,  
        userPass: req.body.userPass  
    }); 
    Register.collection.insertOne(register)  
    .then(result => {  
        req.session.user = userName 
        res.render('feed')  
    })  
    .catch(err => console.log(err));  
})  

router.post('/submitSignin', (req, res) => {  
    const {  
        userName,  
        userPass  
    } = req.body;  
    Register.findOne({userName : userName, userPass : userPass}, function(err, doc){ 
        if(err) throw err; 
        if(doc) { 
            console.log("User authenticated") 
            req.session.user = userName 
            res.render('feed') 
        }else{ 
            console.log("No user match found") 
            res.render('errorusrsign') 
        } 
    }) 
})  

router.post("/submitPost", (req, res) => {  
    const submitposts = new SubmitPosts ({  
        userName: req.session.user, 
        category: req.body.category,  
        title: req.body.title,  
        description: req.body.description  
    }); 
    SubmitPosts.collection.insertOne(submitposts)  
    .then(result => {  
        res.render('feed')  
    })  
    .catch(err => console.log(err));  
})  

module.exports = router; 