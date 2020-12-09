// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const jwtCookieName = 'jwt';
    if (req.cookies[jwtCookieName]) {
        // Delete cookie
        res.cookie(jwtCookieName, '', { maxAge: 0.1 });
        res.status(200).json({ msg: 'logged out succesfully' });
    } else {
        res.status(400).json({ msg: "you weren't logged in" });
    }
});

module.exports = router;
