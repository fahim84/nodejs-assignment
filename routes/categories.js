var express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
var router = express.Router();
const { adminCheckMiddleware } = require('../middlware/auth');

router.get('/list', function(req, res) {
    getCategories(req, res);
});

router.post('/', adminCheckMiddleware, function(req, res) {
    createCategory(req, res);
});

router.delete('/:id', adminCheckMiddleware, function(req, res) {
    deleteCategory(req, res);
});

router.patch('/:id', adminCheckMiddleware, function(req, res) {
    updateCategory(req, res);
});

module.exports = router;