const timeFormat = dateTime => dateTime.toLocaleString()

const time_Formatter = function (dataList, args){
    console.log(args);
    dataList.forEach(item => {
        args.forEach(arg => {
            item[arg] = timeFormat(item[arg])
        })
    })
}

module.exports = time_Formatter