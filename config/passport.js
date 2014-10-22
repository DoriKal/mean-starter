var passport = require('passport');
var util = require('../app/helpers/util');
var User = require('../app/models/user.model');
var LocalStrategy = require('passport-local').Strategy

module.exports = function (app) {

    // Passport session setup.
    // Serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Deserialize sessions
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    // Use the LocalStrategy within Passport.
    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                // Find the user by username.
                User.findOne({'username': username}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!util.isValidPassword(user.password, password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                })
            });
        }
    ));

    // Use the LocalStrategy within Passport.
    passport.use('signup', new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                    // find a user in Mongo with provided username
                    User.findOne({'username': username}, function (err, user) {
                        // In case of any error return
                        if (err) {
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            return done(null, false, { message: 'Usuario ya existe' });
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();
                            // set the user's local credentials
                            newUser.username = username;
                            newUser.password = util.generateHash(password);
                            newUser.email = req.param('email');
                            newUser.firstName = req.param('firstName');
                            newUser.lastName = req.param('lastName');

                            // save the user
                            newUser.save(function (err) {
                                if (err) {throw err;}
                                return done(null, newUser);
                            });
                        }
                    });
                }
            );
        }
    ));


};