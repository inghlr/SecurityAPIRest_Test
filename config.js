const dotenv = require('dotenv').config();

// config.js
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080,
    TOKEN_KEY: process.env.TOKEN_KEY || 'ABC',
    TOKEN_TIME: process.env.TOKEN_TIME || 0.5,//hours
    BASICAUTH_USER: process.env.BASICAUTH_USER || 'user',
    BASICAUTH_PWD: process.env.BASICAUTH_PWD || '123qweasd',
}