var bCrypt = require('bcrypt-nodejs');

exports.isValidPassword = function (storedPassword, password) {
    return bCrypt.compareSync(password, storedPassword);
};

exports.generateHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};