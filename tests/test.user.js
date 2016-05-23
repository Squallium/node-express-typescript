/**
 * Created by borja on 23/5/16.
 */
/// <reference path='../typings/main.d.ts' />
process.env.NODE_ENV = 'test';
var chaiAssertions = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../app').App;
var should = chaiAssertions.should();
chaiAssertions.use(chaiHttp);
describe('Blobs', function () {
    it('sdf', function (done) {
        chaiAssertions.request(server)
            .get('/')
            .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=test.user.js.map