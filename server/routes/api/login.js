let secure = true;
// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    secure = false;
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users.model');
const jwt = require('jsonwebtoken');

// max age, duration, of the cookie/jwt in seconds
const maxAge = 60 * 60 * 10;
// create jwt
const createJwtToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
    return token;
};

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
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
                res.cookie(jwtCookieName, token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    // secure: true,
                    maxAge: maxAge * 1000
                });
                return res.status(200).json({
                    email: user.email,
                    username: user.username,
                    ...(user.reportPermissions.length > 0
                        ? { reportPermissions: user.reportPermissions }
                        : null),
                    role: user.role
                });
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
