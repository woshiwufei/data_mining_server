const connectionPool = require("../util/pool")

const comment = {
    queryByMsgId: "select SQL_CALC_FOUND_ROWS * from comment where msg_id = ? limit ?, ?",
    updateLikeCount: "update comment set like_count = ? where comment_id = ?",
    insert:
        "insert into comment (user_id, msg_id, like_count, comment_content, create_time, user_name) values ( ?, ?, 0, ?, ?, ?)",
    delete: "delete from comment where comment_id = ?"
    // queryCommentByUser:
    //     "select * from comment where article_id in ( select article_id from article where user_id = ?) order by comment_id desc",
    // queryCommentByUser: 'select * from comment as c inner join article as a where a.article_id = c.article_id and a.user_id = ?'
};

queryByMsgId = async (data) => {
    let {pageNum, pageSize, msg_id} = data
    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 10
    let start = (pageNum - 1) * pageSize
    let result = await connectionPool.query(comment.queryByMsgId, [msg_id, start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }
}

updateLikeCount = async function(data){
    let {comment_id, like_count} = data;
    return await connectionPool.query(comment.updateLikeCount, [++like_count, comment_id]).catch(error => error)
}

insert = async function(data){
    data.create_time = data.create_time ? data.create_time : (new Date()).toLocaleString()
    let {user_id, user_name, create_time, msg_id, comment_content} = data
    return await connectionPool.query(comment.insert, [user_id, msg_id, comment_content, create_time, user_name]).catch(
        error => error
    )
}

deleteById = async function(data){
    try{
        let {comment_id} = data;
        return await connectionPool.query(comment.delete, comment_id)
    } catch(error){
        console.log(error);
        return error
    }

}



module.exports = {
    queryByMsgId,
    updateLikeCount,
    insert,
    delete: deleteById
};
