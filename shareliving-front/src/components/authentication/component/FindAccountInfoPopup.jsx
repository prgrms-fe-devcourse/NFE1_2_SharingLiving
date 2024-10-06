import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/FindAccountInfo.scss';

const API_BASE_URL = 'https://kdt.frontend.5th.programmers.co.kr:5003';

const FindAccountInfo = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('id');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setMessage('');
    setIsVerified(false);
    setFullName('');
    setEmail('');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search/users/${fullName}`
      );
      if (response.data.length > 0) {
        setMessage(`찾은 아이디: ${response.data[0].email}`);
      } else {
        setMessage('해당 이름으로 등록된 아이디가 없습니다.');
      }
    } catch (error) {
      console.error('Find ID error:', error.response || error);
      setMessage(
        '아이디를 찾을 수 없습니다. 오류: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search/users/${fullName}`
      );
      const user = response.data.find((u) => u.email === email);
      if (user) {
        setIsVerified(true);
        setMessage(
          '사용자 확인이 완료되었습니다. 현재 비밀번호와 새 비밀번호를 입력해주세요.'
        );
      } else {
        setMessage('입력하신 정보와 일치하는 계정을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('User verification error:', error.response || error);
      setMessage(
        '사용자 확인에 실패했습니다. 오류: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // 먼저 현재 비밀번호로 로그인을 시도합니다.
      const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password: currentPassword,
      });

      if (loginResponse.data.token) {
        // 로그인 성공 시, 얻은 토큰으로 비밀번호를 변경합니다.
        const resetResponse = await axios.put(
          `${API_BASE_URL}/settings/update-password`,
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${loginResponse.data.token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (resetResponse.status === 200) {
          setMessage(
            '비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인해주세요.'
          );
          setTimeout(() => navigate('/login'), 3000);
        }
      } else {
        throw new Error('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Password reset error:', error.response || error);
      setMessage(
        '비밀번호 변경에 실패했습니다. 오류: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="find-account-info">
      <h2>아이디/비밀번호 찾기</h2>
      <div className="mode-selector">
        <button
          onClick={() => handleModeChange('id')}
          className={mode === 'id' ? 'active' : ''}
        >
          아이디 찾기
        </button>
        <button
          onClick={() => handleModeChange('password')}
          className={mode === 'password' ? 'active' : ''}
        >
          비밀번호 찾기
        </button>
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
          {!isVerified && (
            <>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="이름을 입력하세요"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
              />
            </>
          )}
          {isVerified && (
            <>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                required
              />
            </>
          )}
          <button type="submit">
            {isVerified ? '비밀번호 변경' : '사용자 확인'}
          </button>
        </form>
      )}

      {message && <p className="message">{message}</p>}
      <button onClick={() => navigate('/login')}>
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
};

export default FindAccountInfo;
