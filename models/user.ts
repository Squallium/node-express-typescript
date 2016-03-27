/**
 * Created by borja on 27/03/16.
 */

/// <reference path='../typings/main.d.ts' />

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

// define the schema for our use model

let userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
export = mongoose.model('User', userSchema);
