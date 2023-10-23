var express = require('express');
const User = require('../models/user.model');
const { getUsers, getUser, createUser, updateUser, deleteUser, userLogin } = require('../controllers/user.controller');
var router = express.Router();

router.get('/list', function(req, res) {
    getUsers(req, res);
});

router.get('/:id', function(req, res) {
    getUser(req, res);
});

router.post('/', function(req, res) {
    createUser(req, res);
});

router.delete('/:id', function(req, res) {
    deleteUser(req, res);
});

router.patch('/:id', function(req, res) {
    updateUser(req, res);
});

router.post('/login', function(req, res) {
    userLogin(req, res);
});
router.post('/sign-up', function(req, res) {
    createUser(req, res);
});

module.exports = router;