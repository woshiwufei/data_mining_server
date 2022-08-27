const connectionPool = require('../util/pool')

const course = {
    query: 'select SQL_CALC_FOUND_ROWS * from course limit ?, ?',
    queryByChapterId: 'select SQL_CALC_FOUND_ROWS * from course where chapter_id = ?',
    insert: 'insert into course (course_name, course_path, chapter_id, chapter_name, user_id, create_time, course_order) values (?, ?, ?, ?, ?, ?, ?)',
    update: 'update course set course_name = ?, course_path = ?, chapter_id = ?, chapter_name = ?, course_order = ?',
    delete: 'delete from course where course_id =?'

}

query = async(data) => {
    let {pageNum, pageSize} = data
    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 7
    let start = (pageNum - 1) * pageSize
    let result = await connectionPool.query(course.query, [start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }
}

queryByChapterId = async(data) => {
    let {chapter_id} = data

    let result = await connectionPool.query(course.queryByChapterId, chapter_id).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    console.log(result, total);
    return {
        data: result,
        total: total[0]['found_rows()'],
    }
}

insert = async(data) => {
    data.create_time = data.create_time ? data.create_time : (new Date()).toLocaleString()
    let {course_name, course_path, chapter_id, chapter_name, user_id, create_time, course_order} = data

    return await connectionPool.query(course.insert, [course_name, course_path, chapter_id, chapter_name, user_id,
        create_time, course_order]).catch(error => error)
}

update = async(data) => {
    data.create_time = data.create_time ? data.create_time : (new Date()).toLocaleString()
    let {course_name, course_path, chapter_id, chapter_name, course_order, course_id} = data

    return await connectionPool.query(course.update, [course_name, course_path, chapter_id, chapter_name, course_order,
        course_id]).catch(error => error)
}

deleteById = async(data) => {
    let {course_id} = data

    return await connectionPool.query(course.delete, course_id).catch(error => error)
}



module.exports = {
    query,
    queryByChapterId,
    insert,
    update,
    delete: deleteById,
}