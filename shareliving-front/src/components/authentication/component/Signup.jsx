import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../utils/service/apiUtil";
import "../scss/Signup.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    emailDomain: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    nickname: "",
  });

  const [terms, setTerms] = useState({
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const formattedNumber = numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setFormData((prevData) => ({ ...prevData, phoneNumber: formattedNumber }));
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
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
    let newErrors = {};

    if (formData.fullName.length < 2) {
      newErrors.fullName = "이름은 2글자 이상이어야 합니다.";
    }

    if (formData.nickname.length < 2) {
      newErrors.nickname = "닉네임은 2글자 이상이어야 합니다.";
    }

    if (formData.phoneNumber.replace(/\D/g, '').length !== 11) {
      newErrors.phoneNumber = "전화번호는 11자리여야 합니다.";
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    if (!terms.age || !terms.service || !terms.privacy) {
      newErrors.terms = "필수 약관에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("");

    const { email, emailDomain, fullName, password, ...additionalFields } = formData;
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

      console.log("Sending registration data:", signupData);
      const response = await signup(signupData);
      console.log("Server response:", response);

      if (response.token) {
        localStorage.setItem("Token", response.token);
        alert("회원가입 성공");
        navigate("/");  // 메인 페이지로 리다이렉션
      } else {
        throw new Error("Token not received");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(`회원가입 실패: ${err.response?.data?.message || err.message}`);
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
            <option value="kakao.com">kakao.com</option>
            <option value="custom">직접 입력</option>
          </select>
          {formData.emailDomain === "custom" && (
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
        {errors.passwordConfirm && <p className="error-message">{errors.passwordConfirm}</p>}
        <input
          type="text"
          name="fullName"
          placeholder="이름 입력 (2글자 이상)"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        <input
          type="tel"
          name="phoneNumber"
          placeholder="휴대전화 입력 (000-0000-0000)"
          value={formData.phoneNumber}
          onChange={handlePhoneNumberChange}
          pattern="\d{3}-\d{4}-\d{4}"
          required
        />
        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        <input
          type="text"
          name="nickname"
          placeholder="닉네임 입력 (2글자 이상)"
          value={formData.nickname}
          onChange={handleInputChange}
          required
        />
        {errors.nickname && <p className="error-message">{errors.nickname}</p>}

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
                required={key !== "marketing"}
              />
              <label htmlFor={key}>
                {key === "age" && "만 14세 이상입니다. (필수)"}
                {key === "service" && (
                  <Link to="/terms-of-service" target="_blank">서비스 이용약관 동의 (필수)</Link>
                )}
                {key === "privacy" && (
                  <Link to="/privacy-policy" target="_blank">개인정보 수집 및 이용 동의 (필수)</Link>
                )}
                {key === "marketing" && (
                  <Link to="/marketing-terms" target="_blank">마케팅 수신 동의 (선택)</Link>
                )}
              </label>
            </div>
          ))}
        </div>
        {errors.terms && <p className="error-message">{errors.terms}</p>}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "처리 중..." : "회원가입"}
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default SignUp;