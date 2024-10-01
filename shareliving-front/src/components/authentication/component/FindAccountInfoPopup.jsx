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
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setMessage('');
    setIsVerified(false);
    setFullName('');
    setEmail('');
    setPassword('');
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

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BASE_URL}/search/users/${fullName}`);
      if (response.data.length > 0 && response.data[0].email === email) {
        setIsVerified(true);
        setMessage('사용자 확인이 완료되었습니다. 새 비밀번호를 입력해주세요.');
      } else {
        setMessage('이름과 이메일이 일치하지 않습니다.');
      }
    } catch (error) {
      setMessage('사용자 확인에 실패했습니다.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/settings/update-password`, { 
        email,
        password
      });
      setMessage('비밀번호가 성공적으로 변경되었습니다.');
      setIsVerified(false);
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
        <form onSubmit={isVerified ? handleResetPassword : handleVerifyUser}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
            disabled={isVerified}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
            disabled={isVerified}
          />
          {isVerified && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              required
            />
          )}
          <button type="submit">
            {isVerified ? '비밀번호 변경' : '사용자 확인'}
          </button>
        </form>
      )}

      {message && <p className="message">{message}</p>}
      <button onClick={() => navigate(-1)}>로그인 화면으로 돌아가기</button>
    </div>
  );
};

export default FindAccountInfo;