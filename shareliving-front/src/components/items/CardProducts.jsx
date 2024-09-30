const CardProducts = ({ type, itemObject }) => { // 아이템의 종류와 객체를 받아 출력한다.
    if (type === 'product') {
        return (
            <article className="card-item products">
                <div className="card-image-container">
                    <img className="card-image" src="" alt="나눔 제품 이미지" />

                    <div className="card-tags-container">
                        좋아요, 보호한 나무 그루 수
                    </div>
                </div>

                <div className="card-description-container">
                    <dl className="card-descriptions">
                        <dt>제품명</dt>
                        <dd>종류 (입력된 내용)</dd>
                        <dd>수거비용</dd>
                    </dl>

                    <div className="card-info-container">
                        나눔 지역, 수거 방식
                    </div>
                </div>
            </article>
        )
    } else if (type === 'knowledge') {
        return (
            <article className="card-item knowledge">
                <div className="card-image-container">
                    <img className="card-image" src="" alt="나눔 제품 이미지" />

                    <div className="card-tags-container">
                        좋아요 수
                    </div>
                </div>

                <div className="crd-description-container">
                    <dl className="card-descriptions">
                        <dt>분류 태그, 글 제목</dt>
                        <dd>내용 미리보기</dd>
                    </dl>

                    <div className="card-info-container">
                        사용자명
                    </div>
                </div>
            </article>
        );
    }
};

export default CardProducts;