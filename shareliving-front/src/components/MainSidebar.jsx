const SideBarContent = (isLogged) => { // 로그인 상태에 따른 사이드 바 내용 표시 (나중에 별도 컴포넌트화 해야 함)
    if (isLogged === true) {
        return (
            <div>
                로그인 된 상태 - 나무와 프로필 표시
            </div>
        );
    }

    return (
        <div>
            <button type="button" id="btnSideLogin" className="button-large"> { /** 임시 엘리먼트 - 라우터 링크로 바꿔야 함 */ }
                로그인 / 회원가입
            </button>
        </div>
    );
}

const MainSidebar = () => {
    return (
        <aside id="sideBarMain">
            <SideBarContent isLogged={ false } />

            <div id="sideBanner" className="rounded">
                이용 가이드
            </div>

            <div id="sideNews" className="rounded">
                <div className="sidebar-news-title">
                    <p>나누리빙 공지사항</p>

                    <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                </div>

                <ul className="sidebar-news-grid">
                    <li className="sidebar-news-item">
                        <a>
                            <h6>공지사항 제목 1</h6>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
                            </div>
                        </a>
                    </li>

                    <li className="sidebar-news-item">
                        <a>
                            <h6>공지사항 제목 2</h6>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
                            </div>
                        </a>
                    </li>

                    <li className="sidebar-news-item">
                        <a>
                            <h6>공지사항 제목 3</h6>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
                            </div>
                        </a>
                    </li>

                    <li className="sidebar-news-item">
                        <a>
                            <h6>공지사항 제목 4</h6>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default MainSidebar;