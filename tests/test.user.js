/**
 * Created by borja on 23/5/16.
 */
"use strict";
/// <reference path='../typings/main.d.ts' />
var mongoose = require('mongoose');
var config = require('../config/config');
var db;
describe('User', function () {
    before(function (done) {
        db = mongoose.connect(config.db['test']);
    });
    after(function (done) {
    });
});
//# sourceMappingURL=test.user.js.map