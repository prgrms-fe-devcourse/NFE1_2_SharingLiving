import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state; // 상태에서 제품 정보 가져오기

  const getProdDetail = async (dataIndex) => { // 제품 정보 가지고 오기
    const response = await fetch('url', {})
      .then()

    return response;
  }

  return (
    <div>
      <h1>제품 나눔 상세 페이지</h1>
      <p>제품명: {product.name}</p>
      <p>나무 그루 수: {product.treeCount}</p>
      <img src={product.imageUrl} alt="제품 이미지" />
      {/* 제품에 대한 추가 정보 표시 가능 */}
    </div>
  );
};

export default ProductDetail;