﻿// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var mongoose = require('mongoose');
var User = mongoose.model('user');

passport.use(new Be(
  function (username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return callback(err); }
        
        // No user found with that username
        if (!user) { return callback(null, false); }
        
        // Make sure the password is correct
        
        user.verifyPassword(password, function (err, isMatch) {
            if (err) { return callback(err); }
            
            // Password did not match
            if (!isMatch) { return callback(null, false); }
            
            // Success
            return callback(null, user);
        });
    });
}
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });