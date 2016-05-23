/**
 * Created by borja on 27/03/16.
 */
"use strict";
/// <reference path='../typings/main.d.ts' />
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// define the schema for our use model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    }
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map