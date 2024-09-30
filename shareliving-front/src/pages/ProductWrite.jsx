import React, { useState } from 'react';
import './product.scss';
import { useNavigate } from 'react-router-dom';

const ProductWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('furniture');
  const [region, setRegion] = useState('');
  const [collection, setCollection] = useState('');
  const [pickupCompany, setPickupCompany] = useState('');
  const [pickupCost, setPickupCost] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="knowledge-wrapper">
      <h1 className="title">나눔제품 등록 페이지</h1>
      <div className="content">
        <div className="image-upload">
          <div className="upload-button">
            <span className="plus-icon">+</span>
            <span className="image-count">0/5</span>
          </div>
        </div>
      </div>
      <form className="knowledge-form">
        <div className="form-group">
          <label htmlFor="input-title" className="form-label">글 제목</label>
          <input
            type="text"
            id="input-title"
            className="input-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropdown" className="form-label">제품 카테고리 선택</label>
          <select
            id="dropdown"
            className="dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="furniture">가구</option>
            <option value="appliances">가전</option>
            <option value="life">생활</option>
            <option value="etc">기타</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input-type" className="form-label">지역</label>
          <input
            type="text"
            id="input-type"
            className="input-type"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropdown" className="form-label">수거 방법</label>
          <select
            id="dropdown"
            className="dropdown"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          >
            <option value="direct">직접 수거</option>
            <option value="company">수거 업체 이용</option>
            <option value="all">둘 다 가능</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="input-pickupCompany" className="form-label">수거 업체</label>
          <input
            type="text"
            id="input-pickupCompany"
            className="input-title"
            value={pickupCompany}
            onChange={(e) => setPickupCompany(e.target.value)}
            placeholder="수거 업체를 입력하세요"
          />

          <label htmlFor="input-pickupCost" className="form-label">수거 비용</label>
          <input
            type="text"
            id="input-pickupCost"
            className="input-title"
            value={pickupCost}
            onChange={(e) => setPickupCost(e.target.value)}
            placeholder="수거 비용을 입력하세요"
          />

          <button type="button" className="cancel-button">취소</button>
        </div>

        <div className="form-group form-group—textarea">
          <label htmlFor="input-description" className="form-label">소개글</label>
          <textarea
            id="input-description"
            className="input-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="소개글을 입력하세요"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => {navigate('/');}}>취소</button>
          <button type="submit" className="submit-button">등록</button>
        </div>
      </form>
    </div>
  );
};

export default ProductWrite;
