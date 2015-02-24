// Load required packages
var mongoose = require('mongoose');
var User = mongoose.model('user');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
    console.log('POST /user');
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    
    user.save(function (err) {
        if (err)
            res.send(err);
        
        res.jsonp({ message: 'New beer drinker added to the locker room!' });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) res.send(500, err.message);
        
        console.log('GET /user')
        res.status(200).jsonp(users);
    });
};

exports.getUserId = function (req, res){
    User.findOne({ username: String(req.params.id)}, function (err, users) {
        if (err) return res.send(500, err.message);
        
        console.log('GET /users/' + req.params.id);
        res.status(200).jsonp(users);
    });
};
