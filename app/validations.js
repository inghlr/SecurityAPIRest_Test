const config  = require('../config');

const getTokenMessage = function(value){
    switch (value) {
        case 1:
            return 'token validated successfuly';
        case 0:
            throw 'incorrect token';
        case 2:
            throw 'expired token';
        default:
            throw 'error: ' + value;
    }
}

const getValidationUser = function(user, pass){
    if(user == config.BASICAUTH_USER && pass == config.BASICAUTH_PWD)
        return 'Login validated successfuly';
    if(user != config.BASICAUTH_USER)
        throw 'invalid user';
    if(pass != config.BASICAUTH_PWD)
        throw 'invalid password';

    throw 'user or password incorrect';
}

const validateField = function(field, value){
    if(value == null || value == '' || value.trim() == '')
        throw field + ' requerido';
}

module.exports = { getTokenMessage, getValidationUser, validateField };