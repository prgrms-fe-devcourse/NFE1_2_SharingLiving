const BreadCrumbs = ({ currentRoute }) => {
    if (currentRoute === 'home') {
        return null;
    }

    return (
        <ul id="navBreadCrumbs" className="rounded">
            <li className="breadcrumb-item">홈</li>
        </ul>
    );
};

export default BreadCrumbs;