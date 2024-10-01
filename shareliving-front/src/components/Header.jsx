// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="headPrimary">
            <div className="header-nav-area">
                <h1 id="logoMain">
                    <img src="/img/MainLogo.png" alt="나누리빙 로고" />
                </h1>
                <nav id="navPrimary">
                    <ul className="nav-list fullscreen">
                        <li className="nav-item">
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;