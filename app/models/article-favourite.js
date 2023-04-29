'use strict'

const createGuts = require('../helpers/base-model')

const name = 'ArticleFavourite'
const tableName = 'article_favourite'

const selectableProps = [
    'id',
    'user_id',
    'article_id',
    'updated_at',
    'created_at'
]

module.exports = knex => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    })

    return {
        ...guts
    }
}