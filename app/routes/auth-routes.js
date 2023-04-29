'use strict'

const router = require('express').Router()
const {
    postLogin,
    postRegister
} = require('../controllers/auth-controller')

router.route('/login')
    .post(postLogin)

router.route('/users')
    .post(postRegister)

module.exports = router
