// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var validators = require('mongoose-validators');
var _ = require('underscore');


/*
 * define the schema for our user model
 */
var UserSchema = mongoose.Schema({
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
UserSchema.pre('save', function (next) {

    // solo la primera vez que se guarda actualiza el valor de created
    if (_.isUndefined(this.created)) {
        this.created = Date.now();
    }
    next();
});


/**
 * Methods
 */
UserSchema.methods = {

    /**
     * HasRole - check if the user has required role
     *
     * @param {String} role
     * @return {Boolean}
     * @api public
     */
    hasRole: function (role) {
        var roles = this.roles;
        return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
    },

    /**
     * IsAdmin - check if the user is an administrator
     *
     * @return {Boolean}
     * @api public
     */
    isAdmin: function () {
        return this.roles.indexOf('admin') !== -1;
    }

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    //authenticate: function(plainText) {
    //    return this.hashPassword(plainText) === this.hashed_password;
    //},

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    //makeSalt: function() {
    //    return crypto.randomBytes(16).toString('base64');
    //},

    /**
     * Hash password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    //hashPassword: function(password) {
    //    if (!password || !this.salt) return '';
    //    var salt = new Buffer(this.salt, 'base64');
    //    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    //}
};

/**
 * Static methods
 * cb = callback
 */
UserSchema.statics = {

    /**
     *
     * @param username
     * @param cb
     */
    findByUsername: function (username, cb) {
        this.findOne({username: username}, cb);
    }
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);