const mongoose = require('mongoose');

// Definição do esquema para o modelo Movie
const movieSchema = new mongoose.Schema({
    //titulo do filme
  title: {
    type: String,
    required: true
  },
  //descrição
  overview: {
    type: String,
    required: false
  },
  //data de lançamento
  release_date: {
    type: Date,
    required: false
  },
  //classificação do filme
  rating: {
    type: Number,
    required: false
  },
  //trailer
  trailer: {
    type: String,
    required: false
  },
  //genero
  genre: {
    type: [String], // Array de strings para armazenar múltiplos gêneros
    required: false
  },
  //duração
  duration: {
    type: Number, // Duração em minutos
    required: false
  }
});

// Criação do modelo com base no esquema
const Movie = mongoose.model('Movie', movieSchema);

// Exportação do modelo para ser usado em outros arquivos
module.exports = Movie;
