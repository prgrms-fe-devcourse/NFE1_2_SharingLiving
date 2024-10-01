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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium, accusantium illum obcaecati temporibus sint omnis accusamus. Non dolorem, nihil optio molestias facilis illum alias excepturi adipisci cum, maxime iure.
            Ab est hic accusantium ad quisquam sunt sequi, laudantium tempore vel totam. Magni, molestias, nostrum delectus incidunt sequi quia ullam quasi ratione quis dolores recusandae libero ea? Asperiores, molestiae excepturi!
            Ea provident enim in ut laborum, reprehenderit reiciendis, error consectetur veritatis, iste tempore harum. Fugiat reprehenderit delectus rem iste assumenda incidunt veritatis repudiandae molestias saepe. Totam possimus reiciendis aperiam delectus!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus quam itaque at suscipit voluptatibus officiis, esse veritatis qui reprehenderit doloribus atque nobis nostrum praesentium quisquam officia excepturi adipisci? Aliquam, ipsa.
            Eos nesciunt neque ab deleniti incidunt facere, odio expedita qui quas inventore? Pariatur sed illum ea quod omnis fuga ab autem dolore! Mollitia tempora nisi deleniti? Animi nihil a beatae.
            Error ratione expedita quibusdam enim id aperiam nam hic porro cumque in, possimus, dignissimos quos ullam doloremque praesentium perferendis dolorum ipsam necessitatibus at officiis, blanditiis adipisci! Assumenda deleniti nemo voluptates?
            Ipsam adipisci modi porro animi iusto nobis, veniam minus esse ipsa officia, repellat cupiditate veritatis autem corporis beatae? Culpa sit ullam quos et nobis perspiciatis soluta expedita natus inventore veritatis.
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