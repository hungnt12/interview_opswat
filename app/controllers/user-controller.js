'use strict'

const { User } = require('../models')
const {
    createError, BAD_REQUEST, UNAUTHORIZED, CONFLICT, NOT_FOUND
} = require('../helpers/error-helper')
const response = require("../helpers/response-helper");

/**
 * List all users
 * @route GET /api/users
 * @group User
 * @param {integer} page_size.query - Page size must be larger than 0
 * @param {integer} page_index.query - Page index must be larger or equal 1
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const getUsers = async (req, res, next) => {
    try{
        const params = req.query;
        const pageSize = params.page_size;
        const pageIndex = params.page_index;

        const users = await User.findPagination({pageSize, pageIndex, whereNot: {id: req.user.id}});
        return response.send(res, null, users || [])
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * Delete user by email
 * @route DELETE /api/users/{email}
 * @group User
 * @param {string} email.path
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const deleteUser = async (req, res, next) => {
    try{
        const email = req.params.email
        const user = await User.findOne({where: {email}, whereNot: {id: req.user.id}})
        if(!user){
            return next(createError({
                status: NOT_FOUND
            }));
        }

        await User.destroy(user.id);

        return response.send(res, null, `User '${ email }' deleted`)
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

module.exports = {
    getUsers,
    deleteUser
}