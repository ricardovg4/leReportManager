const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users.model');

const authenticateUser = (email, password, done) => {
    User.findOne({ email: email }).then(async (user) => {
        if (!user) {
            return done(null, false, { message: 'No user registered with that email.' });
        }
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    });
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

// local strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        authenticateUser
    )
);

module.exports = passport;
