const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UserController');

// Login do usuário
router.post('/login', usersController.login);

// Registrar um novo usuário
router.post('/register', usersController.register);

// Atualizar um usuário pelo nome de usuário
router.put('/user/:username', usersController.updateUserByUsername);

// Buscar um usuário pelo e-mail
router.get('/user/:username', usersController.getUserByUsername);

// Apagar um usuário pelo e-mail
router.delete('/user/:email', usersController.deleteUserByEmail);

module.exports = router;
