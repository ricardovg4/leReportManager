// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path');
const passport = require('./passport/setup');
const flash = require('express-flash');
const express = require('express');
const session = require('express-session');
const app = express();

// mongoDB connection
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const mongoDB = process.env.dbUrl ? process.env.dbUrl : "there's no mongoDB URL as a ENV variable";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Serve the files on port 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App listening on port ${process.env.PORT}!\n`);
});

// use ejs
app.set('view-engine', 'ejs');
// set the views folder's path
app.set('views', path.join(__dirname + '/views'));
// instead of body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use('/public', express.static(path.join(__dirname + '/../client/public')));
// app.use('/bulma', express.static(__dirname + '/../node_modules/bulma/css/'));

// session, must be before passport middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            maxAge: 1000 * 30
        }
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// flash  middleware, to be declared after sessions
app.use(flash());

// routes
const home = require('./routes/home');
app.use('/', home);

// login
const login = require('./routes/login');
app.use('/login', login);

// register
const register = require('./routes/register');
app.use('/register', register);

// dashboard
const dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

// logout
const logout = require('./routes/logout');
app.use('/logout', logout);

// api
// report row
const reportrow = require('./routes/api/reportrow');
app.use('/api/reportrow', reportrow);
