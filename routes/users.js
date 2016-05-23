/**
 * Created by borja on 24/03/16.
 */
"use strict";
/// <reference path='../typings/main.d.ts' />
var express = require('express');
var passport = require('passport');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* GET & POST for SIGNUP */
router.get('/signup', function (req, res, next) {
    res.render('users/register', {
        title: 'Register',
        message: req.flash('signUpMessage')
    });
    next();
}, function (req, res, next) {
    console.log('Middleware next called on signup get');
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'profile',
    failureRedirect: 'signup',
    failureFlash: true
}));
/* GET & POST for LOGIN */
router.get('/login', function (req, res, next) {
    res.render('users/login', {
        title: 'Login',
        message: req.flash('loginMessage')
    });
});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: 'profile',
    failureRedirect: 'login',
    failureFlash: true
}));
/* PROFILE SECTION */
router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('users/profile', {
        contentHeader: {
            title: 'User Profile',
            subtitle: 'Detail information'
        },
        user: req.user // get the user from session and pass to template
    });
});
/* LOGOUT */
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticate in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // in any other case, redirect to the home
    res.redirect('/');
}
module.exports = router;
//# sourceMappingURL=users.js.map