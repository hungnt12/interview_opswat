'use strict'

const { User } = require('../../app/models')

exports.seed = knex => knex(User.tableName).del()
    .then(() => [
        {
            username: 'admin',
            password: 'admin',
            email: 'admin@email.com',
            fullname: 'admin'
        },
        {
            username: 'first-user',
            password: 'another-password',
            email: 'first-user@email.com',
            fullname: 'first user'
        }
    ])
    .then(newUsers => Promise.all(newUsers.map(user => User.create(user))))
    .catch(err => console.log('err: ', err))