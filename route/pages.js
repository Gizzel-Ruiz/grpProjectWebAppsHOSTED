const express = require('express');
const { rawListeners } = require('./models/uregister');
const router = express.Router();
const Register = require('./models/uregister')

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
    const Register = new Register ({
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        userPass: req.body.userPass
    });
    Register.collection.insertOne(register)
    .then(result => {
        res.render('/feed')
    })
    .catch(err => console.log(err));
})

module.exports = router;