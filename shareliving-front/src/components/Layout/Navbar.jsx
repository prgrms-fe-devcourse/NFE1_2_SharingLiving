// Navbar.jsx
import React from "react";
import "./Navbar.scss";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar__menu-wrapper top">
        <a className="navbar__logo" href="index.html"></a>
        <ul className="navbar__nav">
          <li className="navbar__nav-item">알림</li>
          <li className="navbar__nav-item">쪽지</li>
        </ul>
        <button className="navbar__sidebar-btn" onClick={onToggleSidebar}>
          <span className="navbar__icon-menu">사이드바버튼</span>
        </button>
      </div>
      <div className="navbar__menu-wrapper bottom">
        <div className="navbar__menu-wrapper">
          <ul className="navbar__nav">
            <li className="navbar__nav-item">나눔이용</li>
            <li className="navbar__nav-item">나눔등록</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
