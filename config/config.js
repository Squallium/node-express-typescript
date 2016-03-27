/**
 * Created by borja on 26/03/16.
 */
"use strict";
/// <reference path='../typings/main.d.ts' />
var config = {
    db: {
        production: process.env.MONGOLAB_URI,
        development: "mongodb://localhost/expense-tracker-dev",
        test: "mongodb://localhost/expense-tracker-test"
    }
};
module.exports = config;
//# sourceMappingURL=config.js.map