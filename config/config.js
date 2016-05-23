/**
 * Created by borja on 26/03/16.
 */
/// <reference path='../typings/main.d.ts' />
var config = {
    db: {
        production: process.env.MONGOLAB_URI,
        development: "mongodb://localhost/node-express-typescript-dev",
        test: "mongodb://localhost/node-express-typescript-test",
    }
};
module.exports = config;
