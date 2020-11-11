// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();

// instead of body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
// register
const register = require('./routes/api/register');
app.use('/register', register);

// report row
const reportrow = require('./routes/api/reportrow');
app.use('/api/reportrow', reportrow);

// export
module.exports = app;
