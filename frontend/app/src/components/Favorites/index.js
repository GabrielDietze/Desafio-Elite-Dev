import Header from '../header'; 
import './favorites.css';
import BackButton from '../backbutton/BackButton.js';
import { Link } from 'react-router-dom';

const Favorite = (item) => {

  const typeofItem = (item) => {
    // Verifica se o item é uma série ou um filme
    return item.hasOwnProperty('number_of_seasons') ? 'tv' : 'movie';
  }

  return (
    <div className='favorites-page'>
   
      <Header /> 


    <section favorites-content>
      <div className='favorites-content'>
      <div className='nav-menu-favorite'>
      <div className='back-button'>
                <BackButton />
      </div>
      <button className='link-favorite'>Importar favoritos</button>
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
