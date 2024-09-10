import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Header = ({ black }) => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Atualiza o estado com base no caminho da URL
        setActivePage(location.pathname);
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                <img src="/images/user-icon.jpeg" alt="user" onClick={toggleMenu} />
                <div className="user-menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <div className={`user-menu ${menuOpen ? 'show' : ''} `}>
                    <Link to="/profile" className="user-menu-item">Editar Perfil</Link>
                    <div className="user-menu-item">Sair</div>
                </div>
            </div>
        </header> 
    );
};

export default Header;
