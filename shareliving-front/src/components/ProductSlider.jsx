import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

import CardProducts from './items/CardProducts';

const ProductSlider = () => {
  // 최근 글 가져오기 API 필요

  return (
    <Swiper
      modules={[ FreeMode, Pagination ]}
      slidesPerView={ 'auto' }
      spaceBetween={ 12 }
      freeMode={ true }
    >
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
      <SwiperSlide>
        <CardProducts type="product" />
      </SwiperSlide>
    </Swiper>
  );
};

export default ProductSlider;