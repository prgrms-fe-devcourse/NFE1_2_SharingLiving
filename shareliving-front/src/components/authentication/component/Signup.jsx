import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/service/apiUtil';
import { useAppContext } from '../../../context/AppContext';
import '../scss/Signup.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  // 로그인 상태라면 '/' 경로로 리다이렉트
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const [formData, setFormData] = useState({
    email: '',
    emailDomain: '',
    fullName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    nickname: '',
  });

  const [terms, setTerms] = useState({
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const formattedNumber = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setFormData((prevData) => ({ ...prevData, phoneNumber: formattedNumber }));
  };

  const handleTermsChange = (e) => {
    const { name, checked } = e.target;
    setTerms((prevTerms) => ({ ...prevTerms, [name]: checked }));

    if (!checked) {
      setIsAllChecked(false);
    } else {
      const allChecked = Object.values({ ...terms, [name]: checked }).every(
        (value) => value
      );
      setIsAllChecked(allChecked);
    }
  };

  const handleAllCheck = () => {
    const newCheckState = !isAllChecked;
    setIsAllChecked(newCheckState);

    setTerms({
      age: newCheckState,
      service: newCheckState,
      privacy: newCheckState,
      marketing: newCheckState,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.passwordConfirm) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (!terms.age || !terms.service || !terms.privacy) {
      setMessage('필수 약관에 동의해주세요.');
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage('');

    const { email, emailDomain, fullName, password, ...additionalFields } =
      formData;
    const fullEmail = `${email}@${emailDomain}`;
    const customFieldsJson = JSON.stringify({
      ...additionalFields,
      terms: terms,
    });

    try {
      const signupData = {
        email: fullEmail,
        fullName,
        password,
        customFields: customFieldsJson,
      };

      console.log('Sending registration data:', signupData);
      const response = await signup(signupData);
      console.log('Server response:', response);

      if (response.token) {
        // localStorage.setItem("token", response.token);
        alert('회원가입 성공');
        navigate('/login'); // 메인 페이지로 리다이렉션
      } else {
        throw new Error('Token not received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(
        `회원가입 실패: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={registerUser}>
        <div className="email-input">
          <input
            type="text"
            name="email"
            placeholder="이메일 입력"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <span>@</span>
          <select
            name="emailDomain"
            value={formData.emailDomain}
            onChange={handleInputChange}
            required
          >
            <option value="">이메일선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="kakao.com">daum.net</option>
            <option value="custom">직접 입력</option>
          </select>
          {formData.emailDomain === 'custom' && (
            <input
              type="text"
              name="customEmailDomain"
              placeholder="도메인 입력"
              value={formData.customEmailDomain}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력 (8-16자리)"
          value={formData.password}
          onChange={handleInputChange}
          minLength="8"
          maxLength="16"
          required
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          value={formData.passwordConfirm}
          onChange={handleInputChange}
          minLength="8"
          maxLength="16"
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="이름 입력"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="휴대전화 입력 (000-0000-0000)"
          value={formData.phoneNumber}
          onChange={handlePhoneNumberChange}
          pattern="\d{3}-\d{4}-\d{4}"
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임 입력"
          value={formData.nickname}
          onChange={handleInputChange}
          required
        />

        <div className="terms-container">
          <div className="all-terms">
            <input
              type="checkbox"
              id="all"
              name="all"
              checked={isAllChecked}
              onChange={handleAllCheck}
            />
            <label htmlFor="all">전체 동의</label>
          </div>
          {Object.entries(terms).map(([key, value]) => (
            <div key={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={value}
                onChange={handleTermsChange}
                required={key !== 'marketing'}
              />
              <label htmlFor={key}>
                {key === 'age' && '만 14세 이상입니다. (필수)'}
                {key === 'service' && (
                  <Link to="/terms-of-service" target="_blank">
                    서비스 이용약관 동의 (필수)
                  </Link>
                )}
                {key === 'privacy' && (
                  <Link to="/privacy-policy" target="_blank">
                    개인정보 수집 및 이용 동의 (필수)
                  </Link>
                )}
                {key === 'marketing' && (
                  <Link to="/marketing-terms" target="_blank">
                    마케팅 수신 동의 (선택)
                  </Link>
                )}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? '처리 중...' : '회원가입'}
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default SignUp;
