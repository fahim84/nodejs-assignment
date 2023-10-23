const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
});
const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
