import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import naver from '../../../../public/img/naver.png'; 

const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;

const NaverLogin = () => {
  const navigate = useNavigate();

  // 네이버 로그인 URL 생성
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${Math.random().toString(36).substr(2, 11)}`;

  // 네이버 로그인 버튼 클릭 핸들러
  const handleNaverLogin = () => {
    window.location.href = naverAuthUrl;
  };

  // 네이버 로그인 콜백 처리
  const handleNaverCallback = async (code, state) => {
    try {
      // 액세스 토큰 요청
      const tokenResponse = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: NAVER_CLIENT_ID,
            client_secret: import.meta.env.VITE_APP_NAVER_CLIENT_SECRET,
            code,
            state,
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;
      console.log('Access Token:', accessToken);

      // 사용자 정보 요청
      const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('User Info:', userInfoResponse.data);
      // 여기서 사용자 정보를 처리하거나 상태를 업데이트할 수 있습니다.

    } catch (error) {
      console.error('네이버 로그인 에러:', error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) {
      handleNaverCallback(code, state);
    }
  }, []);

  return (
    <div>
      <a onClick={handleNaverLogin} className="naver-login-button">
        <img src={naver} alt="Naver" className="naver-icon" />
      </a>
    </div>
  );
};

export default NaverLogin;