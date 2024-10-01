import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../scss/FindAccountInfo.scss";

const API_BASE_URL = "https://kdt.frontend.5th.programmers.co.kr:5003";

const FindAccountInfo = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('id');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setMessage('');
    setIsCodeSent(false);
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BASE_URL}/search/users/${fullName}`);
      if (response.data.length > 0) {
        setMessage(`찾은 아이디: ${response.data[0].email}`);
      } else {
        setMessage('해당 이름으로 등록된 아이디가 없습니다.');
      }
    } catch (error) {
      setMessage('아이디를 찾을 수 없습니다.');
    }
  };

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post(`${API_BASE_URL}/send-verification-code`, { email });
      setIsCodeSent(true);
      setMessage('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      setMessage('인증 코드 전송에 실패했습니다.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      
      await axios.put(`${API_BASE_URL}/settings/update-password`, { 
        email, 
        verificationCode, 
        newPassword: password 
      });
      setMessage('비밀번호가 성공적으로 변경되었습니다.');
      setIsCodeSent(false);
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className="find-account-info">
      <h2>아이디/비밀번호 찾기</h2>
      <div className="mode-selector">
        <button onClick={() => handleModeChange('id')} className={mode === 'id' ? 'active' : ''}>아이디 찾기</button>
        <button onClick={() => handleModeChange('password')} className={mode === 'password' ? 'active' : ''}>비밀번호 찾기</button>
      </div>

      {mode === 'id' ? (
        <form onSubmit={handleFindId}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
          <button type="submit">아이디 찾기</button>
        </form>
      ) : (
        <form onSubmit={isCodeSent ? handleResetPassword : handleSendVerificationCode}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
          {isCodeSent && (
            <>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증 코드를 입력하세요"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                required
              />
            </>
          )}
          <button type="submit">
            {isCodeSent ? '비밀번호 변경' : '인증 코드 받기'}
          </button>
        </form>
      )}

      {message && <p className="message">{message}</p>}
      <button onClick={() => navigate(-1)}>로그인 화면으로 돌아가기</button>
    </div>
  );
};

export default FindAccountInfo;