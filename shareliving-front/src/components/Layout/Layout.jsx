// Layout.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer.jsx";
import "./Layout.scss";

const Layout = ({ children }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1400);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleResize = () => {
    setIsWideScreen(window.innerWidth > 1400);
    if (window.innerWidth > 1400) {
      setIsSidebarVisible(true); // 1400px 초과일 경우 사이드바 표시
    } else {
      setIsSidebarVisible(false); // 1400px 이하일 경우 사이드바 숨김
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev); // 사이드바 가시성 토글
  };

  return (
    <div className="layout">
      <Navbar onToggleSidebar={toggleSidebar} /> {/* 네비게이션 바 */}
      <div className="layout__container">
        <div className="layout__row">
          <div className="layout__content-wrapper">
            {children} {/* 메인 콘텐츠가 여기에 렌더링됨 */}
            <Footer /> {/* 푸터 */}
          </div>
          {(isWideScreen || isSidebarVisible) && <Sidebar />} {/* 사이드바 */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
