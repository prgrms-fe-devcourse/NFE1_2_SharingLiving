const BreadCrumbs = ({ showBreadcrumbs }) => {
  // showBreadcrumbs가 false일 경우 null을 반환하여 UI를 숨김
  if (!showBreadcrumbs) {
    return null;
  }

  return (
    <ul id="navBreadCrumbs" className="rounded">
      <li className="breadcrumb-item">홈</li>
    </ul>
  );
};

export default BreadCrumbs;
