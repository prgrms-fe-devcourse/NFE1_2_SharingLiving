import React from 'react';
import { useLocation } from 'react-router-dom';

const KnowledgeDetail = () => {
  const location = useLocation();
  const { knowledge } = location.state; // 상태에서 지식 정보 가져오기

  return (
    <div>
      <h1>지식 나눔 상세 페이지</h1>
      <p>제목: {knowledge.title}</p>
      <img src={knowledge.imageUrl} alt="지식 이미지" />
      {/* 지식에 대한 추가 정보 표시 가능 */}
    </div>
  );
};

export default KnowledgeDetail;