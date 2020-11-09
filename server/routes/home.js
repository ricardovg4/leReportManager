const express = require('express');
const router = express.Router();
const checkAuth = require('./helpers/checkAuth');

router.get('/', checkAuth.checkAuthenticated, (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;
