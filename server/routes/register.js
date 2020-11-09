const express = require('express');
const router = express.Router();
const checkAuth = require('./helpers/checkAuth');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');

// should include password  matching and a master password for the dev
router.get('/', (req, res) => {
    res.render('register.ejs');
});

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, date: Date.now() });
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                newUser
                    .save()
                    .then((user) => {
                        console.log('user registered');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                console.log('already registered');
            }
        });
        res.redirect('/login');
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
