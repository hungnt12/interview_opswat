'use strict'

const { Article, ArticleFavourite } = require('../models')
const {
    createError, BAD_REQUEST, UNAUTHORIZED, CONFLICT, NOT_FOUND
} = require('../helpers/error-helper')
const response = require("../helpers/response-helper");

/**
 * @typedef CreateArticleParam
 * @property {string} title.required
 * @property {string} body
 */

/**
 * Create article
 * @route POST /api/articles
 * @group Article
 * @param {CreateArticleParam.model} params.body
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */

const postArticles = async (req, res, next) => {
    try{
        const props = req.body;
        console.log(props)
        await Article.create(props);
        return response.send(res, null, {message: 'Articale created'})
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * List articles
 * @route GET /api/articles
 * @group Article
 * @param {integer} page_size.query - Page size must be larger than 0
 * @param {integer} page_index.query - Page index must be larger or equal 1
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const getArticles = async (req, res, next) => {
    try{
        const params = req.query;
        const pageSize = params.page_size;
        const pageIndex = params.page_index;

        const articles = await Article.findPagination({pageSize, pageIndex});
        return response.send(res, null, articles || [])
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}


/**
 * Get article
 * @route GET /api/articles/{article_id}
 * @group Article
 * @param {integer} article_id.path.require
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const getArticle = async (req, res, next) => {
    try{
        const id = req.params.id

        const article = await Article.findById(id);
        if(!article){
            return next(createError({
                status: NOT_FOUND
            }));
        }
        return response.send(res, null, article)
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * @typedef UpdateArticleParam
 * @property {string} title.required
 * @property {string} body
 */

/**
 * Update article
 * @route PUT /api/articles/{article_id}
 * @group Article
 * @param {integer} article_id.path.require
 * @param {UpdateArticleParam.model} params.body
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const putArticle = async (req, res, next) => {
    try{
        const id = req.params.id
        const props = req.body

        const article = await Article.findById(id);
        if(!article){
            return next(createError({
                status: NOT_FOUND
            }));
        }

        await Article.update(id, props);
        return response.send(res, null, 'Article updated')
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * Delete article
 * @route DELETE /api/articles/{article_id}
 * @group Article
 * @param {integer} article_id.path.require
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const deleteArticle = async (req, res, next) => {
    try{
        const id = req.params.id
        const article = await Article.findById(id);
        if(!article){
            return next(createError({
                status: NOT_FOUND
            }));
        }

        await Article.destroy(id);
        return response.send(res, null, 'Article deleted')
    }catch (e) {
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * Add favourite
 * @route POST /api/articles/{article_id}/favorite
 * @group Article
 * @param {integer} article_id.path.require
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const postFavourite = async (req, res, next) => {
    const t = await ArticleFavourite.createTransaction();
    try{
        const id = req.params.id;
        const userId = req.user.id;

        const af = await ArticleFavourite.findOne({where:{user_id: userId, article_id: id}}, t);
        if(!af){
            await ArticleFavourite.create({
                user_id: userId,
                article_id: id
            }, t)

            const article = await Article.findById(id, t);
            if(article){
                await Article.update(id, {
                    favourite_count: (article.favourite_count || 0) + 1
                }, t)
            }
        }
        await t.commit();
        return response.send(res, null, 'Success')
    }catch (e) {
        await t.rollback();
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

/**
 * Remove favourite
 * @route DELETE /api/articles/{article_id}/favorite
 * @group Article
 * @param {integer} article_id.path.require
 * @security JWT
 * @returns {object} 200 - Return status = "SUCCESS" and result in data
 * @returns {Error}  200 - Return status = "ERROR" and error in errors
 */
const deleteFavourite = async (req, res, next) => {
    const t = await ArticleFavourite.createTransaction();
    try{
        const id = req.params.id;
        const userId = req.user.id;

        const af = await ArticleFavourite.findOne({where:{user_id: userId, article_id: id}}, t);
        if(af){
            await ArticleFavourite.destroy(af.id, t)

            const article = await Article.findById(id, t);
            if(article){
                await Article.update(id, {
                    favourite_count: (article.favourite_count || 0) -1 < 0 ? 0 : (article.favourite_count || 0) -1
                }, t)
            }
        }
        await t.commit();
        return response.send(res, null, 'Success')
    }catch (e) {
        await t.rollback();
        next(createError({
            status: BAD_REQUEST,
            message: e.message,
            raw: e
        }));
    }
}

module.exports = {
    postArticles,
    getArticles,
    getArticle,
    putArticle,
    deleteArticle,
    postFavourite,
    deleteFavourite
}