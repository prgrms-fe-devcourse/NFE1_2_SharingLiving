import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = ({ showBreadcrumbs }) => {
  const thisLocation = useLocation().pathname.split('/');

  // showBreadcrumbs가 false일 경우 null을 반환하여 UI를 숨김

  if (!showBreadcrumbs) {
    return null;
  }

  return (
    <ul id="navBreadCrumbs" className="rounded">
      { thisLocation.map((item, index) => {
        return (
          <>
            <li className="breadcrumb-item" key={ index }>
              <Link to={ item === '' ? '/' : item }>
                {
                  item === '' ? '홈' : item === 'product' ? '제품 나눔' : item === 'knowledge' ? '지식 나눔' : item === 'mypage' ? '마이 페이지' : item === 'add-product' ? '제품 나눔 등록하기' : item === 'add-knowledge' ? '지식 나눔 등록하기' : item === 'login' ? '로그인 / 회원가입' : '글 내용 보기'
                }
              </Link>
            </li>

            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
          </>
        )
      }) }
    </ul>
  );
};

export default BreadCrumbs;