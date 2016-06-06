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
        mongoose.connection.collections['users'].remove(function (err) {
           console.log('Collection users removed ');
        });
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
    it('responds to /users/profile without auth', function testPath(done) {
        request(server)
            .get('/users/profile')
            .expect(302, done);
    });

    it('responds to a signup and redirect to profile', function testPath(done) {
        var user = { email : 'test', password : 'marcus'};
        request(server)
            .post('/users/signup')
            .type('form')
            .send({ email: 'test@omg' })
            .send({ password: 'lol' })
            .expect(302)
            .expect('Location', 'profile')
            .end(done);
    });
});
