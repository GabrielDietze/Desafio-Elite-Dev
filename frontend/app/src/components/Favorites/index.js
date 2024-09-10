import React, { useState, useEffect } from 'react';
import Header from '../header'; 
import './favorites.css';
import BackButton from '../backbutton/BackButton.js';
import { Link } from 'react-router-dom';

const Favorite = (item) => {

  const [blackHeader, setBlackHeader] = useState(false);

  const typeofItem = (item) => {
    // Verifica se o item é uma série ou um filme
    return item.hasOwnProperty('number_of_seasons') ? 'tv' : 'movie';
  }

    //efeito para mudar a cor do header ao rolar a página
    useEffect(() => {
      const scrollListener = () => {
          if(window.scrollY > 10) {
              setBlackHeader(true);
          } else {
              setBlackHeader(false);
          }
      }

      window.addEventListener('scroll', scrollListener);

      return () => {
          window.removeEventListener('scroll', scrollListener);
      }
  }, []);

  return (
    <div className='favorites-page'>
   
      <Header black={blackHeader}/> 


    <section favorites-content>
      <div className='favorites-content'>
      <div className='nav-menu-favorite'>
      <div className='back-button'>
                <BackButton />
      </div>
      <button className='link-favorite'>Exportar favoritos</button>
      </div>
      
        <div className='favorites-list'>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}> 
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
          <div className='favorites-item'>
          <Link to={`/${typeofItem(item)}/${item.id}`}>
            <img src='https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg' alt='poster' />
          </Link>
          </div>
        </div>
         
          </div>  
    </section>
    </div>
  );
};

export default Favorite;
