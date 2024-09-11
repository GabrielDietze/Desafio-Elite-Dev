const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UserController');

// Login do usuário
router.post('/login', usersController.login);

// Registrar um novo usuário
router.post('/register', usersController.register);

// Buscar um usuário pelo e-mail
router.get('/user/:email', usersController.getUserByEmail);

// Apagar um usuário pelo e-mail
router.delete('/user/:email', usersController.deleteUserByEmail);

module.exports = router;
