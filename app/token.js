const config  = require('../config');
const token = require('token');
token.defaults.secret = 'AAB';
token.defaults.timeStep = config.TOKEN_TIME * 60 * 60; // 24h in seconds //0.25 15 mins

module.exports = token;