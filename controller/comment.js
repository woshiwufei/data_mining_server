const comment = require('../models/comment')
const time_Formatter = require('../util/timeFormat')
const sendMessage = require("../util/sendMessage");

insert = async function (req, res, next) {
    let data = req.body;
    console.log(data);
    let result = await comment.insert(data)

    sendMessage(res, result, ["评论已发送~", '评论未能发送~请重试!'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.affectedRows === 1) {
    //     res.send({
    //         status: 'success',
    //         msg: '评论已发送~',
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '评论未能发送~请重试！',
    //         data: result
    //     })
    // }
}

queryByMsgId = async function (req, res, next) {
    let data = req.body;
    const {msg_id} = data
    if (typeof (msg_id) !== 'number') {
        res.send({
            status: 'error',
            msg: "msg_id必须为数字！"
        })
        return
    }

    let result = await comment.queryByMsgId(data)

    sendMessage(res, result, ["评论检索完毕~", '快来做第一个评论的人吧!'], ['create_time'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.total) {
    //     // console.log(result, '+++');
    //     time_Formatter(result.data, ['create_time'])
    //     // result.forEach(item => item.create_time = item.create_time.toLocaleString())
    //     res.send({
    //         status: 'success',
    //         msg: "评论检索完毕~",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: "快来做第一个评论的人吧！"
    //     })
    // }
}

deleteById = async function (req, res, next) {
    let data = req.body;
    try {
        let result = await comment.delete(data)

        sendMessage(res, result, ["评论删除成功~", '评论删除失败!'])

        // if (result.errno) {
        //     res.status(500).send({
        //         status: 'error',
        //         msg: "出错啦...请稍后再试！"
        //     })
        // } else if (result.affectedRows === 1) {
        //     res.send({
        //         status: "success",
        //         msg: "评论删除成功！",
        //         data: result
        //     })
        // } else {
        //     res.send({
        //         status: "error",
        //         msg: "评论删除失败！",
        //         data: result
        //     })
        // }
    } catch (e) {
        console.log("5555", e);
        res.send(e)
    }
}

updateLikeCount = async function (req, res, next) {
    let data = req.body;
    let result = await comment.updateLikeCount(data)

    sendMessage(res, result, ["点赞成功~", '点赞失败！请重试~'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: "出错啦...请稍后再试！"
    //     })
    // } else if (result.affectedRows === 1) {
    //     res.send({
    //         status: "success",
    //         msg: "点赞成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: "error",
    //         msg: "点赞失败！请重试~",
    //         data: result
    //     })
    // }
}


module.exports = {
    insert,
    queryByMsgId,
    delete: deleteById,
    updateLikeCount,
}

