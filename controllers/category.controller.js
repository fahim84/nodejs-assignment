const Category = require("../models/category.model");
async function getCategories(req, res) {
    try {
        const data = await Category.find();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function createCategory(req, res) {
    categoryData = req.body
    try {
        const data = await Category.create(categoryData);
        res.send("New category created with id:" + data._id);
    } catch (err) {
        console.log(err);
        res.send(err._message);
    }
}

async function deleteCategory(req, res) {
    id = req.params.id;
    try {
        const data = await Category.findByIdAndDelete(id);
        if (data) {
            res.send("Category deleted with id: " + data._id);
        } else {
            res.send("Category not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function updateCategory(req, res) {
    id = req.params.id;
    categoryData = req.body
    try {
        const data = await Category.findByIdAndUpdate(id, categoryData);
        if (data) {
            res.send("Category with id:" + data._id + " is updated.");
        } else {
            res.send("Category not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}
module.exports = { getCategories, createCategory, deleteCategory, updateCategory }