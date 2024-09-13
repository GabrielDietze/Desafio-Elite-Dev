import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Voltar uma página na história
  };

  return (
    <button onClick={handleClick} className="back-button">
      
      <ArrowBackIcon />

    </button>
  );
};

export default BackButton;
