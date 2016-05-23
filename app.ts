/**
 * Created by borja on 22/3/16.
 */

/// <reference path='./typings/main.d.ts' />

// default imports
import express = require('express');
import path = require('path');
import logger = require('morgan');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import favicon = require('serve-favicon');

// custom imports
import passport = require('passport');
import session = require('express-session');
import flash = require('connect-flash');
import mongoose = require('mongoose');
import config = require('./config/config');

// routes
import routes = require('./routes/index');
import users = require('./routes/users');

let app = express();

// database setup //
// the url correspond to the environment we are in
app.set('dbUrl', config.db[app.settings.env]);
// we're going to use mongoose to interact with the mongodb
mongoose.connect(app.get('dbUrl'));

// passport strategies setup
require('./config/passport').setupStrategies(passport);

// passport setup
app.use(session({
    secret: 'ytunolossabes',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// public directories setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/admin-lte', express.static(__dirname + '/node_modules/admin-lte/dist'));

// routes setup
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export let App = app;