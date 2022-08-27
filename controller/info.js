const info = require('../models/info')
// const time_Formatter = require('../util/timeFormat')
const sendMessage = require("../util/sendMessage");


queryInfo = async (req, res, next) => {
    let data = req.body;
    console.log(data);

    let result = await info.queryInfo(data);

    sendMessage(res, result, ["查找信息成功！", '未查询到此信息！'], ['create_time', 'last_modify_time'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.length){
    //     time_Formatter(result.data, ['create_time', 'last_modify_time'])
    //     res.send({
    //         status: "success",
    //         msg: "查找信息成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '未查询到此信息！',
    //         data: result
    //     })
    // }
}

queryInfoByUser = async (req, res, next) => {
    let data = req.body;
    console.log(data);

    let result = await info.queryInfoByUser(data);

    sendMessage(res, result, ["查找信息成功！", '未查询到此信息！'], ['create_time', 'last_modify_time'])


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
    //         msg: "查找信息成功！",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '未查询到此信息！',
    //         data: result
    //     })
    // }
}

queryAll = async (req, res, next) => {
    // let data = req.params;
    let data = req.body;
    console.log(data);

    let result = await info.queryAll(data);

    sendMessage(res, result, ["查找所有信息成功！", '还未发布信息！'], ['create_time', 'last_modify_time'])


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
    //         msg: "查找所有信息成功！",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '还未发布信息！',
    //         data: result
    //     })
    // }
}

queryAllInfo = async (req, res, next) => {
    let data = req.body;
    console.log(data, "111");
    console.log(req, "222");

    let result = await info.queryAllInfo(data);

    sendMessage(res, result, ["查找已发布信息成功！", '未查询到已发布信息！'], ['create_time', 'last_modify_time'])

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
    //         msg: "查找已发布信息成功！",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '未查询到已发布信息！',
    //         data: result
    //     })
    // }
}

queryAllDraft = async (req, res, next) => {
    let data = req.body;
    console.log(data);

    let result = await info.queryAllDraft(data);

    sendMessage(res, result, ["查询草稿成功！", '未查询到草稿！'], ['create_time', 'last_modify_time'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.total){
    //     console.log("this", this);
    //     time_Formatter(result.data, ['create_time', 'last_modify_time'])
    //     res.send({
    //         status: "success",
    //         msg: "查询草稿成功！",
    //         ...result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '未查询到草稿！',
    //         data: result
    //     })
    // }
}

insertInfo = async (req, res, next) => {
    let data = req.body;
    // console.log(data);
    let msg = data.info_type === undefined
        ? '信息发布成功！' : data.info_type
            ? '信息发布成功！' : '草稿保存成功！'

    let result = await info.insertInfo(data);

    sendMessage(res, result, [msg, msg])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    //     console.log(result);
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg,
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg,
    //         data: result
    //     })
    // }
}

updateInfo = async (req, res, next) => {
    let data = req.body;
    console.log(data);

    let result = await info.updateInfo(data);

    sendMessage(res, result, ["信息修改成功！", '信息修改失败！'], ['create_time', 'last_modify_time'])

    // if(result.errno){
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍后再试！',
    //         data: result
    //     })
    // } else if (result.affectedRows === 1){
    //     res.send({
    //         status: "success",
    //         msg: "信息修改成功！",
    //         data: result
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '信息修改失败！',
    //         data: result
    //     })
    // }
}

deleteInfo = async (req, res, next) => {
    let data = req.body;
    console.log(data);

    let result = await info.delete(data);

    sendMessage(res, result, ["恭喜您！删除成功！！", '哎呀，删除失败！'], ['create_time', 'last_modify_time'])

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

module.exports = {
    queryInfo,
    queryInfoByUser,
    queryAll,
    queryAllInfo,
    queryAllDraft,
    insertInfo,
    updateInfo,
    delete: deleteInfo
}
