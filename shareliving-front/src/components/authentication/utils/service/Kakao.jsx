import React from "react";
import axios from "axios";
import kakaoIcon from "../../../../public/img/kakaoIcon.png";

const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

const Kakao = () => {
  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  const handleKakaoCallback = async (code) => {
    try {
      const tokenResponse = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Access Token:", tokenResponse.data.access_token);
      getUserInfo(tokenResponse.data.access_token);
    } catch (error) {
      console.error("Access Token 요청 실패:", error);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
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
      <a onClick={handleKakaoLogin} className="kakao-login-button">
        <img src={kakaoIcon} alt="Kakao" className="kakao-icon" />
      </a>
    </div>
  );
};

export default Kakao;