const time_Formatter = require("./timeFormat");


const sendMessage = (res, result, msg, timeRevert) => {
    //params res: response
    //params result: object returned by database operation
    //params msg: array, contains success msg and error message
    //params timeRevert: array, contains time needed format

    if(result.errno){
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍后再试！',
            data: result
        })
    } else if (result.total || result.affectedRows){
        if (timeRevert&&timeRevert.length){
            time_Formatter(result.data || result, timeRevert)
        }
        res.send({
            status: "success",
            msg: msg[0],
            ...result
        })
    } else {
        res.send({
            status: 'error',
            msg: msg[1],
            data: result
        })
    }
}

module.exports = sendMessage
