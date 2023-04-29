exports.up = knex => {
    return knex.schema.createTable('articles', t => {
        t.increments('id').primary().unsigned()
        t.string('title', 250)
        t.string('body', 10000)
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
        t.integer('favourite_count').defaultTo(0)
    })
}

exports.down = knex => {
    return knex.schema.dropTable('articles')
}