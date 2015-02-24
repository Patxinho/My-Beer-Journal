
/**
 * Module dependencies.
 */

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');
    bcrypt = require('bcrypt-nodejs');
    passport = require('passport');
    

// Connection to DB
mongoose.connect('mongodb://91.121.94.32:27017/myBeerJournal', function (err, res) {
    if (err) console.log('Not Connected to Database');
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(passport.initialize()); // Use the passport package in our application

// Import Models and controllers
var models = require('./models/beer')(app, mongoose);
var models = require('./models/user')(app, mongoose, bcrypt)
var beerCtrl = require('./controllers/beers');
var authCtrl = require('./controllers/auth');
var userCtrl = require('./controllers/users');

// Example Route
var router = express.Router();
router.get('/', function (req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var beers = express.Router();
var users = express.Router();

beers.route('/beers')
  .get(beerCtrl.findAllBeers)
  .post(beerCtrl.addBeer);


beers.route('/beers/:id')
  .get(beerCtrl.findById)
  .put(beerCtrl.updateBeer)
  .delete(beerCtrl.deleteBeer);

users.route('/users')
    .get(authCtrl.isAuthenticated,userCtrl.getUsers)
    .post(userCtrl.postUsers);

users.route('/users/:id')
    .get(authCtrl.isAuthenticated, userCtrl.getUserId)

app.use('/api/v1', beers, users);

// Start server
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});