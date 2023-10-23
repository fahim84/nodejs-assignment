const nodemailer = require('nodemailer');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { getUserFromToken } = require('./user.controller');
require('dotenv').config();

async function getCart(req, res) {
    try {
        const data = await Cart.find().lean();
        if (data !== undefined && data.length !== 0) {
            for (const cart of data) {
                for (const cartProducts of cart.cartProducts) {
                    if (cartProducts.productId) {
                        const productName = await getProductName(cartProducts.productId);
                        cartProducts.productName = productName;
                    }
                }
            }
            res.send(data);
        } else {
            res.send('Sorry no Products found');
        }
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
}

async function createCart(req, res) {
    let cartData = req.body;
    try {
        cartData = await validateProducts(cartData);
        const data = await Cart.create(cartData);
        res.send(`New cart created with id:${data._id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function deleteCart(req, res) {
    const id = req.params.id;
    try {
        const data = await Cart.findByIdAndDelete(id);
        if (data) {
            res.send(`Cart deleted with id: ${data._id}`);
        } else {
            res.send('Cart not found.');
        }
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
}

async function updateCart(req, res) {
    const id = req.params.id;
    let cartData = req.body;

    try {
        cartData = await validateProducts(cartData);
        const data = await Cart.findByIdAndUpdate(id, cartData);
        if (data) {
            res.send(`Cart with id:${data._id} is updated.`);
        } else {
            res.send('Cart not found.');
        }
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
}

async function validateProducts(cartData) {
    try {
        const validCartProducts = [];
        for (const cartProduct of cartData.cartProducts) {
            const product = await Product.findById(cartProduct.productId, 'available_quantity');
            if (product) {
                cartProduct.quantity = cartProduct.quantity > product.available_quantity ? product.available_quantity : cartProduct.quantity;
                validCartProducts.push(cartProduct);
            }
        }
        cartData.cartProducts = validCartProducts;

        return cartData;
    } catch (error) {
        console.error('Error validating products:', error.message);
    }
}

async function getProductName(productId) {
    try {
        const product = await Product.findById(productId);
        if (product) {
            return product.title;
        }
        return null;
    } catch (err) {
        console.log(err);
        throw new Error('Error while fetching Product name.');
    }
}

async function checkoutCart(req, res) {
    const cartId = req.params.id;
    try {
        const cart = await Cart.findById(cartId).lean();

        if (!cart) {
            return res.status(404).send('Cart not found.');
        }

        let totalPrice = 0;
        for (const cartProduct of cart.cartProducts) {
            const product = await Product.findById(cartProduct.productId).lean();
            if (product) {
                totalPrice += product.price * cartProduct.quantity;
            }
        }
        const user = await getUserFromToken(req);
        if (user === null) {
            throw new Error('User not Found.');
        }
        for (const cartProduct of cart.cartProducts) {
            const product = await Product.findById(cartProduct.productId);
            if (product) {
                product.available_quantity -= cartProduct.quantity;
                await product.save();
            }
        }

        await Cart.findByIdAndDelete(cartId);

        await sendOrderConfirmationEmail(user, totalPrice, cart.cartProducts);

        res.send('Order placed successfully.');
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function sendOrderConfirmationEmail(user, totalPrice, cartProducts) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NODE_MAILER_MAIL,
            pass: process.env.NODE_MAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.NODE_MAILER_MAIL,
        to: user.userEmail,
        subject: 'Order Confirmation',
        text: await getEmailContent(user, totalPrice, cartProducts),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

async function getEmailContent(user, totalPrice, cartProducts) {
    let emailContent = `Dear ${user.userName},\n\nThank you for your order!\n\nYour order details:\n`;

    for (const cartProduct of cartProducts) {
        const product = await Product.findById(cartProduct.productId);

        if (product) {
            emailContent += `\nProduct: ${product.title}\nQuantity: ${cartProduct.quantity}\n`;
        }
    }
    emailContent += `\nTotal Price: ${totalPrice}\n\nYour order has been placed successfully. We will process it soon and notify you when it's shipped.\n\nThank you for shopping with us!\n\nBest Regards,\nSystems LTD`;
    return emailContent;
}

module.exports = {
    getCart,
    createCart,
    deleteCart,
    updateCart,
    checkoutCart,
};
