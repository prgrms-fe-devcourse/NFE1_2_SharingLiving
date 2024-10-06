// pages/EditProfile.jsx
import React, { useState, useContext } from 'react';
import { useAppContext } from '../context/AppContext'; // AppContext 경로에 맞게 수정
import { useNavigate } from 'react-router-dom';
import './EditProfile.scss';

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useAppContext(); // 현재 사용자 정보와 setter 가져오기
  const [nickname, setNickname] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState(currentUser.userInfo.address || '');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 사용자 정보 업데이트
    const updatedUser = {
      ...currentUser,
      email: email,
      name: nickname,
      userInfo: {
        ...currentUser.userInfo,
        address: address,
      },
      // 프로필 사진 처리 로직 추가 가능
    };

    setCurrentUser(updatedUser); // 상태 업데이트
    console.log('정보가 수정되었습니다.', updatedUser);
  };

  return (
    <div className="profile-edit-wrapper">
      <h1 className="title">내 정보 수정</h1>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nickname" className="form-label">
            e-mail
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setNickname(e.target.value)} // 이메일 상태 업데이트
            placeholder="새 닉네임 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname" className="form-label">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} // 닉네임 상태 업데이트
            placeholder="새 닉네임 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            현재 비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            변경할 비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            주소
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // 주소 상태 업데이트
            placeholder="새 주소 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            계정 종류
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // 주소 상태 업데이트
            placeholder="새 주소 입력"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="profilePicture" className="form-label">
            프로필 사진 변경:
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])} // 파일 상태 업데이트
          />
        </div> */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              navigate('/mypage');
            }}
          >
            취소
          </button>
          <button type="submit" className="submit-button">
            변경사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
