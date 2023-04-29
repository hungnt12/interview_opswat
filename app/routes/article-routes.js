'use strict'

const router = require('express').Router()
const {
    postArticles,
    getArticles,
    getArticle,
    putArticle,
    deleteArticle,
    postFavourite,
    deleteFavourite
} = require('../controllers/article-controller')
const authMiddleware = require('../middleware/auth-middleware');
const isAuth = authMiddleware.isAuth;

router.route('/articles')
    .post(isAuth, postArticles)
    .get(isAuth, getArticles)

router.route('/articles/:id')
    .get(isAuth, getArticle)
    .put(isAuth, putArticle)
    .delete(isAuth, deleteArticle)

router.route('/articles/:id/favorite')
    .post(isAuth, postFavourite)
    .delete(isAuth, deleteFavourite)

module.exports = router