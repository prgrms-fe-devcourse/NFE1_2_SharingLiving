import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TreeSlider.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${progress}%` }} // 프로그레스 바의 너비를 상태에 따라 설정
      />
    </div>
  );
};

const TreeSlider = () => {
  const [treesPlanted, setTreesPlanted] = useState(0); // 추가된 나무 수
  const [totalTreesPlanted, setTotalTreesPlanted] = useState(0); // 총 보호한 나무 수
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 상태 추가
  const [stickers, setStickers] = useState([]); // 스티커 상태 배열로 변경
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태 추가
  const sliderRef = useRef(null); // 슬라이더 참조 추가

  const totalCards = 3;

  // 레벨 계산: 나무를 30개 심을 때마다 레벨이 증가 (레벨은 0부터 시작)
  const treeLevel = Math.floor(totalTreesPlanted / 30);

  // 카드 이미지 생성
  const cards = Array.from({ length: totalCards }, (_, index) => ({
    id: index + 1,
    image: getCardImage(index),
  }));

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5, // 슬라이드 2.5개 보이도록 설정
    slidesToScroll: 1,
    afterChange: (current) => {
      setCurrentSlide(current); // 현재 슬라이드 업데이트
    },
  };

  function getCardImage(index) {
    // 총 심은 나무 수에 따른 레벨 이미지 결정 (레벨은 0부터 시작)
    return `/images/grow-tree/level-${treeLevel + 1}-tree${index + 1}.png`;
  }

  const handlePlantTree = () => {
    const nextTreesPlanted = treesPlanted + 1;
    setTreesPlanted(nextTreesPlanted);
    setTotalTreesPlanted((prevTotal) => {
      const newTotal = prevTotal + 1;
      localStorage.setItem('totalTreesPlanted', newTotal); // 로컬 스토리지에 총 보호한 나무 수 저장
      return newTotal;
    });

    if (nextTreesPlanted % 10 === 1 && nextTreesPlanted > 10) {
      const nextSlide = Math.floor(nextTreesPlanted / 10);
      sliderRef.current.slickGoTo(nextSlide); // 슬라이드 이동
    }

    // 레벨 4 도달 시 얼럿창 표시
    if (treeLevel + 1 === 4) {
      alert('레벨 4에 도달했습니다! 준비중입니다.'); // 얼럿창 표시
      setIsButtonDisabled(true);
    }

    // 스티커 지급 로직
    if (nextTreesPlanted % 30 === 0) {
      setIsButtonDisabled(true); // 버튼 비활성화
      setStickers((prevStickers) => {
        const newStickers = [
          ...prevStickers,
          `/images/grow-tree/level-${treeLevel + 1}.png`, // 스티커 지급 (현재 레벨에 맞춰)
        ];
        localStorage.setItem('stickers', JSON.stringify(newStickers)); // 로컬 스토리지에 스티커 저장
        return newStickers;
      });

      setTimeout(() => {
        setTreesPlanted(0); // 나무 수 초기화
        sliderRef.current.slickGoTo(0); // 슬라이드 리셋
        setIsButtonDisabled(false); // 버튼 활성화
      }, 2000); // 2초 후에 리셋
    }
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const storedTotalTrees = localStorage.getItem('totalTreesPlanted');
    const storedStickers = localStorage.getItem('stickers');

    if (storedTotalTrees) {
      const totalTrees = parseInt(storedTotalTrees, 10);
      setTotalTreesPlanted(totalTrees);
      setTreesPlanted(totalTrees % 30); // 현재 심은 나무 수를 총 나무 수에 따라 설정
    }

    if (storedStickers) {
      setStickers(JSON.parse(storedStickers));
    }
  }, []);

  // 나무 개수에 따른 hidden 클래스 적용
  const getCardClass = (index) => {
    if (treesPlanted >= 30) {
      return ''; // 30개 이상이면 모든 카드 보이기
    } else if (treesPlanted >= 20 && index === 1) {
      return index === 1 ? '' : 'hidden'; // 20개 이상이면 3번째 카드만 숨기기
    } else if (treesPlanted >= 10 && index >= 0) {
      return index === 0 ? '' : 'hidden'; // 10개 이상이면 1번째 카드 보이기
    } else {
      return 'hidden'; // 기본적으로 모든 카드는 hidden
    }
  };

  // hidden일 때 사용할 대체 이미지 경로
  const getPlaceholderImage = () => {
    return '/images/grow-tree/placeholder-tree.png'; // 대체 이미지 경로
  };

  // 프로그레스 바의 진행률 계산 (현재 심은 나무 수에 따라 백분율로 표시)
  const progress = (treesPlanted % 30) * (100 / 30);

  return (
    <div className="tree-slider">
      <button onClick={handlePlantTree} disabled={isButtonDisabled}>
        나무 심기
      </button>
      <h2>레벨 {treeLevel + 1}</h2> {/* 현재 레벨 표시 */}
      <ProgressBar progress={progress} /> {/* 프로그레스 바 추가 */}
      <Slider ref={sliderRef} {...settings}>
        {cards.map((card, index) => (
          <div key={card.id} className={`card ${getCardClass(index)}`}>
            <img
              src={
                getCardClass(index) === 'hidden'
                  ? getPlaceholderImage()
                  : card.image
              }
              alt={`Card ${card.id}`}
            />
          </div>
        ))}
      </Slider>
      <div>
        <p>현재 심은 나무 수: {treesPlanted}</p>
        <p>총 보호한 나무 수: {totalTreesPlanted}</p>
        {/* 총 보호한 나무 수 표시 */}
        {stickers.length > 0 && (
          <div>
            <p>받은 스티커:</p>
            <div className="stickers">
              {stickers.map((sticker, index) => (
                <img
                  key={index}
                  src={sticker}
                  alt={`Sticker ${index}`}
                  className="sticker-image"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeSlider;
