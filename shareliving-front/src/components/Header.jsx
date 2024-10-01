import { useState } from 'react';

import LogoImage from '../assets/images/logo.png';
import UserControlls from './UserControlls';
import ShareModal from './ShareModal';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileNavOn, setNavStatus] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <header id="headPrimary">
                <div className="header-nav-area fullscreen">
                    <Link to="/">
                        <h1 id="logoMain">
                            <img src={ LogoImage } alt="로고" />
                        </h1>
                    </Link>

                    <nav id="navPrimary">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to="/">제품 나눔</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/">지식 나눔</Link>
                            </li>

                            <li className="nav-item" onClick={ openModal }>나눔하기</li>

                            <li className="nav-item">
                                <Link to="/mypage">마이 페이지</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="mobile-burger">
                    버거 버튼
                </div>

                <UserControlls /> { /** 로그인 상태에 따라 변경되어야 함 */ }
            </header>

            { isModalOpen && <ShareModal closeModal={ closeModal } /> }
        </>
    );
};

export default Header;