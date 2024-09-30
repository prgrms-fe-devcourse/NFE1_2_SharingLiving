const CardProducts = ({ type, itemObject }) => { // 아이템의 종류와 객체를 받아 출력한다.
    if (type === 'product') {
        return (
            <article className="card-item products">
                <div className="card-image-container">
                    <img className="card-image" src="" alt="나눔 제품 이미지" />

                    <div className="card-tags-container">
                        <div className="card-tag-item">
                            <p>좋아요</p>
                            <p>n</p>
                            <p>개</p>
                        </div>

                        <div className="card-tag-item">
                            <p>좋아요</p>
                            <p>n</p>
                            <p>개</p>
                        </div>
                    </div>
                </div>

                <div className="card-description-container">
                    <dl className="card-descriptions">
                        <dt className="card-title">제품명</dt>
                        <dd className="card-type">종류 (입력된 내용)</dd>
                        <dd className="card-price">
                            수거비용 <span>0</span> 원
                        </dd>
                    </dl>

                    <div className="card-info-container">
                        <span>나눔 지역</span>
                        <span>수거 방식</span>
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

                <div className="card-description-container">
                    <dl className="card-descriptions">
                        <dt className="card-title">분류 태그, 글 제목</dt>
                        <dd className="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at architecto tenetur cum quia fugiat, nostrum enim odio officiis quis consequatur tempora, in illo! Dolores earum at blanditiis! Fuga, nostrum.
                            Beatae, distinctio eaque mollitia repellat exercitationem maiores? Dignissimos vel amet odit perspiciatis cumque provident quasi nam facere, placeat quaerat. Doloribus distinctio quidem quis, adipisci quae reiciendis eum dignissimos id voluptates?
                            Iste exercitationem laboriosam ducimus vero cumque quibusdam at quis ea ex, dicta, provident ullam minus natus, autem perspiciatis. Sit rerum officia, suscipit eligendi voluptatibus sint error totam maxime in asperiores!
                            Eveniet, libero! Quia repudiandae asperiores, minima libero et dignissimos, quo, omnis autem itaque blanditiis voluptates similique error officiis veritatis neque nesciunt corrupti. Rerum molestiae suscipit harum ex cupiditate soluta. Cupiditate?
                            Velit distinctio, illo eos sunt quibusdam doloremque iusto fuga, praesentium id nulla quas. Tempore ex dolor, unde labore repellendus aperiam modi, doloribus, dolores esse fugiat eos magnam ducimus? Esse, doloribus?
                        </dd>
                    </dl>

                    <div className="card-info-container">
                        <div className="user-nametag">
                            <div>사진</div>
                            사용자명
                        </div>
                    </div>
                </div>
            </article>
        );
    }
};

export default CardProducts;