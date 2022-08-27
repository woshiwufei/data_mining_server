const connectionPool = require("../util/pool")

const message = {
    query: "select SQL_CALC_FOUND_ROWS * from message where msg_id = ?",
    queryAll: "SELECT SQL_CALC_FOUND_ROWS * from message order by create_time desc limit ?, ?;",
    updateViewCount: "update message set view_count = ? where msg_id = ?",
    insert:
        "insert into message (user_id, msg_content, create_time, user_name) values ( ?, ?, ?, ?)",
    delete: "delete from message where msg_id = ?",
    // queryByMsgId: "select * from comment where msg_id = ?",
    // queryCommentByUser:
    //     "select * from comment where article_id in ( select article_id from article where user_id = ?) order by comment_id desc",
    // queryCommentByUser: 'select * from comment as c inner join article as a where a.article_id = c.article_id and a.user_id = ?'
};

query = async (data) => {
    let {msg_id} = data;
    let result = await connectionPool.query(message.query, msg_id).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
    }
}

queryAll = async (data) => {
    let {pageNum, pageSize} = data
    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 7
    let start = (pageNum - 1) * pageSize
    // return await connectionPool.query(message.queryAll, [start, pageSize]).catch(error => error)
    let result = await connectionPool.query(message.queryAll, [start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }
}

updateViewCount = async function(data){
    let {msg_id, view_count} = data;
    return await connectionPool.query(message.updateViewCount, [++view_count, msg_id]).catch(error => error)
}

insert = async function(data){
    data.create_time = data.create_time ? data.create_time : (new Date()).toLocaleString()
    let {user_id, user_name, create_time, msg_content} = data
    return await connectionPool.query(message.insert, [user_id, msg_content, create_time, user_name]).catch(
        error => error
    )
}

deleteById = async function(data){
    try{
        let {msg_id} = data;
        return await connectionPool.query(message.delete, msg_id)
    } catch(error){
        console.log(error);
        return error
    }

}



module.exports = {
    query,
    queryAll,
    updateViewCount,
    insert,
    delete: deleteById
};
