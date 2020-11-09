const { request } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('../passport/setup');
const checkAuth = require('./helpers/checkAuth');

router.get('/', checkAuth.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

router.post(
    '/',
    checkAuth.checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router;
