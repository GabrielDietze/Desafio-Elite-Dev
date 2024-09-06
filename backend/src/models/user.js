const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Converte o e-mail para minúsculas
    trim: true,      // Remove espaços em branco ao redor do e-mail
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovies: [{ type: String, ref: 'Movie' }], // Referência para o modelo Movie
  sharedLinkToken: { type: String },
  sharedLinkExpires: { type: Date },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
