// pages/MyPage.jsx
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './MyPage.scss';

const MyPage = () => {
  const { setHideSidebar } = useAppContext();

  const userInfo = {
    nickname: '현재 닉네임',
    stamps: 5, // 예시: 나무 스탬프 개수
  };

  useEffect(() => {
    // 페이지가 렌더링될 때 Sidebar 숨김
    setHideSidebar(true);

    // 페이지가 언마운트되면(이탈할 때) Sidebar 기본값으로 되돌림
    return () => {
      setHideSidebar(false);
    };
  }, [setHideSidebar]);

  return (
    <div className="mypage">
      <h1 className="mypage__title">마이페이지</h1>

      {/* 대시보드 */}
      <section className="mypage__dashboard">
        <h2 className="mypage__dashboard-title">대시보드</h2>
        <div className="mypage__user-info">
          <h3 className="mypage__user-info-title">내 정보</h3>
          <p className="mypage__user-nickname">닉네임: {userInfo.nickname}</p>
          <div className="mypage__user-stamps">
            <h3 className="mypage__user-stamps-title">내 나무 스탬프</h3>
            <p className="mypage__stamps-count">
              현재 나무 스탬프: {userInfo.stamps}개
            </p>
          </div>
        </div>
      </section>

      {/* 나머지 기능을 리스트 형식으로 나열 */}
      <section className="mypage__other-features">
        <ul className="mypage__features-list">
          <li className="mypage__feature-item">
            {/* 내 정보 수정 버튼 */}
            <Link to="/edit-profile" className="mypage__feature-link">
              내 정보 수정{' '}
            </Link>
          </li>
          <li className="mypage__feature-item">
            <Link to="/messages" className="mypage__feature-link">
              메시지함 이동
            </Link>
          </li>
          <li className="mypage__feature-item">
            <Link to="/share-history" className="mypage__feature-link">
              제품 이용 내역 보기
            </Link>
          </li>
          <li className="mypage__feature-item">
            <Link to="/notices" className="mypage__feature-link">
              공지사항 보기
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MyPage;
