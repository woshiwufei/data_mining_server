const express = require('express');
const router = express.Router();
const chapter = require('../controller/chapter')

router.get('/query', chapter.query)
router.post('/insert', chapter.insert)
router.post('/update', chapter.update)
router.post('/delete', chapter.delete)

module.exports = router