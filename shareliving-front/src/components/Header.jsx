const Header = () => {
    return (
        <header id="headPrimary"> { /** primary, secondary 등의 접미사는 이후 모바일과의 구분을 위해 명명하였음 */ }
            <div className="header-nav-area">
                <h1 id="logoMain">
                    <img src="" alt="나누리빙 로고" />
                </h1>

                <nav id="navPrimary">
                    <ul className="nav-list fullscreen">
                        <li className="nav-item">
                            라우트 링크
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="header-user-area">
                placeholder
                { /** User 컴포넌트 필요 - 로그인 상태에 따라 변경되어야 함 */ }
            </div>
        </header>
    );
};

export default Header;