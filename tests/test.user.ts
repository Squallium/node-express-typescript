/**
 * Created by borja on 23/5/16.
 */

/// <reference path='../typings/main.d.ts' />

process.env.NODE_ENV = 'test';

import mongoose = require('mongoose');

var request = require('supertest');
describe('loading express', function () {
    var server;
    before(function () {
        server = require('../bin/www');
    });
    after(function () {
        mongoose.disconnect();
        server.close();
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});

//var chaiAssertions = require('chai');
//var chaiHttp = require('chai-http');
//var mongoose = require("mongoose");
//
//var server = require('../app').App;
//
//
//var should = chaiAssertions.should();
//chaiAssertions.use(chaiHttp);
//
//describe('Blobs', function() {
//    it('sdf', function(done) {
//        chaiAssertions.request(server)
//            .get('/')
//            .end(function (err, res) {
//                res.should.have.status(200);
//                done();
//            });
//    });
//});