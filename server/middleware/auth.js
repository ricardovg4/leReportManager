// Dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check for token
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            console.log('authorized');
            next();
        }
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid.' });
    }
};

module.exports = auth;
