const message = require('../config/message')
const time_Formatter = require('../util/timeFormat')
const sendMessage = require("../util/sendMessage");

query = async (req, res, next) => {
    let data = req.body;

    let result = await message.query(data)

    if (result.errno) {
        res.status(500).send({
            status: 'error',
            msg: "出错啦...请稍后再试！"
        })
    } else if (result.length) {
        time_Formatter(result.data, ['create_time'])
        res.send({
            status: 'success',
            msg: "留言检索完毕~",
            data: result
        })
    } else {
        res.send({
            status: 'error',
            msg: "此留言不存在！"
        })
    }
}

queryAll = async (req, res, next) => {
    let data = req.body;

    let result = await message.queryAll(data)

    sendMessage(res, result, ["留言检索完毕！", '快来做第一个留言的人吧！'], ['create_time'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.total) {
    //     time_Formatter(result.data, ['create_time'])
    //     res.send({
    //         status: 'success',
    //         msg: "留言检索完毕~",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: "快来做第一个留言的人吧！"
    //     })
    // }
}

updateViewCount = async (req, res, next) => {
    let data = req.body;

    let result = await message.updateViewCount(data)

    sendMessage(res, result, ["浏览量已更新！", '浏览量更新失败！'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.affectedRows === 1) {
    //     res.send({
    //         status: 'success',
    //         msg: '浏览量已更新~',
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '浏览量更新失败！',
    //         data: result
    //     })
    // }
}

insert = async (req, res, next) => {
    let data = req.body;

    let result = await message.insert(data)

    sendMessage(res, result, ["留言发送成功！", '留言未能发送~请重试！'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.affectedRows === 1) {
    //     res.send({
    //         status: 'success',
    //         msg: '留言发送成功~',
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '留言未能发送~请重试！',
    //         data: result
    //     })
    // }
}

deleteById = async (req, res, next) => {
    let data = req.body;

    let result = await message.delete(data)

    sendMessage(res, result, ["留言删除成功~", '留言删除失败~请重试！'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.affectedRows === 1) {
    //     res.send({
    //         status: 'success',
    //         msg: '留言删除成功~',
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '留言删除失败~请重试！',
    //         data: result
    //     })
    // }
}




module.exports = {
    query,
    queryAll,
    updateViewCount,
    insert,
    delete: deleteById
};