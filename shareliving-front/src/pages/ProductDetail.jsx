import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentArticle } from '../components/authentication/utils/service/apiUtil';

import ArticleReply from '../components/items/ArticleReply';

const articleObject = {
  dataID: '',
  dataType: 'article',
  title: '다 쓴 물품 나눔합니다',
  date: '2024-09-13',
  author: {
    userName: '홍길동',
    userImageURL: ''
  },
  articleImageURL: '',
  likes: 22,
  treeCount: 3,
  shareItem: {
    // 이 항목이 존재하면 제품 나눔, 아니면 지식 나눔
    // 제품 나눔일 경우 이 안에 제품에 대한 정보와 수거 방식, 비용 등에 대한 정보 포함
    itemName: '나눔 생활 제품명',
    shippingMethod: '택배',
    shippingPrice: 2500,
    itemImages: [
      { imageURL: '' },
      { imageURL: '' },
      { imageURL: '' },
      { imageURL: '' },
      { imageURL: '' }
    ]
  },
  articleText: `
    apwoerjgporjgpajr
    gajreop[gbvjaeprjghperasjhgbiopaer
    rjaepgobjaerpiohgbjapoj
  `,
  replies: [
    {
      dataID: '',
      dataType: 'reply',
      userName: 'ddd',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'article',
        targetID: '1234'
      },
      replyText: `apwrgjparwjgpoarejgpoarjgpo`,
    },
    {
      dataID: '',
      dataType: 'reply',
      userName: 'ddd',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'reply',
        targetID: '1234'
      },
      replyText: `대댓글 대댓댓글`,
    }
  ],
}

const ProductDetail = () => {
  const thisLocation = useLocation().pathname.split('/').pop(); // 현재 접근한 문서의 id
  const [currentReplyTarget, setReplyTarget] = useState({ replyTarget: 'article', targetID: thisLocation }); // 최초 댓글 작성 대상 - 게시물
  const [didILikedThis, setLikedStatus] = useState(false);

  useEffect(() => {
    const thisItem = getCurrentArticle(thisLocation).then((res) => { return JSON.parse(res.title); });

    console.log(thisItem);
  });

  const iLikeThis = () => {
    let currentLike = didILikedThis;

    setLikedStatus(!currentLike);
  }

  return (
    <article id="detailContainer" className="rounded">
      <div id="detailImageContainer"> { /** 이미지 슬라이더 선택 렌더링으로 하나의 Detail 페이지를 재활용할 수 있을 것 같다. */ }
        <img className="detail-image" src={ !!articleObject.articleImageURL === true ? articleObject.articleImageURL : 'https://picsum.photos/400/300?random=1' } alt="나눔 제품 이미지" />

        { /** 이미지 미리보기 슬라이더 */ }
      </div>

      <dl id="detailSummary">
        <dt className="detail-title-area">
          <h2 className="detail-title">{ articleObject.title }</h2>

          <dl className="detail-item-info">
            <dd className="detail-item-name" data-item-info-label="나눔 제품명">
              { articleObject.shareItem.itemName }
            </dd>

            <dd className="detail-item-shipping" data-item-info-label="수거 방식">
              { articleObject.shareItem.shippingMethod }
            </dd>

            <dd className="detail-item-price" data-item-info-label="수거 비용">
              { articleObject.shareItem.shippingPrice.toLocaleString('ko-KR') } 원
            </dd>
          </dl>
        </dt>

        <dd className="detail-info-area">
          <div className="detail-user-tag">
            <div className="detail-user-image">
              <img src="https://picsum.photos/64/64?random=2" alt="사용자 프로필 사진" />
            </div>

            <p className="detail-user-name">{ articleObject.author.userName }</p>
          </div>

          <div className="detail-article-info">
            <p className="detail-info-date">
              <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 13H11V17H6V13Z"></path></svg>
              <span>{ articleObject.date }</span>
            </p>
            |
            <p className="detail-info-likes">
              <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
              <span>{ articleObject.likes }</span>
            </p>
            |
            <p className="detail-info-trees">
              <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M18 7C18 7.2624 17.9832 7.52086 17.9505 7.77437C19.7712 8.80457 21 10.7588 21 13C21 16.3137 18.3137 19 15 19C14.2987 19 13.6256 18.8797 13 18.6586V22H11V18.4003C10.2499 18.7837 9.40022 19 8.5 19C5.46243 19 3 16.5376 3 13.5C3 12.0474 3.56312 10.7263 4.48297 9.74318C4.87725 10.8232 5.49744 11.7944 6.28576 12.5989L7.71424 11.1991C6.99071 10.4607 6.45705 9.53767 6.1906 8.50688C6.06607 8.02541 6 7.5204 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7Z"></path></svg>
              <span>{ articleObject.treeCount }</span>
            </p>
          </div>
        </dd>
      </dl>

      <div className="separator"></div>

      <div id="detailText">
        { articleObject.articleText }
      </div>

      <div id="detailControls">
        <button id="btnLikeArticle" className={ didILikedThis ? 'liked' : null } onClick={ iLikeThis }>
          <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>

          <p>좋아요 <span>{ articleObject.likes }</span></p>
        </button>

        <button id="btnSendMessage">
          <p>나눔 신청</p>
        </button>
      </div>

      <div id="detailReply">
        <div className="detail-reply-counter">
          <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM20 19V8.99374C20 6.79539 18.2049 5 15.9993 5H8.00066C5.78458 5 4 6.78458 4 8.99374V15.0063C4 17.2046 5.79512 19 8.00066 19H20ZM14 11H16V13H14V11ZM8 11H10V13H8V11Z"></path></svg>

          <p>댓글 ( <span>{ articleObject.replies.length }</span> )</p>
        </div>

        <div id="articleReplyContainer">
          <ArticleReply replyObject={ articleObject.replies[0] }>
            <ArticleReply replyObject={ articleObject.replies[1] } />
            <ArticleReply replyObject={ articleObject.replies[1] } />
            <ArticleReply replyObject={ articleObject.replies[1] } />
            <ArticleReply replyObject={ articleObject.replies[1] } />
          </ArticleReply>

          { /** 댓글 아이템 컴포넌트 - 재귀를 통한 대댓글 구현 필요. 위는 예시 */ }
        </div>

        <form id="articleReplyEditor">
          <div>
            { /** 댓글이 대댓글인지 여부 체크 */ }
          </div>

          <textarea id="txtReplyInput" placeholder="댓글 입력..."></textarea>

          <button type="submit" id="btnSubmitReply">
            입력
          </button>
        </form>
      </div>
    </article>
  );
};

export default ProductDetail;