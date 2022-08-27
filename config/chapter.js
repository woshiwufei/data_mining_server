const connectionPool = require('../util/pool')

const chapter = {
    query: 'select SQL_CALC_FOUND_ROWS chapter_id, chapter_name, chapter_order, create_time, last_modify_time from chapter',
    insert: 'insert into chapter (chapter_name, chapter_order, create_time, last_modify_time) values (?, ?, ?, ?)',
    delete: 'delete from chapter where chapter_id = ?',
    update: 'update chapter set chapter_name = ?, chapter_order = ?, last_modify_time = ? where chapter_id = ?'
}

query = async(data) => {
    // let {} = data
    let result = await connectionPool.query(chapter.query).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
    }
}

insert = async(data) => {
    data.create_time = data.create_time ? data.create_time : (new Date()).toLocaleString()
    data.last_modify_time = data.create_time
    let {chapter_name, chapter_order, create_time, last_modify_time} = data
    return await connectionPool.query(chapter.insert, [chapter_name, chapter_order, create_time, last_modify_time]).catch(error => error)
}

deleteById = async(data) => {
    let {chapter_id} = data
    return await connectionPool.query(chapter.delete, chapter_id).catch(error => error)
}

update = async(data) => {
    data.last_modify_time = data.last_modify_time ? data.last_modify_time : (new Date()).toLocaleString()
    let {chapter_name, chapter_order, chapter_id, last_modify_time} = data
    return await connectionPool.query(chapter.update, [chapter_name, chapter_order, last_modify_time, chapter_id]).catch(error => error)
}

module.exports = {
    query,
    insert,
    delete: deleteById,
    update,
}

