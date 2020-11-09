const express = require('express');
const router = express.Router();
const checkAuth = require('./helpers/checkAuth');

router.get('/', checkAuth.checkAuthenticated, (req, res) => {
    res.render('dashboard.ejs');
});

module.exports = router;
