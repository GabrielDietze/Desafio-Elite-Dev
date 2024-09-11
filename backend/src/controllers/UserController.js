const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Login do usuário
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha inválida' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Registrar um novo usuário
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar se o e-mail já está em uso
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'E-mail já está em uso' });
    }

    // Criar uma nova instância de usuário
    user = new User({ username, email, password });

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
};

// Buscar um usuário pelo e-mail
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Encontrar o usuário pelo e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Apagar um usuário pelo e-mail
exports.deleteUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Encontrar e remover o usuário pelo e-mail
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.json({ msg: 'Usuário removido com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};
