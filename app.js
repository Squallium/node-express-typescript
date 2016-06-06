/**
 * Created by borja on 22/3/16.
 */
/// <reference path='./typings/main.d.ts' />
// default imports
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// custom imports
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var config = require('./config/config');
// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
// database setup //
// the url correspond to the environment we are in
app.set('dbUrl', config.db[app.settings.env]);
// we're going to use mongoose to interact with the mongodb
//if(!mongoose.connection.db){
mongoose.connect(app.get('dbUrl'));
//}
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
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
exports.App = app;
//# sourceMappingURL=app.js.map