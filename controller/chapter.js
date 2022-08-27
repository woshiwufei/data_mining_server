const chapter = require('../config/chapter')
const time_Formatter = require('../util/timeFormat')
const sendMessage = require("../util/sendMessage");

query = async (req, res, next) => {

    let result = await chapter.query()

    sendMessage(res, result, ["课程章节查询成功！", '还没有课程章节呢！请先添加哦~'], ['create_time', 'last_modify_time'])

    // if (result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.total){
    //     time_Formatter(result.data, ['create_time', 'last_modify_time'])
    //     res.send({
    //         status: 'success',
    //         msg: '课程章节查询成功！',
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '还没有课程章节呢！请先添加哦~',
    //         data: result
    //     })
    // }
}

insert = async (req, res, next) => {
    let data = req.body

    let result = await chapter.insert(data)

    sendMessage(res, result, ["章节添加成功！", '章节添加失败!'])

    // if (result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //
    //     res.send({
    //         status: "success",
    //         msg: '章节添加成功！',
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '章节添加失败！',
    //         data: result
    //     })
    // }
}

deleteById = async (req, res, next) => {
    let data = req.body

    let result = await chapter.delete(data)

    sendMessage(res, result, ["恭喜您！删除成功！！", '哎呀，删除失败!'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg: "恭喜您！删除成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '哎呀，删除失败！',
    //         data: result
    //     })
    // }
}

update = async (req, res, next) => {
    let data = req.body

    let result = await chapter.update(data)

    sendMessage(res, result, ["章节信息修改成功！", '章节信息修改失败！'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg: "章节信息修改成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '章节信息修改失败！',
    //         data: result
    //     })
    // }
}


module.exports = {
    query,
    insert,
    delete: deleteById,
    update,
}
