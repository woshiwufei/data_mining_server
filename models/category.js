const connectionPool = require("../util/pool");
const category = {
    queryCategory: "select SQL_CALC_FOUND_ROWS * from category where category_id = ? or category_name = ? or category_path = ?",
    queryAllCategory: "select SQL_CALC_FOUND_ROWS * from category",
    insertCategory: "insert into category (category_name, category_path) values (?, ?)",
    deleteCategory: "delete from category where category_id = ?",
};

queryCategory = async (data) => {
    // console.log("...", data);
    const {category_name, category_path, category_id} = data;
    // console.log(typeof(category_name), typeof(category_path));
    let result = await connectionPool.query(category.queryCategory, [category_id, category_name, category_path]).catch(error => {
        console.log("config queryCategory", error);
        return error;
    });
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
    }
}

queryAllCategory = async () => {
    let result = await connectionPool.query(category.queryAllCategory).catch(error => {
        console.log("config queryAllCategory", error);
        return error;
    });
    let total = await connectionPool.query('select found_rows()').catch(error => error)
    return {
        data: result,
        total: total[0]['found_rows()'],
    }
}

insertCategory = async (data) => {
    const {category_name, category_path} = data;
    return await connectionPool.query(category.insertCategory, [category_name, category_path]).catch((error) => {
        console.log("insertCategory", error);
        return error
    })
}

deleteCategory = async (data) => {
    console.log(data, "***");
    const {category_id} = data;
    return await connectionPool.query(category.deleteCategory, category_id).catch(error => {
        console.log("config deleteCategory", error);
        return error;
    });
}

module.exports = {
    queryAllCategory,
    insertCategory,
    queryCategory,
    deleteCategory,
};
