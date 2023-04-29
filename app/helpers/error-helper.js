'use strict'

const createError = ({
         status = 500,
         message = null,
         error = null,
         raw = null
    }) => {
    if(raw) console.log(raw)
    if(error) console.log(error)
    const err = {
        status: status,
        message: message,
        raw: JSON.stringify(raw || error || message)
    }
    return err
}

module.exports = {
    createError,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
    GENERIC_ERROR: 500
}
