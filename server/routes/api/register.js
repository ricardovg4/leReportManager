const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users.model');

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const reportPermissions = req.body.reportPermissions;

        // check if email || password emtpy
        if (!username || !email || !password) {
            res.status(400).json({ error: 'please enter the required fields.' });
        }

        // hash password and register user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            reportPermissions,
            date: Date.now()
        });
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                newUser
                    .save()
                    .then((user) => {
                        res.status(200).json({ user: user._id });
                    })
                    .catch((err) => {
                        res.status(400).json({ err });
                    });
            } else {
                res.status(400).json({ error: 'user already registered.' });
            }
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
