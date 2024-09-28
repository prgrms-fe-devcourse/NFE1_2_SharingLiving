import React from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="nav">
        <li className="nav-item profile">
          <div className="nav-link">
            <div className="profile-image">
              <img
                src="http://via.placeholder.com/100x100/f4f4f4/000000"
                alt="Profile"
              />
            </div>
            <div className="profile-info">
              <p className="name">홍길동</p>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <span className="menu-title">이용 안내</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
