// Dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;

    // Check for token
    if (!token) {
        return res.status(401).json({ error: 'No token, authentication failed' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const user = await User.findById(decoded.id);
            if (user) {
                console.log('authenticated');
                // Set user variable for next middleware
                const { username, role, reportPermissions } = user;
                const userObject = { username, role, reportPermissions };
                res.locals.user = userObject;
                next();
            } else if (!user) {
                res.status(400).json({ msg: "username doesn't exist" });
            }
        }
        if (!decoded) {
            res.status(400).json({ msg: 'Token is not valid.' });
        }
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid.' });
    }
};

module.exports = auth;
