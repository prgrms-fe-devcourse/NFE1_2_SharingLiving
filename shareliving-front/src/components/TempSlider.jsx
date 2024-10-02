import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

import CardProducts from './items/CardProducts';

const TempSlider = () => {
  const splideOptions = {
    type: 'loop',
    perPage: 4,
    rewind: true,
    gap: '.6rem'
  }

  return (
    <Splide options={ splideOptions }>
      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>

      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>

      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>

      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>

      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>

      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>

      <SplideSlide>
        <CardProducts type="product" />
      </SplideSlide>
    </Splide>
  );
};

export default TempSlider;