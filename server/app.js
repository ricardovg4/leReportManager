// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// instead of body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    })
);

// API routes
// register
const register = require('./routes/api/register');
app.use('/register', register);

//login
const login = require('./routes/api/login');
app.use('/login', login);

// report row
const reportrow = require('./routes/api/reportrow');
app.use('/api/reportrow', reportrow);

// export
module.exports = app;
