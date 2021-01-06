let localOrigin;

// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    localOrigin = 'http://localhost:3000';
}

const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');

// middleware
// instead of body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// for large requests
// app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: localOrigin ? localOrigin : 'https://www.lereportmanager.com',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    })
);

// API routes
// ping to check if logged-in
const ping = require('./routes/api/ping');
app.use('/api/ping', ping);

// register
const register = require('./routes/api/register');
app.use('/register', register);

// login
const login = require('./routes/api/login');
app.use('/login', login);

// logout
const logout = require('./routes/api/logout');
app.use('/logout', logout);

// report row
const reportrow = require('./routes/api/reportrow');
app.use('/api/reportrow', auth, reportrow);

// Files
const files = require('./routes/files/files');
app.use('/files', auth, files);

// skuStatus
const skuStatus = require('./routes/api/skuStatus');
app.use('/skustatus', auth, skuStatus);

// export
module.exports = app;
