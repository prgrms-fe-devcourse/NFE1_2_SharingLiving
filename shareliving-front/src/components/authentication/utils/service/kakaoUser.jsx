// KakaoCallback.jsx 또는 해당하는 컴포넌트 파일
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const saveKakaoUserInfo = (userInfo) => {
      // 필요한 정보만 선택하여 저장
      const userInfoToSave = {
        id: userInfo.id,
        connected_at: userInfo.connected_at,
        nickname: userInfo.properties.nickname,
        profile_image: userInfo.properties.profile_image,
        thumbnail_image: userInfo.properties.thumbnail_image
      };

      // 객체를 JSON 문자열로 변환하여 저장
      localStorage.setItem('kakaoUserInfo', JSON.stringify(userInfoToSave));
    };

    const processKakaoLogin = async () => {
      // 여기서 카카오 로그인 처리 및 사용자 정보 가져오기
      const userInfo = {
        id: 3729746242,
        connected_at: "2024-10-02T13:45:05Z",
        properties: {
          nickname: "박우현",
          profile_image: "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
          thumbnail_image: "http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg"
        },
        
      };

      saveKakaoUserInfo(userInfo);
      navigate('/'); 
    };

    processKakaoLogin();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};


// // 다른 컴포넌트에서 사용자 정보 가져오기
// const getUserInfo = () => {
//     const userInfoString = localStorage.getItem('kakaoUserInfo');
//     if (userInfoString) {
//       return JSON.parse(userInfoString);
//     }
//     return null;
//   };
  
//   // 사용 예시
//   const UserProfile = () => {
//     const userInfo = getUserInfo();
  
//     if (!userInfo) {
//       return <div>로그인이 필요합니다.</div>;
//     }
  
//     return (
//       <div>
//         <h2>{userInfo.nickname}님 환영합니다!</h2>
//         <img src={userInfo.profile_image} alt="프로필 이미지" />
//         <p>연결 시간: {userInfo.connected_at}</p>
//       </div>
//     );
//   };

export default KakaoCallback;