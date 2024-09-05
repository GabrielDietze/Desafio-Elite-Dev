const express = require('express');
const router = express.Router();
const User = require('../models/user');
const movie = require('../models/movie');

// Adicionar um filme à lista de favoritos
router.post('/favorites', async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    // Encontre o usuário
    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifique se o filme já está na lista de favoritos
    if (user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ error: 'Filme já está na lista de favoritos' });
    }

    // Adicione o filme à lista de favoritos do usuário
    user.favoriteMovies.push(movieId);
    await user.save();

    res.status(200).json({ message: 'Filme adicionado aos favoritos' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar filme aos favoritos' });
  }
});

// Remover um filme da lista de favoritos
router.delete('/favorites', async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    // Encontre o usuário
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifique se o filme está na lista de favoritos
    const index = user.favoriteMovies.indexOf(movieId);
    if (index === -1) {
      return res.status(400).json({ error: 'Filme não está na lista de favoritos' });
    }

    // Remova o filme da lista de favoritos do usuário
    user.favoriteMovies.splice(index, 1);
    await user.save();

    res.status(200).json({ message: 'Filme removido dos favoritos' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover filme dos favoritos' });
  }
});

module.exports = router;
