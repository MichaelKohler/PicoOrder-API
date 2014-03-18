(function () {
    'use strict';

    exports.async = require('async');
    exports.bcrypt = require('bcrypt');
    exports.mongoose  = require('mongoose');
    exports.restify = require('restify');
    exports.q = require('q');

    exports.users = require('./models/users');

    return exports;
}());