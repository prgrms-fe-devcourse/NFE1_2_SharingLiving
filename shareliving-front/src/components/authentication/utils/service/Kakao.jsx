import React from "react";
import axios from "axios";
import { API_BASE_URL } from "./apiUtil";

const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

const KakaoLogin = ({ onLoginSuccess, onLoginError }) => {
  const handleKakaoLogin = () => {
    console.log("Initiating Kakao login, redirecting to:", KAKAO_AUTH_URL);
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleKakaoCallback = async (code) => {
    try {
      console.log("Received Kakao auth code:", code);
      const response = await axios.post(`${API_BASE_URL}/auth/kakao/callback`, { code });
      console.log("Server login response:", response.data);
      if (response.data && response.data.token) {
        onLoginSuccess(response.data);
      } else {
        throw new Error("Login response does not contain a token");
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      console.error("Error details:", error.response?.data);
      onLoginError(error);
    }
  };

  return (
    <button onClick={handleKakaoLogin} className="kakao-login-button">
      <img src="/img/kakao.png" className="kakao-icon" alt="Kakao Login" />
    </button>
  );
};

export default KakaoLogin;