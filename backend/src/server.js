const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const connectDB = require('./config/db');
const movieRouter = require('./routes/movies');
const favoriteRouter = require('./routes/favorites');
const sharedFavoritesRouter = require('./routes/sharedFavorites');

connectDB();

app.use(express.json());

app.use(favoriteRouter);
app.use(usersRouter);
app.use(movieRouter);
app.use(sharedFavoritesRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});