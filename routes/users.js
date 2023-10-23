const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    userLogin,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/list', (req, res) => {
    getUsers(req, res);
});

router.get('/:id', (req, res) => {
    getUser(req, res);
});

router.post('/', (req, res) => {
    createUser(req, res);
});

router.delete('/:id', (req, res) => {
    deleteUser(req, res);
});

router.patch('/:id', (req, res) => {
    updateUser(req, res);
});

router.post('/login', (req, res) => {
    userLogin(req, res);
});
router.post('/sign-up', (req, res) => {
    createUser(req, res);
});

module.exports = router;
