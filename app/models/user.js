'use strict'

const bcrypt = require('bcrypt-nodejs')
const createGuts = require('../helpers/base-model')

const name = 'User'
const tableName = 'users'

// Properties that are allowed to be selected from the database for reading.
// (e.g., `password` is not included and thus cannot be selected)
const selectableProps = [
    'id',
    'email',
    'username',
    'fullname',
    'updated_at',
    'created_at'
]

const hashPassword = password => {
    return bcrypt.hashSync(password)
}
const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const beforeSave = user => {
    if (!user.password) return user;

    user.password = hashPassword(user.password);
    return user;
}

module.exports = knex => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    })

    const create = async (props) => {
        const user = await beforeSave(props);
        await guts.create(user);
    }

    const verify = async (email, password) => {
        const matchErrorMsg = 'Username or password do not match'

        const user = await knex.select().from(tableName).where({ email }).timeout(guts.timeout).first();

        if (!user) throw matchErrorMsg

        if(!verifyPassword(password, user.password)) throw matchErrorMsg

        return user
    }

    return {
        ...guts,
        create,
        verify
    }
}