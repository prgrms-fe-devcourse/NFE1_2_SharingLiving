import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
      const tokenEndpoint = "https://accounts.google.com/o/oauth2/token";
      const data = {
        code: authorizationCode,
        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      };

      axios.post(tokenEndpoint, data)
        .then((response) => {
          const accessToken = response.data.access_token;
          const idToken = response.data.id_token;

          // 토큰을 안전하게 저장 (예: localStorage 또는 상태 관리 라이브러리)
          localStorage.setItem('googleAccessToken', accessToken);
          localStorage.setItem('googleIdToken', idToken);

          // 로그인 성공 후 리다이렉트
          navigate("/welcome");
        })
        .catch((error) => {
          console.error("Google 로그인 에러:", error);
          navigate("/login", { state: { error: "Google 로그인에 실패했습니다." } });
        });
    }
  }, [location.search, navigate]);

  return <div>Google 로그인 처리 중...</div>;
};

export default GoogleCallback;