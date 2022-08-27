const express = require('express');
const router = express.Router();

const comment = require('../controller/comment')

router.post('/insert', comment.insert)
router.post('/delete', comment.delete)
router.post('/queryByMsgId', comment.queryByMsgId)
router.post('/updateLikeCount', comment.updateLikeCount)

module.exports = router