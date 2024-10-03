import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Google from "../../../../public/img/Google.png"

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

const GoogleLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      handleGoogleCallback(authorizationCode);
    }
  }, [location]);

  const handleGoogleLogin = () => {
    const googleAuthUrl = `/google-api/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=email profile`;
    window.location.href = googleAuthUrl;
  };

  const handleGoogleCallback = async (code) => {
    try {
      const response = await axios.post('/api/auth/google', { code });
      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-button">
        <img src={Google} alt="Google" className="Google-icon" />
    </button>
  );
};

export default GoogleLogin;