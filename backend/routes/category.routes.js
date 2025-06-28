const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller.js');

router.post('/category', categoryController.categories);
router.get('/categorys', categoryController.allCategorys)

module.exports = router;
