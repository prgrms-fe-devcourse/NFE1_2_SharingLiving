import { Link, useLocation } from 'react-router-dom';

// SVG 아이콘을 별도의 컴포넌트로 분리
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icons"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
  </svg>
);

const BreadCrumbs = ({ showBreadcrumbs }) => {
  const thisLocation = useLocation().pathname.split('/').filter(Boolean);

  // URL 경로에 따른 라벨 매핑 객체
  const pathLabels = {
    product: '제품 나눔',
    knowledge: '지식 나눔',
    mypage: '마이 페이지',
    'add-product': '제품 나눔 등록하기',
    'add-knowledge': '지식 나눔 등록하기',
    login: '로그인 / 회원가입',
    default: '글 내용 보기',
  };

  // showBreadcrumbs가 false일 경우 UI를 숨김
  if (!showBreadcrumbs) {
    return null;
  }

  return (
    <ul id="navBreadCrumbs" className="rounded">
      {/* 항상 홈 표시 */}
      <li className="breadcrumb-item">
        <Link to="/">홈</Link>
        {thisLocation.length > 0 && <ArrowIcon />}
      </li>

      {/* 홈 외의 경로 렌더링 */}
      {thisLocation.map((item, index) => {
        const label = pathLabels[item] || pathLabels['default'];
        const link = `/${item}`;

        return (
          <li className="breadcrumb-item" key={index}>
            <Link to={link}>{label}</Link>
            {index < thisLocation.length - 1 && <ArrowIcon />}
          </li>
        );
      })}
    </ul>
  );
};

export default BreadCrumbs;
