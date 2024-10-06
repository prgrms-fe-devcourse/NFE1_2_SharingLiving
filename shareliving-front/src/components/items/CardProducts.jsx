import { Link } from 'react-router-dom';

const CardProducts = ({ type, itemObject }) => {
  // 아이템의 종류와 데이터 객체를 받아 출력한다.
  if (type === 'product') {
    return (
      <article className="card-item products">
        <div className="card-image-container">
          <Link to={ '/product/' + itemObject._id }>
            <img
              className="card-image"
              src={itemObject.image}
              alt="나눔 제품 이미지"
            />
          </Link>

          <div className="card-tags-container">
            <div className="card-tag-item likes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icons"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
              </svg>
              <p className="tag-item-hidden">좋아요</p>
              <p className="tag-item-data">{ itemObject.likes.length }</p>
              <p className="tag-item-hidden">개</p>
            </div>

            <div className="card-tag-item trees">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icons"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 7C18 7.2624 17.9832 7.52086 17.9505 7.77437C19.7712 8.80457 21 10.7588 21 13C21 16.3137 18.3137 19 15 19C14.2987 19 13.6256 18.8797 13 18.6586V22H11V18.4003C10.2499 18.7837 9.40022 19 8.5 19C5.46243 19 3 16.5376 3 13.5C3 12.0474 3.56312 10.7263 4.48297 9.74318C4.87725 10.8232 5.49744 11.7944 6.28576 12.5989L7.71424 11.1991C6.99071 10.4607 6.45705 9.53767 6.1906 8.50688C6.06607 8.02541 6 7.5204 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7Z"></path>
              </svg>
              <p className="tag-item-hidden">보호한 나무</p>
              <p className="tag-item-data">{ itemObject.tree }</p>
              <p className="tag-item-hidden">그루</p>
            </div>
          </div>
        </div>

        <div className="card-description-container">
          <dl className="card-descriptions">
            <dt className="card-title">
              <Link to={ '/product/' + itemObject._id }>{ itemObject.title }</Link>
            </dt>

            <dd className="card-type">
              <Link to={ '/product/' + itemObject._id }>{ itemObject.description }</Link>
            </dd>

            <dd className="card-price">
              수거비용 <span>{Number(itemObject.pickupCost).toLocaleString('ko-KR')}</span> 원
            </dd>
          </dl>

          <div className="card-info-container">
            <span>{itemObject.region}</span>
            <span>{itemObject.pickupMethod}</span>
          </div>
        </div>
      </article>
    );
  } else if (type === 'knowledge') {
    return (
      <article className="card-item knowledge">
        <div className="card-image-container">
          <Link to={ '/knowledge/' + itemObject._id }>
            <img
              className="card-image"
              src={itemObject.image}
              alt="나눔 제품 이미지"
            />
          </Link>

          <div className="card-tags-container">
            <div className="card-tag-item likes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icons"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
              </svg>
              <p className="tag-item-hidden">좋아요</p>
              <p className="tag-item-data">{itemObject.likes.length}</p>
              <p className="tag-item-hidden">개</p>
            </div>
          </div>
        </div>

        <div className="card-description-container">
          <dl className="card-descriptions">
            <dt className="card-title">
              <div className="card-category-tag">
                <Link to={ '/knowledge/' + itemObject._id }>{ itemObject.type ? itemObject.type : '분류 없음' }</Link>
              </div>

              <h4 className="card-title-text">
                <Link to={ '/knowledge/' + itemObject._id }>{ itemObject.title }</Link>
              </h4>
            </dt>

            <dd className="card-text">
              <Link to={ '/knowledge/' + itemObject._id }>{ itemObject.description }</Link>
            </dd>
          </dl>

          <div className="card-info-container">
            <div className="user-nametag">
              <div className="user-nametag-picture">
                <img
                  className="user-img"
                  src={itemObject.author.image}
                  alt="사용자 프로필 사진"
                />
              </div>

              <p className="user-name">{itemObject.author.username}</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return <div>데이터 형식이 잘못되었습니다.</div>;
};

export default CardProducts;
