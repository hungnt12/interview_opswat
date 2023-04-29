'use strict'

const { User, Article } = require('../../app/models')

exports.seed = knex => knex(Article.tableName).del()
    .then(() => [
        {
            title: 'Sample Project',
            body: 'This is just a sample project to create some data to look at.'
        },
        {
            title: 'Another Project',
            body: 'This is another project of sample data.'
        }
    ])
    .then(newArticles => Promise.all(newArticles.map(project => Article.create(project))))
    .catch(err => console.log('err: ', err))