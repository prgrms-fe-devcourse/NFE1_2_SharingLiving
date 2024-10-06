import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, getAuthUser } from "../utils/service/apiUtil";
import { useAppContext } from "../../../context/AppContext";
import "../scss/Login.scss";
import Google from "../../../public/img/Google.png";
import MainLogo from "../../../public/img/MainLogo.png";
import naver from "../../../public/img/naver.png";
import kakaoIcon from "../../../public/img/kakaoIcon.png";

const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;
const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { setCurrentUser, isTokenLoading } = useAppContext();

  useEffect(() => {
    if (!isTokenLoading) {
      checkAuthStatus();
    }
    initializeNaverLogin();
  }, [isTokenLoading]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getAuthUser(token);
        if (userData) {
          updateUserInfo(userData, token);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await login(email, password);
      updateUserInfo(response.user, response.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserInfo = (userData, token) => {
    const userInfo = {
      name: userData.fullName,
      email: userData.email,
      stamps: userData.stamps || 0,
    };
    setCurrentUser({ ...userInfo, token });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('token', token);
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=email profile`;
    window.location.href = googleAuthUrl;
  };

  const initializeNaverLogin = () => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 60 },
    });
    naverLogin.init();
  };

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;
  };

  return (
    <div className="login-container">
      <main className="login-content">
        <div className="login-form-container">
          <img src={MainLogo} alt="" className="form-logo" />
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
          {message && <p className="error-message">{message}</p>}
          <div className="login-links">
            <Link to="/find-account-info">아이디/비밀번호 찾기</Link>
            <Link to="/signup">회원가입</Link>
          </div>
          <div className="social-login">
            <a onClick={handleKakaoLogin} className="kakao-login-button">
              <img src={kakaoIcon} alt="Kakao" className="kakao-icon" />
            </a>
            <a onClick={handleGoogleLogin} className="google-login-button">
              <img src={Google} alt="Google" className="google-icon" />
            </a>
            <div id="naverIdLogin"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;