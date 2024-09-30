import { useState } from 'react';
import LogoImage from '../assets/images/logo.png';
import UserControlls from './UserControlls';
import ShareModal from './ShareModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <header id="headPrimary">
                <div className="header-nav-area fullscreen">
                    <h1 id="logoMain">
                        <img src={LogoImage} alt="로고" />
                    </h1>

                    <nav id="navPrimary">
                        <ul className="nav-list">
                            <li className="nav-item">제품 나눔</li>
                            <li className="nav-item">지식 나눔</li>
                            <li className="nav-item" onClick={ openModal }>나눔하기</li>
                            <li className="nav-item need-auth">마이 페이지</li>
                        </ul>
                    </nav>
                </div>

                <div className="header-user-area">
                    placeholder
                </div>
            </header>

            <UserControlls /> { /** 로그인 상태에 따라 변경되어야 함 */ }

            {isModalOpen && <ShareModal closeModal={closeModal} />}
        </>
    );
};

export default Header;