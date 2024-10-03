import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Google from "../../../../public/img/Google.png";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

// Google 인증 링크 생성
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=email profile openid`;

const GoogleLogin = () => {
  // Google 로그인 버튼 클릭 시 인증 페이지로 이동
  const handleGoogleLogin = () => {
    window.location.href = googleAuthUrl;
  };

  // Google 인증 후 콜백에서 호출될 함수
  const handleGoogleCallback = async (code) => {
    try {
      // 액세스 토큰 요청
      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        new URLSearchParams({
          code: code,
          client_id: GOOGLE_CLIENT_ID,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Access Token:", tokenResponse.data.access_token);
      getUserInfo(tokenResponse.data.access_token); // 사용자 정보 요청
    } catch (error) {
      console.error("Access Token 요청 실패:", error);
    }
  };

  // 사용자 정보 요청 함수
  const getUserInfo = async (token) => {
    try {
      const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Info:", response.data);
    } catch (error) {
      console.error("사용자 정보 요청 실패:", error);
    }
  };

  return (
    <div>
      <a onClick={handleGoogleLogin} className="google-login-button">
        <img src={GoogleIcon} alt="Google" className="google-icon" />
      </a>
    </div>
  );
};

export default GoogleLogin;