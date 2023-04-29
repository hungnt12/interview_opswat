exports.up = knex => {
    return knex.schema.createTable('article_favourite', t => {
        t.increments('id').primary().unsigned()
        t.integer('user_id')
        t.integer('article_id')
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = knex => {
    return knex.schema.dropTable('users')
}