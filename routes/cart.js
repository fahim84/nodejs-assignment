const express = require('express');
const {
    getCart,
    createCart,
    updateCart,
    deleteCart,
    checkoutCart,
} = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', (req, res) => {
    getCart(req, res);
});

router.post('/', (req, res) => {
    createCart(req, res);
});

router.post('/checkout/:id', (req, res) => {
    checkoutCart(req, res);
});

router.delete('/:id', (req, res) => {
    deleteCart(req, res);
});

router.patch('/:id', (req, res) => {
    updateCart(req, res);
});

module.exports = router;
