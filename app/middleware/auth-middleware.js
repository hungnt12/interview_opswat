'use strict'

const { User } = require('../models')
const {createError, UNAUTHORIZED} = require("../helpers/error-helper");
const CONSTANTS = require("../constants");
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const verify = promisify(jwt.verify).bind(jwt);

const verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};

exports.isAuth = async (req, res, next) => {
    const accessTokenFromHeader = (req.headers.authorization || "").replace("Bearer", "").trim();
    if (!accessTokenFromHeader) {
        return next(createError({
            status: UNAUTHORIZED
        }));
    }

    const accessTokenSecret = CONSTANTS.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return next(createError({
            status: UNAUTHORIZED
        }));
    }

    const user = await User.findById(verified.payload.id);
    req.user = user;

    return next();
};