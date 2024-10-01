import React, { useState } from 'react';
import './knowledge.scss';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import axios from 'axios';

const KnowledgeWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('knowledge');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'product') {
      navigate('/add-product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({
        title,
        category,
        type,
        description,
      })
    );

    if (images) {
      formData.append('image', images[0]);
    } else {
      formData.append('image', null);
    }

    formData.append('channelId', '66fb6b7fa43c32148e509529');

    try {
      const response = await axios.post(
        'https://kdt.frontend.5th.programmers.co.kr:5003/posts/create',
        formData,
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTNmOTQzNTU4MTFmZWNkYzg0MyIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3Nzk4MDY3fQ.1xNOBXJzCCDt9Ov_KnFYq5_yQ66vkn8au-ZNoN1thhU', 
          },
        }
      );
      console.log(response.data);
      // navigate('/');
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <div className="knowledge-wrapper">
      <h1 className="title">나눔지식 등록 페이지</h1>
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
            onChange={handleCategoryChange}
          >
            <option value="knowledge">지식</option>
            <option value="product">제품</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input-type" className="form-label">지식 유형</label>
          <input
            type="text"
            id="input-type"
            className="input-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="1인가구, 원룸, 청소"
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

export default KnowledgeWrite;
