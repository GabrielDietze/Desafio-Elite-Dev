import React from "react";
import './header.css';
import SearchIcon from '@mui/icons-material/Search';

const Header = (black) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header-logo">
                <img src="/images/logo-verzelflix.png" alt="verzelflix"/>
                <div className="nav-menu">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/favorites"><span className="span-meus-favoritos">Meus</span> Favoritos</a></li>
                    </ul>
                </div>
            </div>
            <div className="header-search">
                <div>
                <SearchIcon className="search-icon" />
                </div>
                <input type="text" placeholder="Buscar"/>
            </div>
            <div className="header-user">
                <img src="/images/user-icon.jpeg" alt="user"/>
            </div>
        </header> 
    );
};

export default Header;
