const express = require('express')
const router = express.Router()
const message = require('../controller/message')

router.post('/query', message.query)
router.post('/queryAll', message.queryAll)
router.post('/updateViewCount', message.updateViewCount)
router.post('/insert', message.insert)
router.post('/delete', message.delete)

module.exports = router