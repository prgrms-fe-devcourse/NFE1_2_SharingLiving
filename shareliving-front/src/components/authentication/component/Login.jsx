import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { login, getAuthUser } from "../utils/service/apiUtil";
import "../scss/Login.scss";
import kakao from "../../../public/img/kakao.png"
import Google from "../../../public/img/Google.png"
import MainLogo from "../../../public/img/MainLogo.png"
import naver from "../../../public/img/naver.png"

const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${Math.random().toString(36).substr(2, 11)}`;

const API_BASE_URL = "https://kdt.frontend.5th.programmers.co.kr:5003";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    checkAuthStatus();
    const code = new URLSearchParams(location.search).get("code");
    const state = new URLSearchParams(location.search).get("state");
    if (code) {
      if (state) {
        console.log("Naver auth code detected:", code);
        handleNaverCallback(code);
      } else {
        console.log("Kakao auth code detected:", code);
        handleKakaoCallback(code);
      }
    }
  }, [location]);

  const checkAuthStatus = async () => {
    try {
      const userData = await getAuthUser();
      if (userData && userData.fullName) {
        setIsLoggedIn(true);
        setFullName(userData.fullName);
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
      setIsLoggedIn(true);
      setFullName(response.user.fullName);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    console.log("Initiating Kakao login, redirecting to:", KAKAO_AUTH_URL);
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleKakaoCallback = async (code) => {
    setIsLoading(true);
    try {
      console.log("Received Kakao auth code:", code);

      const response = await axios.post(`${API_BASE_URL}/auth/kakao/callback`, { code });

      console.log("Server login response:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("Token", response.data.token);
        setIsLoggedIn(true);
        setFullName(response.data.user.fullName);
        navigate("/");
      } else {
        throw new Error("Login response does not contain a token");
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      console.error("Error details:", error.response?.data);
      setMessage("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNaverLogin = () => {
    console.log("Initiating Naver login, redirecting to:", NAVER_AUTH_URL);
    window.location.href = NAVER_AUTH_URL;
  };

  const handleNaverCallback = async (code) => {
    setIsLoading(true);
    try {
      console.log("Received Naver auth code:", code);

      const response = await axios.post(`${API_BASE_URL}/auth/naver/callback`, { code });

      console.log("Server login response:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("Token", response.data.token);
        setIsLoggedIn(true);
        setFullName(response.data.user.fullName);
        navigate("/");
      } else {
        throw new Error("Login response does not contain a token");
      }
    } catch (error) {
      console.error("Naver login error:", error);
      console.error("Error details:", error.response?.data);
      setMessage("네이버 로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
      });
      localStorage.removeItem("Token");
      setIsLoggedIn(false);
      setFullName("");
      setMessage("로그아웃 되었습니다.");
    } catch (error) {
      console.error("Logout error:", error);
      setMessage("로그아웃 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login not implemented yet");
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <h2>나누리빙에 방문해주셔서 감사합니다.</h2>
        <button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "처리 중..." : "로그아웃"}
        </button>
        {message && <p className="info-message">{message}</p>}
      </div>
    );
  }

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
              <img src={kakao} alt="Kakao" className="kakao-icon" />
            </a>
            <a onClick={handleGoogleLogin} className="google-login-button">
              <img src={Google} alt="Google" className="google-icon" />
            </a>
            <a onClick={handleNaverLogin} className="naver-login-button">
              <img src={naver} alt="Naver" className="naver-icon" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;