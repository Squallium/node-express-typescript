/**
 * Created by borja on 22/05/16.
 */

/// <reference path='../typings/main.d.ts' />

let mongoose = require('mongoose');

// define the schema for the account

let accountSchema = mongoose.Schema({
    name: String,
    type: String
});
