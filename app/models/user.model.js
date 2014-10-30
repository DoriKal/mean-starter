// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var validators = require('mongoose-validators');
var _ = require('underscore');


/*
 * define the schema for our user model
 */
var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, validate: validators.isLength(2, 50)},
    lastName: {type: String, validate: validators.isLength(2, 50)},
    email: {type: String, validate: validators.isEmail()},
    roles: {type: String, required: true, default: 'public', enum: ['admin', 'public']},

    // propiedades para auditoría
    created: {type: Date},
    updated: {type: Date, default: Date.now}
});

/*
 * Middlewares
 */
userSchema.pre('save', function (next) {

    // solo la primera vez que se guarda actualiza el valor de created
    if (_.isUndefined(this.created)) {
        this.created = Date.now();
    }
    next();
});

/*
 * Static methods
 * cb = callback
 */
userSchema.statics.findByUsername = function (username, cb) {
    this.findOne({username:username}, cb);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);