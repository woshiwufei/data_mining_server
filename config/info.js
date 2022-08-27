const connectionPool = require("../util/pool")

const info = {
    queryInfo: "select SQL_CALC_FOUND_ROWS * from info where info_id = ?",
    queryInfoByUser: "SELECT SQL_CALC_FOUND_ROWS * from info  where user_id = ? order by last_modify_time desc limit ?, ?; ",
    deleteInfo: "delete from info where info_id = ? ",
    queryAll: "SELECT SQL_CALC_FOUND_ROWS * from info order by last_modify_time desc limit ?, ?; ",
    queryAllInfo: 'SELECT SQL_CALC_FOUND_ROWS * from info where info_type = 1 order by last_modify_time desc limit ?, ?; ',
    queryAllDraft: 'SELECT SQL_CALC_FOUND_ROWS * from info where info_type = 0 order by last_modify_time desc limit ?, ?; ',
    insertInfo:
        'insert into info ( title, appendix, category_id, create_time, last_modify_time, info_type, view_count, user_id, content_html) values ( ?, ?, ?, ?, ?, 0, ?, 1, ? )',
        // 'insert into info where title = ?, appendix = ?, category_id = ?, create_time = ?, last_modify_time = ?, view_count = 0, content_html = ?, info_type = 1, user_id = ?)',
    updateInfo:
        "update info set title = ?, appendix = ?, category_id = ?, last_modify_time = ?, view_count = ?, content_html = ?, info_type = ? where info_id = ?",
    // delete: "delete from info where info_id = ?",
    // updateAsDraft: 'update article set title = ?, summary = ?, tag = ?, update_time = ?, article_html = ?, state = ?, content = ? where article_id = ?',
    // draftToInfo: "update info set info_type = 1 where info_id = ?",
    // queryDraftByUser: ' select * from article where user_id = ? and state = 0',
    // updateViewCount: "update info set view_count = ? where info_id = ?",
    // updateCommentCount:
    //     "update info set comment_count = ? where info_id = ?",
};

queryInfo = async (data) => {
    let {info_id} = data;
    // return await connectionPool.query(info.queryInfo, info_id).catch(error => error)
    let result = await connectionPool.query(info.queryInfo, info_id).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
    }
}

queryInfoByUser = async (data) => {
    let {pageNum, pageSize, user_id} = data
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 7
    let start = (pageNum - 1) * pageSize
    // return await connectionPool.query(info.queryInfoByUser, user_id).catch(error => error)
    let result = await connectionPool.query(info.queryInfoByUser, [user_id, start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }
}

queryAll = async (data) => {
    let {pageNum, pageSize} = data
    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 7
    let start = (pageNum - 1) * pageSize
    let result = await connectionPool.query(info.queryAll, [start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }
}

queryAllInfo = async (data) => {
    let {pageNum, pageSize} = data
    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 7
    let start = (pageNum - 1) * pageSize
    // return await connectionPool.query(info.queryAllInfo, ).catch(error => error)
    let result = await connectionPool.query(info.queryAllInfo, [start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }

}

queryAllDraft = async (data) => {
    let {pageNum, pageSize} = data
    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 7
    let start = (pageNum - 1) * pageSize
    // return await connectionPool.query(info.queryAllDraft, ).catch(error => error)
    let result = await connectionPool.query(info.queryAllDraft, [start, pageSize]).catch(error => error)
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
        pageNum,
        pageSize
    }
}

insertInfo = async (data) => {
    data.create_time = data.create_time ? data.create_time : (new Date()).toLocaleString()
    data.last_modify_time = data.create_time
    let {title, appendix, category_id, create_time, last_modify_time, view_count, content_html, info_type, user_id} = data;
    return await connectionPool.query(info.insertInfo, [title, appendix, category_id, create_time, last_modify_time, view_count, content_html, info_type, user_id]).catch(error => error)
}

updateInfo = async (data) => {
    data.last_modify_time = data.last_modify_time ? data.last_modify_time : (new Date()).toLocaleString()

    let {title, appendix, category_id, last_modify_time, view_count,
        content_html, info_type, info_id} = data;
    return await connectionPool.query(info.updateInfo, [title, appendix, category_id, last_modify_time, view_count,
        content_html, info_type, info_id]).catch(error => error)
}

deleteInfo = async (data) => {
    let {info_id} = data;
    return await connectionPool.query(info.deleteInfo, info_id).catch(error => error)
}



module.exports = {
    queryInfo,
    queryInfoByUser,
    queryAll,
    queryAllInfo,
    queryAllDraft,
    insertInfo,
    updateInfo,
    delete: deleteInfo,
};
