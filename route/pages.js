const express = require('express'); 
const router = express.Router(); 
const Register = require('./models/register') 
 
 
router.get('/', (req, res) => { 
    res.render('usrregi') 
}) 
 
 
router.get('/usrsign', (req, res) => { 
    res.render('usrsign') 
}) 
 
 
router.get('/prof', (req, res) => { 
    res.render('prof') 
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
    res.render('post') 
}) 
 
 
router.post("/submitRegister", (req, res) => { 
    const register = new Register ({ 
        userEmail: req.body.userEmail, 
        userName: req.body.userName, 
        userPass: req.body.userPass 
    }); 
    Register.collection.insertOne(register) 
    .then(result => { 
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
            res.render('feed')
        }else{
            console.log("No user match found")
            res.render('usrsign', {error:"Incorrect username/password combination"})
        }
    })
}) 
 
 
 
module.exports = router;