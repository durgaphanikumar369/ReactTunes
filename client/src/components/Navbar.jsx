import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    <i className="fas fa-music"></i>
                    <span>React Tunes</span>
                </Link>
                <div className="nav-links">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </Link>
                    <button 
                        onClick={handleSearchClick}
                        className={`nav-link search-button ${location.pathname === '/search' ? 'active' : ''}`}
                    >
                        <i className="fas fa-search"></i>
                        <span>Search</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 