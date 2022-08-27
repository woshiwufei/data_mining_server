//mysql连接池配置文件
// const mysql = require("mysql");
const mysql = require("mysql2");
const $dbConfig = require("../config/db"); //注意改成自己项目中mysql配置文件的路径
const co = require('co-mysql');

// 使用连接池，避免开太多的线程，提升性能
// const pool = mysql.createPool($dbConfig.mysql);
const pool = mysql.createPool($dbConfig);


/**
 * 对query执行的结果自定义返回JSON结果
 */
// function responseDoReturn(res, result, resultJSON) {
//   if (typeof result === "undefined") {
//     res.json({
//       code: "201",
//       msg: "failed to do",
//     });
//   } else {
//     res.json(result);
//   }
// }

/**
 * 封装query之sql带不占位符func
 */
// function query(sql, callback) {
//   pool.getConnection(function (err, connection) {
//     connection.query(sql, function (err, rows) {
//       callback(err, rows);
//       //释放链接
//       connection.release();
//     });
//   });
// }

/**
 * 封装query之sql带占位符func
 */
// function queryArgs(sql, args, callback) {
//   pool.getConnection(function (err, connection) {
//     connection.query(sql, args, function (err, rows) {
//       callback(err, rows);
//       //释放链接
//       connection.release();
//     });
//   });
// }

//exports
// module.exports = {
//   query: query,
//   queryArgs: queryArgs,
//   doReturn: responseDoReturn,
// };

module.exports = co(pool)
