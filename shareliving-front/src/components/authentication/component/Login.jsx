import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, getAuthUser } from "../utils/service/apiUtil";
import "../scss/Login.scss";
import "../utils/service/KakaoLogin";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await getAuthUser();
      if (userData && userData.fullName) {
        setIsLoggedIn(true);
        setFullName(userData.fullName);
      } else {
        setIsLoggedIn(false);
        setFullName("");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
      setFullName("");
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
      if (response && response.user) {
        setIsLoggedIn(true);
        setFullName(response.user.fullName);
        navigate("/posts");
      } else {
        throw new Error("로그인 응답에 사용자 정보가 없습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.");
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
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

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <h2>환영합니다, {fullName}님!</h2>
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
          <img src="path/to/logo.png" alt="Namu Living" className="form-logo" />
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
            <a href="#find-info">아이디/비밀번호 찾기</a>
            <a href="#signup">회원가입</a>
          </div>
          <div className="social-login">
            <i className="icon-apple"><button onClick={handleLogin}>카카오 로그인</button></i>
            <i className="icon-google"></i>
            <i className="icon-facebook"></i>
            <i className="icon-twitter"></i>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;