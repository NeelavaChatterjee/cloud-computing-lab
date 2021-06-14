const path = require("path");
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const viewsPath = path.join(__dirname, "templates/views");

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set("views", viewsPath);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.get('/', (req, res) => {
    res.render('auth', {});
});

app.get('/success', (req, res) => {
    res.render('success', { user: userProfile });
});

app.get('/error', (req, res) => res.send("error logging in"));



let passport = require('passport');
let userProfile;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/*  Google AUTH  */

let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://neelava-google-auth.herokuapp.com/auth/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    (req, res) => {
        res.redirect('/success');
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(port, () => console.log('Server is up on port ' + port));