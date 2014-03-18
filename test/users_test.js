var should = require('should');
var users = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/picoorder_api_test');

describe('Users', function() {
    var currentUser = null;

    beforeEach(function(done) {
        // add some test data
        var testUser = { username: 'test@test.com', password: 'bar' }
        users.createUser(testUser, function(user) {
            currentUser = user;
            done();
        }, function (error) {
            currentUser = null;
            console.log('Test failed: ' + error.message);
            done();
        });
    });

    afterEach(function(done) {
        users.model.remove({}, function() {
            done();
        });
    });

    describe('create user', function() {
        it('should create a user foo with a password', function(done) {
            var testUser = { username: 'foo', password: 'bar' };
            users.createUser(testUser, function(user) {
                user.should.not.equal(null);
                user.username.should.equal('foo');
                user.password.should.not.equal(null);
                done();
            }, function (error) {
                error.should.not.equal(null);
                done();
            });
        });

        it('should not create a user when no username is supplied', function(done) {
            var testUser = { password: 'bar' };
            users.createUser(testUser, function(user) {
                done();
            }, function (error) {
                error.should.not.equal(null);
                error.message.should.equal('No username supplied.');
                done(null);
            });
        });

        it('should not create a user when empty username is supplied', function(done) {
            var testUser = { username: '', password: 'bar' };
            users.createUser(testUser, function(user) {
                done();
            }, function (error) {
                error.should.not.equal(null);
                error.message.should.equal('No username supplied.');
                done(null);
            });
        });
    });
});