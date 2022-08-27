const category = require("../config/category")
const sendMessage = require("../util/sendMessage");

insert = async function (req, res, next) {
    // 首先根据类别名,类别路径查询是否存在这个类别
    let data = req.body;
    console.log(data);
    let result = await category.queryCategory(data)
    if (result.errno) {
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍候再试！',
            data: result
        })
        res.end()
    } else if (result.length) {
        res.send({
            status: 'error',
            msg: '此类别已存在！',
            data: result
        })
    } else {
        result = await category.insertCategory(data)
        if (result.errno) {
            res.status(500).send({
                status: 'error',
                msg: '出错啦...请稍候再试！',
                data: result
            })
        }

        res.send({
            status: 'success',
            msg: '类别添加成功！',
            data: result
        })
    }
}

query = async function (req, res, next) {
    let result = await category.queryAllCategory();

    sendMessage(res, result, ["查询所有类别成功！", '当前还不存在分类！'])


    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍候再试！',
    //         data: result
    //     })
    // }
    //
    // res.send({
    //     status: 'success',
    //     msg: '查询所有类别成功！',
    //     data: result
    // })
}

query_test = async function (req, res, next) {
    let data = req.body;
    let result = await category.queryCategory(data)

    sendMessage(res, result, ["查询类别成功！", '不存在此类别！'])


    // if (result.errno) {
    //     res.status(500).send({
    //         status: 'error',
    //         msg: '出错啦...请稍候再试！',
    //         data: result
    //     })
    // }
    //
    // res.send({
    //     status: 'success',
    //     msg: '查询成功！',
    //     data: result
    // })
}

deleteCategory = async function (req, res, next) {
    let data = req.body;
    let result = await category.queryCategory(data)

    if (result.errno) {
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍候再试！',
            data: result
        })
    } else if (result.length) {
        let result = await category.deleteCategory(data)

        if (result.errno) {
            res.status(500).send({
                status: 'error',
                msg: '出错啦...请稍候再试！',
                data: result
            })
        } else {
            res.send({
                status: 'success',
                msg: '类别删除成功！',
                data: result
            })
        }
    } else {
        res.send({
            status: 'error',
            msg: "此分类不存在！",
            data: result,
        })
    }
}

module.exports = {
    query,
    insert,
    query_test,
    delete: deleteCategory,
}