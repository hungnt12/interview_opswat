'use strict'

const createGuts = require('../helpers/base-model')

const name = 'Article'
const tableName = 'articles'

const selectableProps = [
    'id',
    'title',
    'body',
    'updated_at',
    'created_at',
    'favourite_count'
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