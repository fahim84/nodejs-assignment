const express = require('express');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller');

const router = express.Router();
const { adminCheckMiddleware } = require('../middlware/auth');

router.get('/list', (req, res) => {
    getCategories(req, res);
});

router.post('/', adminCheckMiddleware, (req, res) => {
    createCategory(req, res);
});

router.delete('/:id', adminCheckMiddleware, (req, res) => {
    deleteCategory(req, res);
});

router.patch('/:id', adminCheckMiddleware, (req, res) => {
    updateCategory(req, res);
});

module.exports = router;
