import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      callbackHandle: true
    });

    naverLogin.init();

    naverLogin.getLoginStatus((status) => {
      if (status) {
        const email = naverLogin.user.getEmail();
        const name = naverLogin.user.getName();
        
        console.log(`Logged in: ${email}, ${name}`);
      
        navigate('/'); 
      } else {
        console.log("로그인 실패");
        navigate('/login');
      }
    });
  }, [navigate]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;