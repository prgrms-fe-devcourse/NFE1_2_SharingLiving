const CardProducts = ({ type, itemObject }) => { // 아이템의 종류와 데이터 객체를 받아 출력한다.
    if (type === 'product') {
        return (
            <article className="card-item products">
                <div className="card-image-container">
                    <img className="card-image" src="https://picsum.photos/200/300?random=1" alt="나눔 제품 이미지" />

                    <div className="card-tags-container">
                        <div className="card-tag-item likes">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
                            <p className="tag-item-hidden">좋아요</p>
                            <p className="tag-item-data">n</p>
                            <p className="tag-item-hidden">개</p>
                        </div>

                        <div className="card-tag-item trees">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M18 7C18 7.2624 17.9832 7.52086 17.9505 7.77437C19.7712 8.80457 21 10.7588 21 13C21 16.3137 18.3137 19 15 19C14.2987 19 13.6256 18.8797 13 18.6586V22H11V18.4003C10.2499 18.7837 9.40022 19 8.5 19C5.46243 19 3 16.5376 3 13.5C3 12.0474 3.56312 10.7263 4.48297 9.74318C4.87725 10.8232 5.49744 11.7944 6.28576 12.5989L7.71424 11.1991C6.99071 10.4607 6.45705 9.53767 6.1906 8.50688C6.06607 8.02541 6 7.5204 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7Z"></path></svg>
                            <p className="tag-item-hidden">보호한 나무</p>
                            <p className="tag-item-data">n</p>
                            <p className="tag-item-hidden">그루</p>
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
                    <img className="card-image" src="https://picsum.photos/200/300?random=1" alt="나눔 제품 이미지" />

                    <div className="card-tags-container">
                        <div className="card-tag-item likes">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
                            <p className="tag-item-hidden">좋아요</p>
                            <p className="tag-item-data">n</p>
                            <p className="tag-item-hidden">개</p>
                        </div>
                    </div>
                </div>

                <div className="card-description-container">
                    <dl className="card-descriptions">
                        <dt className="card-title">
                            <div className="card-category-tag">분류 태그</div>

                            <h4 className="card-title-text">글 제목</h4>
                        </dt>

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
                            <div className="user-nametag-picture">
                                <img src="https://picsum.photos/100/100?random=2" alt="사용자 프로파일 이미지" />
                            </div>

                            <p className="user-nametag-name">사용자명</p>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <div>
            데이터 형식이 잘못되었습니다.
        </div>
    )
};

export default CardProducts;