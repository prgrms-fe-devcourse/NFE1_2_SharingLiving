import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductDetail = () => {
  const thisLocation = useLocation().pathname.split('/').pop(); // 현재 접근한 문서의 id
  const currentContext = useAppContext();

  currentContext.setShowBreadcrumbs(true);

  // 팀 요청 API URL : https://kdt.frontend.5th.programmers.co.kr:5003/

  // const getProdDetail = async (dataIndex) => { // 제품 정보 가지고 오기
  //   const response = await fetch(`https://kdt.frontend.5th.programmers.co.kr:5003/posts/${ dataIndex }`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //   })
  //     .then(res => console.log(res));

  //   return response.json();
  // }

  const product = {
    name: 'ㅇㅇㅇ',
    treeCount: 3,
    imageUrl: '/'
  }

  return (
    <div id="detailContainer" className="rounded">
      <h1>제품 나눔 상세 페이지</h1>
      <p>제품명: {product.name}</p>
      <p>나무 그루 수: {product.treeCount}</p>
      <img src={product.imageUrl} alt="제품 이미지" />
      {/* 제품에 대한 추가 정보 표시 가능 */}

      { thisLocation }
    </div>
  );
};

export default ProductDetail;