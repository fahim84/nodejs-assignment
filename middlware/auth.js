const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

function generateToken(id) {
    return jwt.sign(id, process.env.SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

function authMiddleware(req, res, next) {
    if (req.path === '/login' || req.path === '/sign-up') {
        return next();
    }

    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const authToken = token.replace('Bearer ', '');
    try {
        res.locals.token = verifyToken(authToken);
        return next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function adminCheckMiddleware(req, res, next) {
    try {
        const data = await User.findById(res.locals.token._id, 'role');
        if (data.role === 'End User') {
            res.status(401).json({ message: 'Unauthorized access, End user not allowed' });
        }
        if (data.role === 'Admin') {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

module.exports = {
    generateToken,
    verifyToken,
    authMiddleware,
    adminCheckMiddleware,
};
