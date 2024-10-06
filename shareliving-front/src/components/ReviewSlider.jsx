import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

import CardReview from './items/CardReview';

const ReviewSlider = () => {
  // 최근 글 가져오기 API 필요

  return (
    <Swiper
      modules={[ FreeMode, Pagination ]}
      slidesPerView={ 'auto' }
      spaceBetween={ 12 }
      freeMode={ true }
    >
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
      <SwiperSlide>
        <CardReview />
      </SwiperSlide>
    </Swiper>
  );
};

export default ReviewSlider;