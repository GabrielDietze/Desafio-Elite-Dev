const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const connectDB = require('./config/db');
const movieRouter = require('./routes/movies');
const favoriteRouter = require('./routes/favorites');
const sharedFavoritesRouter = require('./routes/SharedFavorites');

connectDB();

app.use(express.json());

app.use(favoriteRouter);
app.use(usersRouter);
app.use(movieRouter);
app.use(sharedFavoritesRouter);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});