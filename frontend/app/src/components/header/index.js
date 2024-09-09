import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './header.css';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ black }) => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        // Atualiza o estado com base no caminho da URL
        setActivePage(location.pathname);
    }, [location]);

    return (
        <header className={black ? 'black' : ''}>
            <div className="header-logo">
                <img src="/images/logo-verzelflix.png" alt="verzelflix"/>
                <div className="nav-menu">
                    <ul>
                        <li>
                            <a 
                                href="/home" 
                                className={`nav-link ${activePage.includes('/home') ? '' : 'inactive'}`} 
                                data-page="home"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/favorites" 
                                className={`nav-link ${activePage.includes('/favorites') ? '' : 'inactive'}`} 
                                data-page="favorites"
                            >
                                <span className="span-meus-favoritos">Meus</span> Favoritos
                            </a>
                        </li>
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
