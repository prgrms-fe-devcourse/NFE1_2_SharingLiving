const BottomNavBar = () => {
    return (
        <aside id="navMobile">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">제품 나눔</Link>
                </li>

                <li className="nav-item">
                    <Link to="/">지식 나눔</Link>
                </li>

                <li className="nav-item" onClick={ openModal }>나눔하기</li>

                <li className="nav-item">
                    <Link to="/">마이 페이지</Link>
                </li>
            </ul>
        </aside>
    );
};

export default BottomNavBar;