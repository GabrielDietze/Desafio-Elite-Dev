
import React from 'react';
import './FavoriteButton.css'; // Importa o CSS do botão

const FavoriteButton = ({ itemId }) => {
  return (
    <a href={`/favorites/${itemId}`} className="FavoriteButton">
      + Adicionar Aos Favoritos
    </a>
  );
};

export default FavoriteButton;
