const course = require('../config/course')
const time_Formatter = require('../util/timeFormat')
const sendMessage = require('../util/sendMessage')

query = async(req, res, next) => {
    let data = req.body
    let result = await course.query(data)

    sendMessage(res, result, ["课程检索成功！", '未检索到课程！'], ['create_time'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.total){
    //     time_Formatter(result.data, ['create_time'])
    //     res.send({
    //         status: "success",
    //         msg: "课程检索成功！",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '未检索到课程！',
    //         data: result
    //     })
    // }

}

queryByChapterId = async(req, res, next) => {
    let data = req.body
    let result = await course.queryByChapterId(data)
    console.log(result, '000');

    sendMessage(res, result, ["当前章节课程检索成功！", '当前章节未查询到课程！'], ['create_time'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.total){
    //     time_Formatter(result.data, ['create_time', 'last_modify_time'])
    //     res.send({
    //         status: "success",
    //         msg: "当前章节课程检索成功！",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '当前章节未查询到课程！',
    //         data: result
    //     })
    // }

}

insert = async(req, res, next) => {
    let data = req.body
    let result = await course.insert(data)

    sendMessage(res, result, ["课程添加成功！", '课程添加失败！'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg: "课程添加成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '课程添加失败！',
    //         data: result
    //     })
    // }
}

update = async(req, res, next) => {
    let data = req.body
    let result = await course.update(data)

    sendMessage(res, result, ["课程修改成功！", '课程修改失败！'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg: "课程修改成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '课程修改失败！',
    //         data: result
    //     })
    // }

}

deleteById = async(req, res, next) => {
    let data = req.body
    let result = await course.delete(data)

    sendMessage(res, result, ["课程删除成功！", '课程删除失败！'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg: "课程删除成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '课程删除失败！',
    //         data: result
    //     })
    // }
}


module.exports = {
    query,
    queryByChapterId,
    insert,
    update,
    delete: deleteById,
}
