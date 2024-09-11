const User = require('../models/user');

// Buscar a lista de favoritos de um usuário
exports.index = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ favoriteMovies: user.favoriteMovies });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

// Adicionar um filme à lista de favoritos
exports.store = async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ error: 'Filme já está na lista de favoritos' });
    }

    user.favoriteMovies.push(movieId);
    await user.save();

    res.status(200).json({ message: 'Filme adicionado aos favoritos' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar filme aos favoritos' });
  }
};

// Remover um filme da lista de favoritos
exports.delete = async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const index = user.favoriteMovies.indexOf(movieId);
    if (index === -1) {
      return res.status(400).json({ error: 'Filme não está na lista de favoritos' });
    }

    user.favoriteMovies.splice(index, 1);
    await user.save();

    res.status(200).json({ message: 'Filme removido dos favoritos' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover filme dos favoritos' });
  }
};
