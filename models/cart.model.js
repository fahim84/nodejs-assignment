const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cartProducts: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            validate: {
                validator(value) {
                    return value >= 1;
                },
                message: 'Quantity must be equal to or greater than 1.',
            },
        },
    }],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
