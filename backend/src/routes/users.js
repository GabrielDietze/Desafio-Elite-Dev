const express = require('express');
const bcrypt = require('bcryptjs'); // Para hashear a senha
const User = require('../models/user');
const router = express.Router();

// Registrar um novo usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário já existe
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criar uma nova instância de usuário
    user = new User({ username, password });

    // Hashear a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salvar o usuário no banco de dados
    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Buscar um usuário pelo nome de usuário
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    // Encontrar o usuário pelo nome de usuário
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Apagar um usuário pelo nome de usuário
router.delete('/user/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    // Encontrar e remover o usuário pelo nome de usuário
    const user = await User.findOneAndDelete({ username });
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    
    res.json({ msg: 'Usuário removido com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
