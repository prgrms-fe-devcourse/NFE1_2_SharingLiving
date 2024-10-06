import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ShareHistory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [productShares, setProductShares] = useState([
    {
      id: 1,
      name: '의자 나눔',
      treeCount: 10,
      selected: false,
      imageUrl: 'https://via.placeholder.com/150', // 제품 이미지 URL
    },
    {
      id: 2,
      name: '책상 나눔',
      treeCount: 5,
      selected: false,
      imageUrl: 'https://via.placeholder.com/150', // 제품 이미지 URL
    },
    {
      id: 3,
      name: '침대 나눔',
      treeCount: 18,
      selected: false,
      imageUrl: 'https://via.placeholder.com/150', // 제품 이미지 URL
    },
  ]);

  const [knowledgeShares, setKnowledgeShares] = useState([
    {
      id: 1,
      title: '프로그래밍 지식 나눔',
      imageUrl: 'https://via.placeholder.com/100', // 지식 이미지 URL (선택적)
    },
    {
      id: 2,
      title: '디자인 팁 나눔',
      imageUrl: 'https://via.placeholder.com/100',
    },
  ]);

  const [currentTab, setCurrentTab] = useState('products'); // 기본값을 'products'로 설정
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const tab = searchParams.get('tab') || 'products'; // URL 파라미터에서 탭 상태 가져오기
    setCurrentTab(tab);
    setIsLoading(false); // 탭 상태 설정 후 로딩 해제
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSearchParams({ tab });
  };

  const handleDeleteSelected = () => {
    setProductShares(productShares.filter((product) => !product.selected));
  };

  const handleSelectProduct = (id) => {
    setProductShares(
      productShares.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const handleDeleteAll = () => {
    setProductShares([]);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleKnowledgeClick = (knowledge) => {
    navigate(`/knowledge/${knowledge.id}`, { state: { knowledge } });
  };

  const handleDeleteKnowledge = (id) => {
    setKnowledgeShares(
      knowledgeShares.filter((knowledge) => knowledge.id !== id)
    );
  };

  // 로딩 중일 때 아무것도 렌더링하지 않음
  if (isLoading) {
    return null;
  }

  return (
    <div
      className="sharehistory-container"
      style={{ padding: '20px', maxWidth: '850px', margin: '0 auto' }}
    >
      <h1 className="title" style={{ fontSize: '30px' }}>
        나눔 이용 내역
      </h1>

      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => handleTabChange('products')}
          style={{
            backgroundColor: currentTab === 'products' ? '#4CAF50' : '#f0f0f0',
            color: currentTab === 'products' ? '#f0f0f0' : 'black',
            padding: '10px 20px',
            marginBottom: '5px',
          }}
        >
          제품 나눔 내역
        </button>
        <button
          onClick={() => handleTabChange('knowledge')}
          style={{
            backgroundColor: currentTab === 'knowledge' ? '#4CAF50' : '#f0f0f0',
            color: currentTab === 'knowledge' ? '#f0f0f0' : 'black',
            padding: '10px 20px',
            marginBottom: '5px',
          }}
        >
          지식 나눔 내역
        </button>
      </div>

      {currentTab === 'products' && (
        <section>
          <h2 style={{ marginBottom: '15px', fontSize: '25px' }}>
            제품 나눔 내역
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    width: '50px',
                  }}
                >
                  선택
                </th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>
                  제품명
                </th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>
                  나무 개수
                </th>
              </tr>
            </thead>
            <tbody>
              {productShares.map((product) => (
                <tr key={product.id}>
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </td>
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                      }}
                    />
                    {product.name}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                    {product.treeCount} 🌳
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleDeleteAll}
            style={{
              margin: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'red')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
          >
            전체 삭제
          </button>
          <button
            onClick={handleDeleteSelected}
            style={{
              margin: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#347235')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
          >
            선택 삭제
          </button>
        </section>
      )}

      {currentTab === 'knowledge' && (
        <section>
          <h2 style={{ marginBottom: '15px', fontSize: '25px' }}>
            지식 나눔 내역
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {knowledgeShares.map((knowledge) => (
              <div
                key={knowledge.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  margin: '10px',
                  padding: '10px',
                  width: 'calc(100% / 5 - 10px)',
                  textAlign: 'center',
                }}
              >
                <div
                  onClick={() => handleKnowledgeClick(knowledge)}
                  style={{ cursor: 'pointer' }}
                >
                  {knowledge.imageUrl && (
                    <img
                      src={knowledge.imageUrl}
                      alt={knowledge.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '5px',
                      }}
                    />
                  )}
                  <span>{knowledge.title}</span>
                </div>
                <div
                  onClick={() => handleDeleteKnowledge(knowledge.id)}
                  style={{ cursor: 'pointer', marginTop: '5px' }}
                >
                  ❤️
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ShareHistory;
