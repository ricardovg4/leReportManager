// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const User = require('../../models/users.model');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        // retrieve username by ID
        User.findById(id)
            .then((user) => {
                if (user) {
                    return res.status(200).json({ username: user.username });
                }
            })
            .catch((e) => console.log(e));
    } else {
        return res.status(401).json({ error: 'not authenticated' });
    }
});

module.exports = router;
