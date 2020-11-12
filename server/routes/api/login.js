// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users.model');
const jwt = require('jsonwebtoken');

// max age, duration, of the cookie/jwt
const maxAge = 60;
// create jwt
const createJwtToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
    return token;
};

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Enter all required fields.' });
    }

    User.findOne({ email }).then(async (user) => {
        const jwtCookieName = 'jwt';
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createJwtToken(user._id);
                console.log(`${user.email} logged in`);
                res.cookie(jwtCookieName, token, { httpOnly: true, sameSite: 'strict', maxAge: maxAge * 1000 });
                return res.status(200).json({ email: user.email });
            } else {
                if (req.cookies[jwtCookieName]) {
                    // delete jwt cookie if present when not auth
                    res.cookie(jwtCookieName, '', { maxAge: 0.1 });
                }
                return res.status(400).json({ error: 'Incorrect password.' });
            }
        } else {
            return res.status(400).json({ error: "user doesn't exist" });
        }
    });
});

module.exports = router;
