import React, { useState } from 'react';
import axios from 'axios';

const FindAccountInfo = () => {
  const [mode, setMode] = useState('id'); // 'id' or 'password'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      
      const response = await axios.post('https://kdt.frontend.5th.programmers.co.kr:5003//settings/update-user', { username });
      setMessage(`찾은 아이디: ${response.data.id}`);
    } catch (error) {
      setMessage('아이디를 찾을 수 없습니다.');
    }
  };

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post('https://kdt.frontend.5th.programmers.co.kr:5003/send-verification', { email });
      setIsCodeSent(true);
      setMessage('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      setMessage('인증 코드 전송에 실패했습니다.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post('https://kdt.frontend.5th.programmers.co.kr:5003/update-password', {
        email,
        verificationCode,
        newPassword
      });
      setMessage('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className="find-account-info">
      <div className="mode-selector">
        <button onClick={() => handleModeChange('id')} className={mode === 'id' ? 'active' : ''}>아이디 찾기</button>
        <button onClick={() => handleModeChange('password')} className={mode === 'password' ? 'active' : ''}>비밀번호 찾기</button>
      </div>

      {mode === 'id' ? (
        <form onSubmit={handleFindId}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호를 입력하세요"
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
          {!isCodeSent && <button type="submit">인증 코드 받기</button>}
          
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                required
              />
              <button type="submit">비밀번호 변경</button>
            </>
          )}
        </form>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FindAccountInfo;