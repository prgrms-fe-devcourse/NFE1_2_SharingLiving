import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCurrentArticle } from '../components/authentication/utils/service/apiUtil';

import ArticleReply from '../components/items/ArticleReply';

const articleObject = { // 초기 에상 데이터 구조
  dataID: '',
  dataType: 'article',
  title: '나눔글입니다',
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
    itemCategory: '가구',
    itemName: '의자',
    shippingMethod: '택배',
    shippingCompany: '데브택배',
    shippingCost: 2500,
    itemImages: [
      { imageURL: '' },
      { imageURL: '' },
      { imageURL: '' },
      { imageURL: '' },
      { imageURL: '' }
    ]
  },
  articleText: `
    작성글 본문 본문 본문
  `,
  replies: [
    {
      dataID: '',
      dataType: 'reply',
      userName: '댓글러',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'article',
        targetID: '1234'
      },
      replyText: `댓글 테스트`,
    },
    {
      dataID: '',
      dataType: 'reply',
      userName: '테스트',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'reply',
        targetID: '1234'
      },
      replyText: `대댓글`,
    },
    {
      dataID: '',
      dataType: 'reply',
      userName: '홍길동',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'reply',
        targetID: '1234'
      },
      replyText: `감사합니다`,
    },
    {
      dataID: '',
      dataType: 'reply',
      userName: '김유저',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'reply',
        targetID: '1234'
      },
      replyText: `좋은 글이네요`,
    },
    {
      dataID: '',
      dataType: 'reply',
      userName: '박복례',
      userID: '12535jjdsfc',
      writtenDate: '2024-09-13',
      replyTo: {
        replyTarget: 'reply',
        targetID: '1234'
      },
      replyText: `나무 많이 지키셨어요`,
    },
  ],
}

