import { useQuery } from 'react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

import { getChannelList, getProductChannel } from '../components/authentication/utils/service/apiUtil';

import CardProducts from './items/CardProducts';

const ProductSlider = () => {
  /** 최근 제품 나눔 글 가지고 오기 */

  const { data: channels } = useQuery('channels', getChannelList);
  const channelId = channels?.find(({ name }) => name === 'product')?._id;

  const { data: allProductsList } = useQuery('allProductsList', () => getProductChannel(channelId),
    {
      enabled: !!channelId,
      select: (res) => {
        const toTheLength = res.slice(res.length - 8, res.length); // 마지막 8개의 글 자르기

        return toTheLength.map((product) => ({ ...product, ...JSON.parse(product.title) }));
      },
    }
  );

  /** 최근 제품 나눔 글 가지고 오기 끝 */

  return (
    <Swiper
      modules={[ FreeMode, Pagination ]}
      slidesPerView={ 'auto' }
      spaceBetween={ 12 }
      freeMode={ true }
    >

      {
        allProductsList?.map((product, index) => (
          <SwiperSlide key={index}>
            <CardProducts type="product" itemObject={ product } />
          </SwiperSlide>
        ))
      }

    </Swiper>
  );
};

export default ProductSlider;