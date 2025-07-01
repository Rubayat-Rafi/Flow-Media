const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller.js');

router.post('/category', categoryController.categories);
router.get('/categorys', categoryController.allCategorys)
router.delete('/delete/:id', categoryController.categoryDelete);

module.exports = router;
