//File: controllers/beers.js
var mongoose = require('mongoose');
var Beer = mongoose.model('beer');

//GET - Return all beers in the DB
exports.findAllBeers = function (req, res) {
    Beer.find(function (err, beers) {
        if (err) res.send(500, err.message);
      
            console.log('GET /beer')
            res.status(200).jsonp(beers);
    });
};

//GET - Return a beer with specified ID
exports.findById = function (req, res) {
    Beer.findById(req.params.id, function (err, beers) {
        if (err) return res.send(500, err.message);
        
        console.log('GET /beers/' + req.params.id);
        res.status(200).jsonp(beers);
    });
};


//POST - Insert a new beer in the DB
exports.addBeer = function (req, res) {
    console.log('POST /beer');
    console.log(req.body);
    var beer = new Beer({
        name: req.body.name,
        id: req.body.id,
        description: req.body.description,
        abv: req.body.abv,
        labels: {
            icon: req.body.labels.icon,
            medium: req.body.labels.medium,
            large: req.body.labels.large
        }
    });
    
    beer.save(function (err, beer) {
        if (err) return res.send(500, err.message);
        res.status(201).jsonp(beer);
    });
};

//PUT - Update a register already exists
exports.updateBeer = function (req, res) {
    Beer.findById(req.params.id, function (err, beer) {
        beer.name = req.body.name;
        beer.description = req.body.description;
        beer.abv = req.body.abv;
        beer.labels = {
            icon : req.body.labels.icon,
            medium : req.body.labels.medium,
            large : req.body.labels.large
        };
        
        beer.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).json(beer);
        });
    });
};

//DELETE - Delete a beer with specified ID
exports.deleteBeer = function (req, res) {
    Beer.findById(req.params.id, function (err, beer) {
        beer.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200);
        })
    });
};