const express = require('express');
const router = express.Router();
const token  = require('./token');
const config  = require('../config');
const validations  = require('./validations');

router.get('/', async function(req, res) {
    res.json({ message: 'Welcome Security API!' });
});

router.post('/generateToken', async function(req, res) {
    res.status(200).json({ status : 'ok', message: 'Token generated', token: token.generate(config.TOKEN_KEY) });
});

router.post('/validateToken', async function(req, res) {
    try {
        //Validations
        validations.validateField('token', req.body.token);

        let verified = token.verify(config.TOKEN_KEY, req.body.token);

        res.status(200).json({
            status: verified == 1 ? 'ok' : 'error',
            message: validations.getTokenMessage(verified)
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error
        });
    }
});

router.post('/validateUserPass', async function(req, res) {
    try {
        //Validations
        validations.validateField('user', req.body.user);
        validations.validateField('password', req.body.password);

        res.status(200).json({ status: 'ok', message: validations.getValidationUser(req.body.user, req.body.password)});

    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error
        });
    }
});

router.post('/validateBearerToken', async function(req, res) {
    try {
        let _token = req.headers['x-access-token'] || req.headers['authorization'];
        _token = _token.replace(/^Bearer\s+/, "");

        //Validations
        validations.validateField('bearer token', _token);

        let verified = token.verify(config.TOKEN_KEY, _token);

        res.status(200).json({
            status: verified == 1 ? 'ok' : 'error',
            message: validations.getTokenMessage(verified)
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error
        });
    }
});

router.post('/validateBasicAuth', async function(req, res) {
    try {
        // check for basic auth header
        if (req.headers.authorization == null || req.headers.authorization === false || req.headers.authorization.indexOf('Basic ') === -1) {
            throw 'Missing Authorization Header';
        }

        // verify auth credentials
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        //Validations
        validations.validateField('user', username);
        validations.validateField('password', password);

        res.status(200).json({ status: 'ok', message: validations.getValidationUser(username, password)});

    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error
        });
    }
});

module.exports = router;