/**
 * Created by borja on 24/03/16.
 */
"use strict";
/// <reference path='../typings/main.d.ts' />
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* GET & POST for signup */
router.get('/signup', function (req, res, next) {
    res.render('users/register', {
        title: 'Register'
    });
    next();
}, function (req, res, next) {
    console.log('Middleware next called on signup get');
});
/* GET for login */
router.get('/login', function (req, res, next) {
    res.render('users/login', {
        title: 'Login'
    });
});
module.exports = router;
//# sourceMappingURL=users.js.map