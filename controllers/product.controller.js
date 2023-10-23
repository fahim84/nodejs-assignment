const Product = require('../models/product.model');
const Category = require('../models/category.model');

async function getProducts(req, res) {
    try {
        const data = await Product.find().lean();
        if (data !== undefined && data.length !== 0) {
            for (const product of data) {
                if (product.category) {
                    const categoryName = await getCategoryName(product.category);
                    product.category = categoryName;
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

async function createProduct(req, res) {
    const productData = req.body;
    try {
        const data = await Product.create(productData);
        res.send(`New product created with id:${data._id}`);
    } catch (err) {
        console.log(err);
        res.send(err._message);
    }
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        const data = await Product.findByIdAndDelete(id);
        if (data) {
            res.send(`Product deleted with id: ${data._id}`);
        } else {
            res.send('Product not found.');
        }
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
}

async function updateProduct(req, res) {
    const id = req.params.id;
    const productData = req.body;
    try {
        const data = await Product.findByIdAndUpdate(id, productData);
        if (data) {
            res.send(`Product with id:${data._id} is updated.`);
        } else {
            res.send('Product not found.');
        }
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
}

async function searchProduct(req, res) {
    const productData = req.body;
    const searchData = {};

    if (productData.title) {
        searchData.title = productData.title;
    }
    if (productData.description) {
        searchData.description = productData.description;
    }

    if (productData.category) {
        try {
            const categoryId = await getCategoryId(productData.category);
            if (categoryId) {
                searchData.category = categoryId;
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
        }
    }

    if (Object.keys(searchData).length === 0) {
        res.send('Please enter product details to search for products.');
        return;
    }
    try {
        const data = await Product.find(searchData).lean();
        if (data !== undefined && data.length !== 0) {
            for (const product of data) {
                if (product.category) {
                    const categoryName = await getCategoryName(product.category);
                    product.category = categoryName;
                }
            }
            res.send(data);
        } else {
            res.send('No Product(s) match your search criteria.');
        }
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}

async function getCategoryName(categoryId) {
    try {
        const category = await Category.findById(categoryId);
        if (category) {
            return category.category_name;
        }
        return null;
    } catch (err) {
        console.log(err);
        throw new Error('Error while fetching category name.');
    }
}

async function getCategoryId(categoryName) {
    try {
        const category = await Category.findOne({ category_name: categoryName });
        if (category) {
            return category._id;
        }
        return null;
    } catch (err) {
        console.log(err);
        throw new Error('Error while fetching category ID.');
    }
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    searchProduct,
};
