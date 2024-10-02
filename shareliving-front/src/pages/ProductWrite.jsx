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
  const [category2, setCategory2] = useState('Desk');
  const [tree, setTree] = useState(0);
  const [region, setRegion] = useState('');
  const [collection, setCollection] = useState('');
  const [pickupCompany, setPickupCompany] = useState(''); 
  const [pickupCost, setPickupCost] = useState(''); 
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); 

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    if (selectedCategory === 'knowledge') {
      navigate('/add-knowledge');
    }
  };

  const handleCategoryChange2 = (e) => {
    const selectedCategory = e.target.value;
    setCategory2(selectedCategory);
    switch (selectedCategory) {
      case 'Table':
        setTree(3);
        break;
      case 'Shelf':
        setTree(2);
        break;
      case 'Sofa':
        setTree(2);
        break;
      case 'Dining table':
        setTree(2);
        break;
      case 'Chair':
        setTree(1);
        break;
      case 'Desk':
        setTree(2);
        break;
      case 'Bookshelf':
        setTree(2);
        break;
      case 'Closet':
        setTree(3);
        break;
      case 'Bed':
        setTree(3);
        break;
      case 'Clothes rack':
        setTree(1);
        break;
      default:
        setTree(0);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', JSON.stringify({
      title,
      category,
      category2,
      tree,
      region,
      collection,
      pickupCompany,
      pickupCost,
      description,
    }));

    if (images) {
      formData.append('image', images[0]);
    } else {
      formData.append('image', null);
    }

    formData.append('channelId', '66fb6b7fa43c32148e509529');
    
    try {
      const response = await axios.post('https://kdt.frontend.5th.programmers.co.kr:5003/posts/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}` 
        },
      });
      console.log(response.data);
      // navigate('/');
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
          <label htmlFor="dropdown" className="form-label">나눔 분류 선택</label>
          <select
            id="dropdown"
            className="dropdown"
            value={category}
            onChange= {handleCategoryChange}
          >
            <option value="knowledge">지식</option>
            <option value="product">제품</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dropdown" className="form-label">제품 카테고리 선택</label>
          <select
            id="dropdown"
            className="dropdown"
            value={category2}
            onChange={handleCategoryChange2}
          >
            <option value="Table">탁자</option>
            <option value="Shelf">선반</option>
            <option value="Sofa">소파</option>
            <option value="Dining table">식탁</option>
            <option value="Chair">의자</option>
            <option value="Desk">책상</option>
            <option value="Bookshelf">책장</option>
            <option value="Closet">옷장</option>
            <option value="Bed">침대</option>
            <option value="Clothes rack">행거</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input-type" className="form-label">지역</label>
          <input
            type="text"
            id="input-type"
            className="input-type"
            placeholder="시/군/구를 입력해주세요"
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
        </div>

        <div className="form-group form-group--textarea">
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
