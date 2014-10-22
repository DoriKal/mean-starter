module.exports = function (router, passport) {

    router.route('/auth/signup')
        .post(passport.authenticate('signup', {successRedirect: '/dashboard', failureRedirect: '/register', failureFlash: true}));


    router.route('/auth/login')
        .post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

};
