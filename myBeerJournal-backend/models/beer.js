exports = module.exports = function (app, mongoose) {
    
    var beerSchema = new mongoose.Schema({
        name: { type: String },
        id: { type: String, requires: true, unique: true},
        description: { type: String },
        abv: { type: String },
        labels: {            
            icon: { type: String },
            medium: { type: String },
            large : { type: String }
        },
        created_at: { type: Date, required: true, default: Date.now }
    });

    mongoose.model('beer', beerSchema);
};