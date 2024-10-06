import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Context 불러오기

const SideBarContent = ({ isLogged }) => {
  const { currentUser, stickers } = useAppContext(); // currentUser 가져오기

  // isLogged prop을 destructure하여 사용
  const goTo = useNavigate();

  if (isLogged) {
    const lastSticker = stickers[stickers.length - 1]; // 마지막 스티커만 가져오기

    return (
      <div>
        <h2>{currentUser.name}의 정보</h2>
        <p>이메일: {currentUser.email}</p>
        <p>총 보호한 나무 수: {currentUser.stamps}</p>
        {stickers.length > 0 && ( // 스티커가 있을 경우에만 렌더링
          <>
            <h3>최근 수확한 나무</h3>
            <div className="stickers">
              {lastSticker && (
                <img
                  src={lastSticker}
                  alt="Last Sticker"
                  className="sidebar__sticker-image"
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        id="btnSideLogin"
        title="로그인 / 회원가입"
        onClick={() => goTo('/login')}
      >
        로그인 / 회원가입
      </button>
    </div>
  );
};

const MainSidebar = ({ isLogged, hideSidebar }) => {
  if (hideSidebar) {
    return null;
  }

  return (
    <aside id="sideBarMain">
      <SideBarContent isLogged={isLogged} />

      <div id="sideBanner" className="rounded">
        <Link to="/">나누리빙 이용 가이드</Link>
      </div>

      <div id="sideNews" className="rounded">
        <div className="sidebar-news-title">
          <p>나누리빙 공지사항</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icons"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </div>

        <ul className="sidebar-news-grid">
          <li className="sidebar-news-item">
            <Link to="/">
              <h6>공지사항 제목 1</h6>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icons"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path>
                </svg>
              </div>
            </Link>
          </li>
          {/* 기타 공지사항 항목들 */}
        </ul>
      </div>
    </aside>
  );
};

export default MainSidebar;
