import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentArticle } from '../components/authentication/utils/service/apiUtil';

const product = {
  name: 'ㅇㅇㅇ',
  treeCount: 3,
  imageUrl: '/'
}

const ProductDetail = () => {
  const thisLocation = useLocation().pathname.split('/').pop(); // 현재 접근한 문서의 id

  useEffect(() => {
    const thisItem = getCurrentArticle(thisLocation).then((res) => { return JSON.parse(res.title); });

    console.log(thisItem);
  });

  return (
    <article id="detailContainer" className="rounded">
      <div id="detailImageContainer"> { /** 이미지 슬라이더 선택 렌더링으로 하나의 Detail 페이지를 재활용할 수 있을 것 같다. */ }
        <img className="detail-image" src={ product.imageUrl } alt="나눔 제품 이미지" />

        { /** 이미지 미리보기 슬라이더 */ }
      </div>

      <dl id="detailSummary">
        <dt>
          제목 영역
        </dt>

        <dd>
          <div>사용자 태그</div>
          <div>글 정보</div>
        </dd>
      </dl>

      <div id="detailText">
        본문 영역

        <p>제품명: {product.name}</p>
        <p>나무 그루 수: {product.treeCount}</p>
      </div>

      <div id="detailReply">
        댓글 (0)
        { /** 댓글 아이템 컴포넌트 - 재귀를 통한 대댓글 구현 필요 */ }
      </div>
    </article>
  );
};

export default ProductDetail;