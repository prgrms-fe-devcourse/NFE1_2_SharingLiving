import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="headPrimary">
            <div className="header-nav-area">
                <h1 id="logoMain">
                    <img src="" alt="나누리빙 로고" />
                </h1>

                <nav id="navPrimary">
                    <ul className="nav-list fullscreen">
                        <li className="nav-item">
                            <Link to="/login">로그인</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="header-user-area">
                placeholder
                {/* User 컴포넌트 필요 - 로그인 상태에 따라 변경되어야 함 */}
            </div>
        </header>
    );
};

export default Header;