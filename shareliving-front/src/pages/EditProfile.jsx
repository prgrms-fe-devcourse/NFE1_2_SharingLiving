// pages/EditProfile.jsx
import React from 'react';

const EditProfile = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 정보를 제출하는 로직을 구현합니다.
    console.log('정보가 수정되었습니다.');
  };

  return (
    <div>
      <h1>내 정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">닉네임 변경:</label>
          <input type="text" id="nickname" placeholder="새 닉네임 입력" />
        </div>
        <div>
          <label htmlFor="password">비밀번호 변경:</label>
          <input type="password" id="password" placeholder="새 비밀번호 입력" />
        </div>
        <div>
          <label htmlFor="address">주소 변경:</label>
          <input type="text" id="address" placeholder="새 주소 입력" />
        </div>
        <div>
          <label htmlFor="profilePicture">프로필 사진 변경:</label>
          <input type="file" id="profilePicture" />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default EditProfile;
