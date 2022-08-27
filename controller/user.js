// const express = require('express');
// const router = express.Router();
// const connectionPool = require('../util/pool')

const user = require('../models/user')
const sendMessage = require("../util/sendMessage");

login = async function (req, res, next) {
    let params = req.body;
    let {password} = req.body

    let result = await user.query(params)

    if(result.data[0].password === password){
            res.send({
                status: 'success',
                msg: '登录成功！',
                ...result
            })
    } else {
            res.send({
                status: 'error',
                msg: '用户名或密码错误，请重新输入',
                ...result
            })
        res.end()
    }
    // sendMessage(res, result, ["登录成功！", '用户名或密码错误，请重新输入'])

    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍候再试！',
    //         data: result
    //     })
    // } else if (result.length) {
    //     const tokenData = {...result[0]}
    //     res.send({
    //         status: 'success',
    //         msg: '登录成功！',
    //         data: tokenData
    //     })
    // } else {
    //     res.send({
    //         status: 'error',
    //         msg: '用户名或密码错误，请重新输入',
    //         data: result
    //     })
    // }
}

insert = async function (req, res, next) {
    let params = req.body;
    let result = await user.query(params)
    if (result.errno) {
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍候再试！',
            data: result
        })
    } else if (result.length) {
        res.send({
            status: "error",
            msg: "此用户名已存在,请重新输入!",
        });
    } else {
        result = await user.insert(params)
        if (result.errno) {
            res.send({
                status: 'error',
                msg: '注册失败！请重试...',
                data: result
            })
        } else {
            res.send({
                status: 'success',
                msg: '注册成功！',
                data: result
            })
        }
    }
    // console.log(result);
}

deleteUser = async function (req, res, next) {
    let params = req.body;
    let result = await user.query(params)
    if (result.errno) {
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍候再试！',
            data: result
        })
    } else if (!result.length) {
        res.send({
            status: "error",
            msg: "此用户不存在!",
            data: result
        });
    } else {
        result = await user.delete(params)
        if (result.errno) {
            res.send({
                status: 'error',
                msg: '删除用户失败，请重试！',
                data: result
            })
        } else {
            res.send({
                status: 'success',
                msg: '用户删除成功！',
                data: result
            })
        }
    }
    console.log(result);

}

queryAllUser = async function (req, res, next) {
    let result = await user.queryAllUser()
    if(result.errno){
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍候再试！',
            data: result
        })
    } else if (result.total) {
        let data = []
        result.data.forEach(item => {
            item.register_time = item.register_time.toLocaleString()
            delete item.password
            data.push(item);
        })

        res.send({
            status: 'success',
            msg: '查询所有用户成功！',
            data,
        })
    } else {
        res.send({
            status: 'error',
            msg: '现在还没有用户存在！',
            data: result
        })
    }
}


module.exports = {
    login,
    insert,
    queryAllUser,
    delete: deleteUser,
}