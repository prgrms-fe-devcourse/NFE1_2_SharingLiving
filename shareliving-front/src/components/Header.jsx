import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import LogoImage from '../assets/images/logo.png';
import UserControlls from './UserControlls';
import ShareModal from './ShareModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileNavOn, setNavStatus] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNav = () => {
    let current = isMobileNavOn;

    setNavStatus(!current);

    console.log(isMobileNavOn);
  }

  return (
    <>
      <header id="headPrimary">
        <div className="header-nav-area fullscreen">
          <NavLink to="/">
            <h1 id="logoMain">
              <img src={ LogoImage } alt="로고" />
            </h1>
          </NavLink>

          <nav id="navPrimary">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/product">제품 나눔</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/knowledge">지식 나눔</NavLink>
              </li>

              <li className="nav-item" onClick={ openModal }>
                나눔하기
              </li>

              <li className="nav-item">
                <NavLink to="/mypage">마이 페이지</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <button type="button" className="mobile-burger" onClick={ handleNav }>
          <span className="burger-stripe top"></span>
          <span className="burger-stripe middle"></span>
          <span className="burger-stripe bottom"></span>
        </button>

        <UserControlls /> { /** 로그인 상태에 따라 변경되어야 함 */ }
      </header>

      <aside id="navToggle" className={ isMobileNavOn === true ? 'on' : null }>
        <div>
          <p>모바일</p>
          <button type="button" onClick={ () => setNavStatus(false) }>닫기</button>
        </div>
      </aside>

      { isModalOpen && <ShareModal closeModal={ closeModal } /> }
    </>
  );
};

export default Header;