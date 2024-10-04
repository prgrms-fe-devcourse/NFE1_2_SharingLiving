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

        <button type="button" id="btnBurger" className={ isMobileNavOn === true ? 'on' : null } onClick={ handleNav }>
          <span className="burger-stripe top"></span>
          <span className="burger-stripe middle"></span>
          <span className="burger-stripe bottom"></span>
        </button>

        <UserControlls /> { /** 로그인 상태에 따라 변경되어야 함 */ }
      </header>

      <aside id="navToggle" className={ isMobileNavOn === true ? 'on' : null }>
        <div id="toggleMenuTitlebar">
          <p>메뉴</p>

          <button type="button" title="메뉴 닫기" onClick={ () => setNavStatus(false) }>
            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
          </button>
        </div>

        <ul id="toggleMenuList">
          <li className="toggle-menu-item">
            <NavLink to="/">홈</NavLink>
          </li>
          <li className="toggle-menu-item">
            <NavLink to="product">제품 나눔</NavLink>
          </li>
          <li className="toggle-menu-item">
            <NavLink to="knowledge">지식 나눔</NavLink>
          </li>
          <li className="toggle-menu-item">
            <NavLink to="/">나눔하기</NavLink>
          </li>
          <li className="toggle-menu-item">
            <NavLink to="mypage">마이 페이지</NavLink>
          </li>
        </ul>
      </aside>

      { isModalOpen && <ShareModal closeModal={ closeModal } /> }
    </>
  );
};

export default Header;