const DetailPage = ({ itemFrom }) => {
  const thisLocation = useLocation().pathname.split('/').pop(); // 현재 접근한 문서의 id
  const [currentReplyTarget, setReplyTarget] = useState({ replyTarget: 'article', targetID: thisLocation }); // 최초 댓글 작성 대상 - 게시물
  const [didILikedThis, setLikedStatus] = useState(false);

  const iLikeThis = () => {
    let currentLike = didILikedThis;

    setLikedStatus(!currentLike);
  }

  /**

  // 데이터 가져오기를 분리해도 일정 시간까지는 작동 이후 무조건 undefined로 변경되는 문제가 발생함
  // 따라서 상단의 임시 데이터로 데이터 출력

  const { data: postDetail } = useQuery('postDetail', () => getCurrentArticle(thisLocation), { // 글 전체 데이터
    enabled: !!thisLocation,
    select: (res) => res
  });

  const { data: postData } = useQuery('postData', () => getCurrentArticle(thisLocation), { // 글 주요 데이터
    enabled: !!thisLocation,
    select: (res) => JSON.parse(res.title)
  });

  console.log(postDetail);
  console.log(postData);

  */

  return (
    <article id="detailContainer" className="rounded">
      <div id="detailImageContainer">
        <img className="detail-image-backdrop" src={ articleObject.articleImageURL === true ? articleObject.articleImageURL : 'https://picsum.photos/400/300?random=1' } alt="나눔 제품 이미지" />
        <img className="detail-image" src={ articleObject.articleImageURL === true ? articleObject.articleImageURL : 'https://picsum.photos/400/300?random=1' } alt="나눔 제품 이미지" />

        { /** 작성글의 자료형에서 이미지가 단일 오브젝트로 되어 있어 슬라이더는 우선 보류 */ }
      </div>

      <dl id="detailSummary">
        <dt className="detail-title-area">
          <h2 className="detail-title">{ articleObject.title }</h2>
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

      { itemFrom === 'product' ?
        <dl className="detail-item-info">
          <dd className="detail-item-category" data-item-info-label="나눔 분류">
            { articleObject.shareItem.itemCategory }
          </dd>

          <dd className="detail-item-name" data-item-info-label="제품 분류">
            { articleObject.shareItem.itemName }
          </dd>

          <dd className="detail-item-shipping" data-item-info-label="수거 방식">
            { articleObject.shareItem.shippingMethod }
          </dd>

          <dd className="detail-item-company" data-item-info-label="수거 업체">
            { articleObject.shareItem.shippingCompany }
          </dd>

          <dd className="detail-item-price" data-item-info-label="수거 비용">
            { articleObject.shareItem.shippingCost.toLocaleString('ko-KR') } 원
          </dd>
        </dl> : null
      }

      <div id="detailText">
        { articleObject.articleText }
      </div>

      <div id="detailControls">
        <button id="btnLikeArticle" className={ didILikedThis ? 'liked' : null } onClick={ iLikeThis }>
          <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>

          <p>좋아요 <span>{ articleObject.likes }</span></p>
        </button>

        { itemFrom === 'product' ?
          <button id="btnSendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5002 2C12.2241 2 12.0002 2.22386 12.0002 2.5V12H10.0002V4.5C10.0002 4.22386 9.77634 4 9.5002 4C9.22405 4 9.0002 4.22386 9.0002 4.5V14C8.64653 14 7.00024 14 7.00024 14C6.61911 12.3792 5.64236 11.4407 4.5954 11.3216C4.87926 12.0664 5.36117 13.2592 6.16634 15.0995C7.02511 17.0622 7.89128 18.5218 9.00374 19.4986C10.0783 20.442 11.4586 21 13.5002 21C16.5378 21 19.0002 18.5377 19.0002 15.5002V7C19.0002 6.72386 18.7763 6.5 18.5002 6.5C18.2241 6.5 18.0002 6.72386 18.0002 7V12H16.0002V4C16.0002 3.72386 15.7763 3.5 15.5002 3.5C15.2241 3.5 15.0002 3.72386 15.0002 4V12H13.0002V2.5C13.0002 2.22386 12.7763 2 12.5002 2ZM21.0002 15.5002C21.0002 19.6424 17.6423 23 13.5002 23C11.0417 23 9.17214 22.308 7.68416 21.0015C6.23411 19.7283 5.22528 17.9381 4.33405 15.9012C3.40393 13.7753 2.89004 12.4804 2.60991 11.7235C2.25318 10.7597 2.74616 9.41212 4.08583 9.31846C5.24076 9.23771 6.22061 9.61249 7.0002 10.2587V4.5C7.0002 3.11929 8.11949 2 9.5002 2C9.68522 2 9.86554 2.0201 10.0391 2.05823C10.2477 0.888227 11.2702 0 12.5002 0C13.5602 0 14.4661 0.659694 14.8298 1.59091C15.0431 1.53167 15.268 1.5 15.5002 1.5C16.8809 1.5 18.0002 2.61929 18.0002 4V4.55001C18.1618 4.51722 18.329 4.5 18.5002 4.5C19.8809 4.5 21.0002 5.61929 21.0002 7V15.5002Z"></path></svg>

            <p>나눔 신청</p>
          </button> : null
        }
      </div>

      <div id="detailReply">
        <div className="detail-reply-counter">
          <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM20 19V8.99374C20 6.79539 18.2049 5 15.9993 5H8.00066C5.78458 5 4 6.78458 4 8.99374V15.0063C4 17.2046 5.79512 19 8.00066 19H20ZM14 11H16V13H14V11ZM8 11H10V13H8V11Z"></path></svg>

          <p>댓글 ( <span>{ articleObject.replies.length }</span> )</p>
        </div>

        <div id="articleReplyContainer">
          <ArticleReply replyObject={ articleObject.replies[0] }>
            <ArticleReply replyObject={ articleObject.replies[1] } />
            <ArticleReply replyObject={ articleObject.replies[2] } />
            <ArticleReply replyObject={ articleObject.replies[3] } />
            <ArticleReply replyObject={ articleObject.replies[4] } />
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

export default DetailPage;