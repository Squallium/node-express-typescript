/**
 * Created by borja on 23/5/16.
 */

/// <reference path='../typings/main.d.ts' />

import mongoose = require('mongoose');
import config = require('../config/config')

let db;

describe('User', function () {

    before(function (done) {
        db = mongoose.connect(config.db['test']);
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });
});