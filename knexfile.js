'use strict'

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '12345678',
            database: 'hn_opswat'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${__dirname}/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/database/seeds`
        }
    },
    staging: {},
    production: {}
}
