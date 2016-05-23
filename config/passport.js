/**
 * Created by borja on 27/03/16.
 */
"use strict";
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
function setupStrategies(passport) {
    // ====================== //
    // passport session setup //
    // ====================== //
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    // ============ //
    // LOCAL SIGNUP //
    // ============ //
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        // async
        process.nextTick(function () {
            if (!req.user) {
                // first we try to find the user to see if already exists
                User.findOne({ 'local.email': email }, function (err, user) {
                    // if error, return error
                    if (err) {
                        return done(err);
                    }
                    // check if the email already exists
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    }
                    else {
                        // if there si no user, create a new one
                        var newUser = new User();
                        // set the credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        // saving the user
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            }
            else {
                // If the user is already logged in, we add the credential into profile
                var user = req.user;
                // set the credentials
                user.local.email = email;
                user.local.password = user.generateHash(password);
                // saving the user
                user.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, user);
                });
            }
        });
    }));
    // =========== //
    // LOCAL LOGIN //
    // =========== //
    // We create another strategy for the login process
    passport.use('local-login', new LocalStrategy({
        // change default username for email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        // first check if the user already exists
        User.findOne({ 'local.email': email }, function (err, user) {
            // If there are any error, return the error
            if (err) {
                return done(err);
            }
            // if no user is found, return message
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            // if the user exists, we check the password
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Opps! Wrong password.'));
            }
            // if everything is ok, return the user
            return done(null, user);
        });
    }));
}
exports.setupStrategies = setupStrategies;
;
//# sourceMappingURL=passport.js.map