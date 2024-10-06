import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TreeSlider.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className="tree-slider__progress-bar">
      <div
        className="tree-slider__progress"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const TREE_IMAGES = {
  PLACEHOLDER: '/images/grow-tree/placeholder-tree.png',
  getLevelImage: (level) => `/images/grow-tree/level-${level}.png`,
  getCardImage: (level, index) => `/images/grow-tree/tree${index + 1}.png`,
};

const TreeSlider = () => {
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [totalTreesPlanted, setTotalTreesPlanted] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stickers, setStickers] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const sliderRef = useRef(null);

  const totalCards = 5;
  const treeLevel = Math.floor(totalTreesPlanted / 25);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    afterChange: setCurrentSlide,
  };

  const cards = Array.from({ length: totalCards }, (_, index) => ({
    id: index + 1,
    image: TREE_IMAGES.PLACEHOLDER,
  }));

  const handlePlantTree = () => {
    const nextTreesPlanted = treesPlanted + 1;
    setTreesPlanted(nextTreesPlanted);
    updateTotalTreesPlanted();

    if (nextTreesPlanted % 5 === 1 && nextTreesPlanted > 5) {
      const nextSlide = Math.floor(nextTreesPlanted / 5);
      sliderRef.current.slickGoTo(nextSlide);
    }

    if (nextTreesPlanted % 25 === 0) {
      awardSticker();
    }
  };

  const updateTotalTreesPlanted = () => {
    setTotalTreesPlanted((prevTotal) => {
      const newTotal = prevTotal + 1;
      localStorage.setItem('totalTreesPlanted', newTotal);
      return newTotal;
    });
  };

  const awardSticker = () => {
    setIsButtonDisabled(true);
    const newSticker = TREE_IMAGES.getLevelImage(treeLevel + 1);

    setStickers((prevStickers) => {
      const updatedStickers = [...prevStickers, newSticker];
      localStorage.setItem('stickers', JSON.stringify(updatedStickers));
      return updatedStickers;
    });

    setTimeout(() => {
      resetTreePlanting();
    }, 2000);
  };

  const resetTreePlanting = () => {
    setTreesPlanted(0);
    sliderRef.current.slickGoTo(0);
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    const storedTotalTrees = localStorage.getItem('totalTreesPlanted');
    const storedStickers = localStorage.getItem('stickers');

    if (storedTotalTrees) {
      const totalTrees = parseInt(storedTotalTrees, 10);
      setTotalTreesPlanted(totalTrees);
      setTreesPlanted(totalTrees % 25);
    }

    if (storedStickers) {
      setStickers(JSON.parse(storedStickers));
    }
  }, []);

  const getCardClass = (index) => {
    if (treesPlanted >= 25) return '';
    if (treesPlanted >= 20 && index === 3) return '';
    if (treesPlanted >= 15 && index >= 2)
      return index === 2 ? '' : 'tree-slider__card--hidden';
    if (treesPlanted >= 10 && index === 1)
      return index === 1 ? '' : 'tree-slider__card--hidden';
    if (treesPlanted >= 5 && index >= 0)
      return index === 0 ? '' : 'tree-slider__card--hidden';
    return 'tree-slider__card--hidden';
  };

  const progress = (treesPlanted % 25) * (100 / 25);

  return (
    <div className="tree-slider">
      <button
        className="tree-slider__button"
        onClick={handlePlantTree}
        disabled={isButtonDisabled}
      >
        나무 심기
      </button>
      <h2 className="tree-slider__level">레벨 {treeLevel + 1}</h2>
      <ProgressBar progress={progress} />
      <Slider ref={sliderRef} {...settings}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`tree-slider__card ${getCardClass(index)}`}
          >
            <img
              src={
                getCardClass(index) !== 'tree-slider__card--hidden'
                  ? TREE_IMAGES.getCardImage(treeLevel, index)
                  : TREE_IMAGES.PLACEHOLDER
              }
              alt={`Card ${card.id}`}
              className="tree-slider__card-image"
            />
          </div>
        ))}
      </Slider>
      <div className="tree-slider__status">
        <p className="tree-slider__current-trees">
          현재 심은 나무 수: {treesPlanted}
        </p>
        <p className="tree-slider__total-trees">
          총 보호한 나무 수: {totalTreesPlanted}
        </p>
        {stickers.length > 0 && (
          <div className="tree-slider__stickers">
            <p>받은 스티커:</p>
            <div className="tree-slider__stickers-container">
              {stickers.map((sticker, index) => (
                <img
                  key={index}
                  src={sticker}
                  alt={`Sticker ${index}`}
                  className="tree-slider__sticker-image"
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
