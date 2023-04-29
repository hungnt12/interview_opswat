'use strict'

const {
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    CONFLICT,
    NOT_FOUND,
    UNPROCESSABLE,
    GENERIC_ERROR
} = require('../helpers/error-helper');
const response = require('../helpers/response-helper');

const unauthorized = (err, req, res, next) => {
    if (err.status !== UNAUTHORIZED) return next(err)

    return response.send(res, {
        code: UNAUTHORIZED,
        message: err.message || 'Unauthorized',
        raw: err.raw
    })
}

const forbidden = (err, req, res, next) => {
    if (err.status !== FORBIDDEN) return next(err)

    return response.send(res, {
        code: FORBIDDEN,
        message: err.message || 'Forbidden',
        raw: err.raw
    })
}

const conflict = (err, req, res, next) => {
    if (err.status !== CONFLICT) return next(err)

    return response.send(res, {
        code: CONFLICT,
        message: err.message || 'Conflict',
        raw: err.raw
    })
}

const badRequest = (err, req, res, next) => {
    if (err.status !== BAD_REQUEST) return next(err)

    return response.send(res, {
        code: BAD_REQUEST,
        message: err.message || 'Bad Request',
        raw: err.raw
    })
}

const unprocessable = (err, req, res, next) => {
    if (err.status !== UNPROCESSABLE) return next(err)

    return response.send(res, {
        code: UNPROCESSABLE,
        message: err.message || 'Unprocessable entity',
        raw: err.raw
    })
}

const notFound = (err, req, res, next) => {
    if (err.status !== NOT_FOUND) return next(err)

    return response.send(res, {
        code: NOT_FOUND,
        message: err.message || 'The requested resource could not be found',
        raw: err.raw
    })
}

const genericError = (err, req, res, next) => {
    return response.send(res, {
        code: GENERIC_ERROR,
        message: err.message || 'Internal server error',
        raw: err.raw
    })
}

const catchall = (req, res, next) => {
    return response.send(res, {
        code: NOT_FOUND,
        message: 'The requested resource could not be found',
    })
}

const exportTables = {
    unauthorized,
    forbidden,
    conflict,
    badRequest,
    unprocessable,
    notFound,
    genericError,
    catchall
}

const all = Object.keys(exportTables).map(key => exportTables[key])

module.exports = {
    ...exportTables,
    all
}