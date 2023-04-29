'use strict'

const CONSTANTS = require('../constants');
const { User } = require('../models');
const {
    createError, BAD_REQUEST, UNAUTHORIZED, CONFLICT, NOT_FOUND
} = require('../helpers/error-helper');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const response = require('../helpers/response-helper');

const accessTokenLife = CONSTANTS.ACCESS_TOKEN_LIFE;
const accessTokenSecret = CONSTANTS.ACCESS_TOKEN_SECRET;

const generateToken = async (payload) => {
    try {
        return await sign({payload}, accessTokenSecret, {algorithm: 'HS256', expiresIn: accessTokenLife});
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

/**
 * @typedef LoginParams
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * Login
 * @route POST /api/login
 * @group Auth
 * @param {LoginParams.model} params.body.required - Params
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const postLogin = async (req, res, next) => {
    try{
        const email = String(req.body.email)
        const password = String(req.body.password)

        if (!email || !password) next(createError({
            status: BAD_REQUEST,
            message: '`email` + `password` are required fields'
        }))

        const user = await User.verify(email, password);
        return response.send(res, null, {token: await generateToken({
            id: user.id
        })})
    }catch (e) {
        next(createError({
            status: UNAUTHORIZED,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * @typedef RegisterParams
 * @property {string} email.required
 * @property {string} username.required
 * @property {string} fullname.required
 * @property {string} password.required
 */

/**
 * Register
 * @route POST /api/users
 * @group Auth
 * @param {RegisterParams.model} params.body.required - Params
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const postRegister = async (req, res, next) => {
    try{
        const props = req.body

        const user = await User.findOne({where: (builder) => {builder.where({username: props.username}).orWhere({email: props.email})}});
        if (user) return next(createError({
            status: CONFLICT,
            message: 'Username or email already exists'
        }))

        await User.create(props);
        return response.send(res, null, {message: 'Registration successful'})
    }catch (e){
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

module.exports = {
    postLogin,
    postRegister
}
