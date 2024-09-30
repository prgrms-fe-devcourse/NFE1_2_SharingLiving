import React, { useState } from "react";
import { login } from "./apiUtil";

const EmailLogin = ({ onLoginSuccess, onLoginError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(email, password);
      onLoginSuccess(response);
    } catch (error) {
      onLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default EmailLogin;