var express = require('express');
const Cart = require('../models/cart.model');
const { getCart, createCart, updateCart, deleteCart, checkoutCart } = require('../controllers/cart.controller');
var router = express.Router();

router.get('/', function(req, res) {
    getCart(req, res);
});

router.post('/', function(req, res) {
    createCart(req, res);
});

router.post('/checkout/:id', function(req, res) {
    checkoutCart(req, res);
});

router.delete('/:id', function(req, res) {
    deleteCart(req, res);
});

router.patch('/:id', function(req, res) {
    updateCart(req, res);
});

module.exports = router;