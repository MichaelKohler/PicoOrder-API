'use strict';
var globals = require('../globals');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

exports.userSchema = new Schema({
    id : Number,
    username : { type: String, index: { unique: true, required: true } },
    firstName : String,
    lastName : String,
    password : { type: String, index: { required: true } },
    auth_token : String,
    auth_token_expiry : String
});

exports.model = mongoose.model('users', exports.userSchema);

/**
 * Creates a new user with the supplied user object. This does basic
 * validation of the given user properties.
 *
 * @param aUser - user object
 * @param aSuccessCallback - callback to call if successful
 * @param aFailCallback - callback to call if there was an error
 */
exports.createUser = function(aUser, aSuccessCallback, aFailCallback) {
    var error = {};
    if (aUser.username && aUser.username != '') {
        if (_saveUser(aUser)) {
            aSuccessCallback({ username: 'foo', password: 'bar'});
        } else {
            error.message = 'Could not save user.';
        }
    } else {
        error.message = 'No username supplied.';
    }

    if (error.message) {
        aFailCallback(error);
    }
}

/**
 * Saves the user to the appropriate database table. This does not do any validation
 * before saving, so we could get an error if no proper validation has been done before.
 *
 * @param aUser - user object
 * @return boolean value whether the save action was successfull
 * @private
 */
var _saveUser = function (aUser) {
    var user = new exports.model(aUser);
    user.save(function (error) {
        if (error) {
            return false;
        }
        else {
            return true;
        }
    });
};