const express = require('express');
const router = express.Router();

router.get('/usrregi', (req, res) => {
    res.render('usrregi')
})

router.get('/usrsign', (req, res) => {
    res.render('usrsign')
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

router.get('/profile', (req, res) => {
    res.render('profile')
})

module.exports = router;