const CardReview = ({ itemObject }) => { // 아이템의 데이터 객체를 받아 출력한다.
  return (
    <article className="review-item">
      <div className="review-image-container">
        <img className="review-image" src="https://picsum.photos/200/300?random=1" alt="후기 대표 이미지" />
      </div>

      <div className="review-description-container">
        <dl className="review-descriptions">
          <dt className="review-title-area">
            <div className="review-user-picture">
              <img src="https://picsum.photos/100/100?random=2" alt="사용자 프로파일 이미지" />
            </div>

            <div className="review-title-texts">
              <h4 className="review-title">리뷰 제목</h4>
              <p className="review-author">리뷰 작성자</p>
            </div>
          </dt>

          <dd className="review-text">
            나눔 후기 본문
          </dd>
        </dl>

        <div className="review-info-container">
          <p className="review-written-date">
            리뷰 작성일
          </p>
        </div>
      </div>
    </article>
  );
};

export default CardReview;