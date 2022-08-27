const express = require('express');
const router = express.Router();
// const connectionPool = require('../util/pool')
const user = require('../controller/user')

/* GET users listing. */
// router.get('/login', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/login", user.login);
router.post("/register", user.insert);
router.post("/delete", user.delete);
router.get("/queryAllUser", user.queryAllUser);


module.exports = router;
