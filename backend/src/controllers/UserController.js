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
        username: user.username,
        userId: user.id
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

    // Verificar se o nome de usuário já está em uso
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Nome de usuário já está em uso' });
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


// Buscar um usuário pelo nome de usuário
exports.getUserByUsername = async (req, res) => {
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
};

// Atualizar um usuário pelo nome de usuário
exports.updateUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { newUsername, email, password } = req.body;

  try {
      // Encontrar o usuário pelo nome de usuário atual
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Verificar se o novo nome de usuário já está em uso
      if (newUsername && newUsername !== username) {
          const existingUser = await User.findOne({ username: newUsername });
          if (existingUser) {
              return res.status(400).json({ message: 'Nome de usuário já em uso' });
          }
          user.username = newUsername;
      }

      // Verificar se o e-mail já está em uso
      if (email && email !== user.email) {
          const existingEmailUser = await User.findOne({ email });
          if (existingEmailUser) {
              return res.status(400).json({ message: 'E-mail já em uso' });
          }
          user.email = email;
      }

      // Atualizar a senha se fornecida
      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
      }

      await user.save();

      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      res.status(500).json({ message: 'Erro ao atualizar o usuário' });
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
