import LogoImage from '../assets/images/logo.png';
import UserControlls from './UserControlls';

const AlterHeader = () => {
    return (
        <header id="altHeader" style={{ padding: '.4rem .8rem' }}> { /** 상하단으로 네비게이션 분리되는 두 번째 안 */ }
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <UserControlls />
            </div>

            <div className="header-nav-area fullscreen">
                <h1 id="logoMain">
                    <img src={ LogoImage } alt="나누리빙 로고" />
                </h1>

                <nav id="navPrimary">
                    <ul className="nav-list"> { /** 이후 Router 객체를 불러와서 반복 출력하도록 변경하자. */ }
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
        </header>
    );
};

export default AlterHeader;