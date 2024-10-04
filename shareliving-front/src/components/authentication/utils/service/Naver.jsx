import React from 'react';
import { useNavigate } from 'react-router-dom';

const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;

const NaverLogin = () => {
  const navigate = useNavigate();

  // Generate a random state value
  const state = Math.random().toString(36).substr(2, 11);

  // Naver login URL creation
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${state}`;

  // Naver login button click handler
  const handleNaverLogin = () => {
    window.location.href = naverAuthUrl;
  };

  return (
    <div>
      <button onClick={handleNaverLogin}>
        <img src="/img/Naver.png" alt="Naver Login" />
        네이버 로그인
      </button>
    </div>
  );
};

export default NaverLogin;