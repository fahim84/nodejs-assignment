const express = require('express');
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
} = require('../controllers/product.controller');

const router = express.Router();
const { adminCheckMiddleware } = require('../middlware/auth');

router.get('/', (req, res) => {
    getProducts(req, res);
});

router.post('/search', (req, res) => {
    searchProduct(req, res);
});

router.post('/', adminCheckMiddleware, (req, res) => {
    createProduct(req, res);
});

router.delete('/:id', adminCheckMiddleware, (req, res) => {
    deleteProduct(req, res);
});

router.patch('/:id', adminCheckMiddleware, (req, res) => {
    updateProduct(req, res);
});

module.exports = router;
