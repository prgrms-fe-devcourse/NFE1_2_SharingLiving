import LogoImage from '../assets/images/logo.png';

const Header = () => {
    return (
        <header id="headPrimary"> { /** primary, secondary 등의 접미사는 이후 모바일과의 구분을 위해 명명하였음 */ }
            <div className="header-nav-area">
                <h1 id="logoMain">
                    <img src={ LogoImage } alt="나누리빙 로고" />
                </h1>

                <nav id="navPrimary">
                    <ul className="nav-list fullscreen"> { /** 이후 Router 객체를 불러와서 반복 출력하도록 변경하자. */ }
                        <li className="nav-item">
                            제품 나눔
                        </li>

                        <li className="nav-item">
                            지식 나눔
                        </li>

                        <li className="nav-item">
                            나눔하기
                        </li>

                        <li className="nav-item need-auth"> { /** 권한에 따라 보기가 바뀌어야 함 */ }
                            마이 페이지
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