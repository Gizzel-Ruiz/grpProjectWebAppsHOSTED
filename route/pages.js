const express = require('express');
const router = express.Router();
const Register = require('./models/uregister')

router.get('/', (req, res) => {
    res.render('usrregi')
})

router.get('/usrsign', (req, res) => {
    res.render('usrsign')
})

router.get('/myposts', (req, res) => {
    res.render('mypost')
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

router.post("/Register", (req, res) => {
    const Register = new Register ({

    })
})

module.exports = router;