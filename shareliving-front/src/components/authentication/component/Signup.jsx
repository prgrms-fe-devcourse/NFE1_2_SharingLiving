import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/service/apiUtil";
import "../scss/Signup.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTermsChange = (e) => {
    const { name, checked } = e.target;
    setTerms((prevTerms) => ({ ...prevTerms, [name]: checked }));

    // If any individual checkbox is unchecked, uncheck the "전체 동의" box
    if (!checked) {
      setIsAllChecked(false);
    } else {
      // Check if all checkboxes are now checked to mark "전체 동의" as true
      const allChecked = Object.values({ ...terms, [name]: checked }).every(
        (value) => value
      );
      setIsAllChecked(allChecked);
    }
  };

  const handleAllCheck = () => {
    const newCheckState = !isAllChecked;
    setIsAllChecked(newCheckState);

    // Set all terms checkboxes to the state of "전체 동의"
    setTerms({
      age: newCheckState,
      service: newCheckState,
      privacy: newCheckState,
      marketing: newCheckState,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.passwordConfirm) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (!terms.age || !terms.service || !terms.privacy) {
      setMessage("필수 약관에 동의해주세요.");
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("");

    const { email, fullName, password, ...additionalFields } = formData;
    const customFieldsJson = JSON.stringify({
      ...additionalFields,
      terms: terms,
    });

    try {
      const signupData = {
        email,
        fullName,
        password,
        customFields: customFieldsJson,
      };

      console.log("Sending registration data:", signupData);
      const response = await signup(signupData);
      console.log("Server response:", response);

      alert("회원가입 성공");
      navigate("/mypage");
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
        <input
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
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
          placeholder="휴대전화 입력"
          value={formData.phoneNumber}
          onChange={handleInputChange}
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
                required={key !== "marketing"}
              />
              <label htmlFor={key}>
                {key === "age" && "만 14세 이상입니다. (필수)"}
                {key === "service" && "서비스 이용약관 동의 (필수)"}
                {key === "privacy" && "개인정보 수집 및 이용 동의 (필수)"}
                {key === "marketing" && "마케팅 수신 동의 (선택)"}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "처리 중..." : "회원가입"}
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
      
    </div>
  );
};

export default SignUp;