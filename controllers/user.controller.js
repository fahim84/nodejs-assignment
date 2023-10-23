const User = require("../models/user.model");
const { generateToken, verifyToken } = require("../middlware/auth")
async function getUsers(req, res) {
    try {
        const data = await User.find({}, "userName");
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}
async function getUser(req, res) {
    try {
        id = req.params.id
        const data = await User.findById(id, "userName");
        if (!data) {
            res.send("User not found");
        } else {
            res.send(data);
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function createUser(req, res) {
    userData = req.body
    try {
        const data = await User.create(userData);
        res.send("New user created with id:" + data._id);
    } catch (err) {
        console.log(err);
        res.send(err._message);
    }
}

async function deleteUser(req, res) {
    id = req.params.id;
    try {
        const data = await User.findByIdAndDelete(id);
        if (data) {
            res.send("User deleted with id: " + data._id);
        } else {
            res.send("User not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function updateUser(req, res) {
    id = req.params.id;
    userData = req.body
    try {
        const data = await User.findByIdAndUpdate(id, userData);
        if (data) {
            res.send("User with id:" + data._id + " is updated.");
        } else {
            res.send("User not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function userLogin(req, res) {
    userData = req.body
    try {
        const data = await User.exists({ userName: userData.client_id, password: userData.client_secret });
        if (data) {
            res.send(generateToken(data));
        } else {
            res.send("Invalid username or password.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}
module.exports = { getUsers, getUser, createUser, deleteUser, updateUser, userLogin }