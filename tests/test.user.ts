/**
 * Created by borja on 23/5/16.
 */

/// <reference path='../typings/main.d.ts' />

process.env.NODE_ENV = 'test';

import mongoose = require('mongoose');

var request = require('supertest');
describe('Users request tests', function () {
    var server;
    before(function () {
        server = require('../bin/www');
    });
    after(function () {
        mongoose.disconnect();
        server.close();
    });
    it('responds to /users/login', function testSlash(done) {
        request(server)
            .get('/users/login')
            .expect(200, done);
    });
    it('responds to /users/signup', function testSlash(done) {
        request(server)
            .get('/users/signup')
            .expect(200, done);
    });
    it('profile page', function testPath(done) {
        request(server)
            .get('/users/profile')
            .expect(302, done);
    });

    it('make a signup', function testPath(done) {
        var user = { email : 'marcus@marcus.com', password : 'marcus'};
        request(server)
            .post('/users/signup')
            .type('form')
            .send({ email: 'tsssj' })
            .send({ password: 'tobi' })
            .expect(200, done);
    });
});
