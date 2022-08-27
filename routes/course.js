const express = require('express');
const router = express.Router();
const course = require('../controller/course')

router.post('/query', course.query)
router.post('/queryByChapterId', course.queryByChapterId)
router.post('/insert', course.insert)
router.post('/update', course.update)

module.exports = router