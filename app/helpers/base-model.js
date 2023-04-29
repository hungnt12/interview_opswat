'use strict'

const generateFilter = (filters) => {
    if(!filters.where) filters.where = {};
    if(!filters.whereNot) filters.whereNot = {};
}

module.exports = ({
                      knex = {},
                      name = 'name',
                      tableName = 'tablename',
                      selectableProps = [],
                      timeout = 1000
                  }) => {
    const create = async (props, t) => {
        delete props.id;
        if(t){
            return await knex.transacting(t).insert(props).into(tableName).timeout(timeout)
        }
        return await knex.insert(props).into(tableName).timeout(timeout)
    }

    const findAll = async (t) => {
        if(t){
            return await knex.select(selectableProps)
                .from(tableName)
                .transacting(t)
                .timeout(timeout)
        }
        return await knex.select(selectableProps)
            .from(tableName)
            .timeout(timeout)
    }

    const find = async (filters = {}, t) => {
        generateFilter(filters)
        if(t){
            return await knex.select(selectableProps)
                .from(tableName)
                .transacting(t)
                .where(filters.where)
                .whereNot(filters.whereNot)
                .timeout(timeout)
        }
        return await knex.select(selectableProps)
            .from(tableName)
            .where(filters.where)
            .whereNot(filters.whereNot)
            .timeout(timeout)
    }

    const findPagination = async (filters = {}, t) => {
        generateFilter(filters)

        const pageSize = parseInt(filters.pageSize && filters.pageSize >= 1 ? filters.pageSize : 10);
        const pageIndex = parseInt(filters.pageIndex && filters.pageIndex >= 1 ? filters.pageIndex : 1);
        const offset = (pageIndex - 1) * pageSize;

        const [total, rows] = await Promise.all([
            t ? knex.count('* as count')
                .from(tableName)
                .transacting(t)
                .where(filters.where)
                .whereNot(filters.whereNot)
                .timeout(timeout)
            : knex.count('* as count')
                .from(tableName)
                .where(filters.where)
                .whereNot(filters.whereNot)
                .timeout(timeout),
            t ? knex.select(selectableProps)
                .from(tableName)
                .transacting(t)
                .offset(offset)
                .limit(pageSize)
                .where(filters.where)
                .whereNot(filters.whereNot)
                .timeout(timeout)
            : knex.select(selectableProps)
                .from(tableName)
                .offset(offset)
                .limit(pageSize)
                .where(filters.where)
                .whereNot(filters.whereNot)
                .timeout(timeout)
        ]);


        return {
            result: rows,
            total: total[0].count,
            page_index: pageIndex,
            page_size: pageSize
        }
    }

    const findOne = async (filters = {}, t) => {
        generateFilter(filters)
        const results = await find(filters, t);
        if (!Array.isArray(results)) return results
        return results[0]
    }

    const findById = async (id, t) => {
        const results = t ? await knex.transacting(t).select(selectableProps).from(tableName).where({ id }).timeout(timeout) : await knex.select(selectableProps).from(tableName).where({ id }).timeout(timeout);
        if (!Array.isArray(results)) return results
        return results[0]
    }

    const update = async (id, props, t) => {
        delete props.id;
        if(t){
            return await knex.transacting(t).update(props).from(tableName).where({ id }).timeout(timeout);
        }
        return await knex.update(props).from(tableName).where({ id }).timeout(timeout);
    }

    const destroy = async (id, t) => {
        if(t){
            return await knex.transacting(t).del().from(tableName).where({ id }).timeout(timeout);
        }
        return await knex.del().from(tableName).where({ id }).timeout(timeout);
    }

    const createTransaction = async () => await knex.transaction();

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        findPagination,
        findOne,
        findById,
        update,
        destroy,
        createTransaction
    }
}