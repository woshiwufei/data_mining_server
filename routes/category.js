const express = require('express');
const router = express.Router();
const category = require('../controller/category')

router.get('/query', category.query)
router.post('/query_test', category.query_test)
router.post('/insert', category.insert)
router.post('/delete', category.delete)

module.exports = router