const SideBarContent = (isLogged) => { // 로그인 상태에 따른 사이드 바 내용 표시 (나중에 별도 컴포넌트화 해야 함)
    if (isLogged === true) {
        return (
            <div>
                로그인 된 상태 - 나무 표시
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

            <div className="rounded">
                사이드바
            </div>
        </aside>
    );
};

export default MainSidebar;