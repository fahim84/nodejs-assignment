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
    await userExists(userData, req, res)
    try {
        const data = await User.create(userData);
        res.send("New user created with id:" + data._id);
    } catch (err) {
        console.log(err);
        res.send(err._message);
    }
}

async function userExists(userData, req, res) {
    try {
        const userName = await User.exists({ userName: userData.userName });
        if (userName) {
            res.send("User name already exists.")
        }
        const userEmail = await User.exists({ userEmail: userData.userEmail });
        if (userEmail) {
            res.send("Email already exists associated with another account.")
        }
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

async function getUserFromToken(req, res) {
    const token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
        const authToken = token.replace('Bearer ', '');
        tokenData = verifyToken(authToken);
        user = await User.findById(tokenData._id);

        return user
    }
}

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser, userLogin, getUserFromToken }