import React, { useState } from 'react';
import './product.scss';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader'; // 이미지 업로더 컴포넌트
import axios from 'axios';

const ProductWrite = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('product');
  const [category2, setCategory2] = useState('furniture');
  const [product, setProduct] = useState('Desk');
  const [tree, setTree] = useState(0);
  const [region, setRegion] = useState('');
  const [pickupMethod, setPickupMethod] = useState('');
  const [pickupCompany, setPickupCompany] = useState('');
  const [pickupCost, setPickupCost] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const productOptions = {
    furniture: [
      { label: '탁자', value: 'Table', tree: 3 },
      { label: '선반', value: 'Shelf', tree: 2 },
      { label: '소파', value: 'Sofa', tree: 2 },
      { label: '식탁', value: 'Dining table', tree: 2 },
      { label: '의자', value: 'Chair', tree: 1 },
      { label: '책상', value: 'Desk', tree: 2 },
      { label: '책장', value: 'Bookshelf', tree: 2 },
      { label: '옷장', value: 'Closet', tree: 3 },
      { label: '침대', value: 'Bed', tree: 3 },
      { label: '행거', value: 'Clothes rack', tree: 1 },
    ],
    appliances: [
      { label: '냉장고', value: 'Refrigerator', tree: 3 },
      { label: 'TV', value: 'TV', tree: 3 },
      { label: '전자레인지', value: 'Microwave', tree: 2 },
      { label: '오븐', value: 'Oven', tree: 2 },
      { label: '식기세척기', value: 'Dishwasher', tree: 2 },
      { label: '커피머신', value: 'Coffee machine', tree: 1 },
      { label: '건조기', value: 'Dryer', tree: 2 },
      { label: '세탁기', value: 'Washing machine', tree: 3 },
      { label: '청소기', value: 'Vacuum cleaner', tree: 2 },
      { label: '공기청정기', value: 'Air purifier', tree: 2 },
      { label: '에어컨', value: 'Air conditioner', tree: 3 },
      { label: '기타', value: 'Etc', tree: 2 },
    ],
    life: [
      { label: '청소용품', value: 'Cleaning supplies', tree: 2 },
      {
        label: '세탁 및 위생용품',
        value: 'Laundry and hygiene products',
        tree: 2,
      },
      { label: '주방용품', value: 'Kitchenware', tree: 2 },
      { label: '욕실용품', value: 'Bathroom supplies', tree: 2 },
      { label: '수납용품', value: 'Storage supplies', tree: 2 },
      { label: '사무용품', value: 'Office supplies', tree: 2 },
    ],
    etc: [{ label: '기타용품', value: 'Other supplies', tree: 2 }],
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'knowledge') {
      navigate('/add-knowledge');
    }
  };

  const handleCategoryChange2 = (e) => {
    setCategory2(e.target.value);
    setProduct('');
  };

  const handleProductChange = (e) => {
    const selectedProduct = productOptions[category2].find(
      (product) => product.value === e.target.value
    );
    setProduct(selectedProduct.value);
    setTree(selectedProduct.tree);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({
        title,
        category,
        category2,
        product,
        tree,
        region,
        pickupMethod,
        pickupCompany,
        pickupCost,
        description,
      })
    );

    if (images) {
      formData.append('image', images[0]);
    } else {
      formData.append('image', null);
    }

    formData.append('channelId', '66fc9a346c571835b6423ad7');

    try {
      const response = await axios.post(
        'https://kdt.frontend.5th.programmers.co.kr:5003/posts/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate('/product');
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <div className="knowledge-wrapper">
      <h1 className="title">나눔제품 등록 페이지</h1>
      <ImageUploader images={images} setImages={setImages} />
      <form className="knowledge-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input-title" className="form-label">
            글 제목
          </label>
          <input
            type="text"
            id="input-title"
            className="input-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
          />
        </div>

        <div className="form-line">
          <div className="form-group">
            <label htmlFor="dropdown" className="form-label">
              나눔 분류 선택
            </label>
            <select
              id="dropdown"
              className="dropdown"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="knowledge">지식</option>
              <option value="product">제품</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dropdown" className="form-label">
              제품 카테고리 선택
            </label>
            <select
              id="dropdown"
              className="dropdown"
              value={category2}
              onChange={handleCategoryChange2}
            >
              <option value="furniture">가구</option>
              <option value="appliances">가전</option>
              <option value="life">생활</option>
              <option value="etc">기타</option>
            </select>
          </div>
        </div>

        <div className="form-line">
          <div className="form-group">
            <label htmlFor="dropdown" className="form-label">
              나눔 제품 선택
            </label>
            <select
              id="dropdown"
              className="dropdown"
              value={product}
              onChange={handleProductChange}
              disabled={!category2}
            >
              <option value="" disabled>
                제품을 선택하세요
              </option>
              {category2 &&
                productOptions[category2].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="input-type" className="form-label">
              지역
            </label>
            <input
              type="text"
              id="input-type"
              className="input-type"
              placeholder="시/군/구를 입력해주세요"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dropdown" className="form-label">
            수거 방법
          </label>
          <select
            id="dropdown"
            className="dropdown"
            value={pickupMethod}
            onChange={(e) => setPickupMethod(e.target.value)}
          >
            <option value="direct">직접 수거</option>
            <option value="company">수거 업체 이용</option>
            <option value="all">둘 다 가능</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input-pickupCompany" className="form-label">
            수거 업체
          </label>
          <input
            type="text"
            id="input-pickupCompany"
            className="input-title"
            value={pickupCompany}
            onChange={(e) => setPickupCompany(e.target.value)}
            placeholder="수거 업체를 입력하세요"
          />

          <label htmlFor="input-pickupCost" className="form-label">
            수거 비용
          </label>
          <input
            type="text"
            id="input-pickupCost"
            className="input-title"
            value={pickupCost}
            onChange={(e) => setPickupCost(e.target.value)}
            placeholder="수거 비용을 입력하세요"
          />
        </div>

        <div className="form-group form-group--textarea">
          <label htmlFor="input-description" className="form-label">
            소개글
          </label>
          <textarea
            id="input-description"
            className="input-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="소개글을 입력하세요"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              navigate('/');
            }}
          >
            취소
          </button>
          <button type="submit" className="submit-button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductWrite;
