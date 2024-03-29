﻿
exports = module.exports = function (app, mongoose, bcrypt) {
    // Define our user schema
    var UserSchema = new mongoose.Schema( {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String, 
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        beersInfo: [ {
                beer : { type: Schema.Types.ObjectId, ref: 'beer' },
                rating: { type: Number },
                coment: {type: String}
            }
        ],
        created_at: { type: Date, required: true, default: Date.now }
    });
    
    // Execute before each user.save() call
    UserSchema.pre('save', function (callback) {
        var user = this;
        
        // Break out if the password hasn't changed
        if (!user.isModified('password')) return callback();
        
        // Password changed so we need to hash it
        bcrypt.genSalt(5, function (err, salt) {
            if (err) return callback(err);
            
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return callback(err);
                user.password = hash;
                callback();
            });
        });
    });
    
    UserSchema.methods.verifyPassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };
    
    mongoose.model('user', UserSchema);

};
