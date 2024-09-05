const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], // Referência para o modelo Movie
  sharedLinkToken: { type: String },
  sharedLinkExpires: { type: Date },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
