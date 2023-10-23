const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(id) {
    return jwt.sign(id, process.env.SECRET, { expiresIn: '60s' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET)
}

function authMiddleware(req, res, next) {
    if (req.path === '/login') {
        return next();
    }

    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const authToken = token.replace('Bearer ', '');
    try {
        verifyToken(authToken);
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = { generateToken, verifyToken, authMiddleware }