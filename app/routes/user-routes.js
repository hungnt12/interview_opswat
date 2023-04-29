'use strict'

const router = require('express').Router()
const {
    getUsers,
    deleteUser
} = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware');
const isAuth = authMiddleware.isAuth;

router.route('/users')
    .get(isAuth, getUsers)

router.route('/users/:email')
    .delete(isAuth, deleteUser)

module.exports = router