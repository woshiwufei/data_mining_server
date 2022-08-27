const express = require('express');
const router = express.Router();

const info = require('../controller/info')

router.post('/queryInfoById', info.queryInfo)
router.post('/queryInfoByUser', info.queryInfoByUser)
router.post('/queryAll', info.queryAll)
router.get('/queryAllInfo', info.queryAllInfo)
router.get('/queryAllDraft', info.queryAllDraft)
router.post('/insertInfo', info.insertInfo)
router.post('/updateInfo', info.updateInfo)
router.post('/delete', info.delete)


module.exports = router