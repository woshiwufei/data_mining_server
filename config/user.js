const connectionPool = require('../util/pool')

const user = {
  query: "select SQL_CALC_FOUND_ROWS * from user where user_name = ?",
  queryAllUser: "select SQL_CALC_FOUND_ROWS * from user",
  insert: "insert into user ( user_name, password, register_time, user_type) values ( ?, ?, ?, 1)",
  delete: "delete from user where user_id = ?",
};

query = async (data) => {
  const { username } = data;

  let result = await connectionPool.query(user.query, username).catch(error => {
    console.log("config query", error);
    return error;
  });
  let total = await connectionPool.query('select found_rows()').catch(error => error)
  return {
    data: result,
    total: total[0]['found_rows()'],
  }

};

queryAllUser = async () => {
  let result = await connectionPool.query(user.queryAllUser).catch(error => {
    console.log("config queryAllUser", error);
    return error;
  });
  let total = await connectionPool.query('select found_rows()').catch(error => error)
  return {
    data: result,
    total: total[0]['found_rows()'],
  }
};

insert = async (data) => {
  const { username, password } = data;
  let register_time = new Date()
  register_time = register_time.toLocaleString()

  return await connectionPool.query(user.insert, [username, password, register_time]).catch(error => {
    console.log("config insert", error);
    return error;
  });

};

deleteUser = async (data) => {
  const { user_id } = data;

  return await connectionPool.query(user.delete, user_id).catch(error => {
    console.log("config delete", error);
    return error;
  });
};

module.exports = {
  query,
  insert,
  queryAllUser,
  delete: deleteUser
}
