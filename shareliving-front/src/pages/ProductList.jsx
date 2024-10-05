import React, { useEffect } from 'react';
import '../components/ProductList/scss/ProductList.scss';
import CardProducts from '../components/items/CardProducts';
import ProductCategorySelect from '../components/ProductList/component/ProductCategorySelect';
import {
  getAllSearchResult,
  getChannelList,
  getProductChannel,
} from '../components/authentication/utils/service/apiUtil';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PAGE_LIMIT = 20;

const ProductList = () => {
  // const currentContext = useAppContext();
  // currentContext.setShowBreadcrumbs(true);

  const [ref, inView] = useInView();

  const { data: channels } = useQuery('channels', getChannelList);
  const channelId = channels?.find(({ name }) => name === 'product')?._id;

  const { data: allProductsList, fetchNextPage } = useInfiniteQuery(
    ['allProductsList', channelId],
    ({ pageParam = 0 }) => getProductChannel(channelId, pageParam, PAGE_LIMIT),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < PAGE_LIMIT) {
          return undefined;
        }
        return pages.length * PAGE_LIMIT;
      },
      enabled: !!channelId,
      select: (data) => ({
        pages: data.pages.flat().map((product) => ({
          ...product,
          ...JSON.parse(product.title),
        })),
        pageParams: data.pageParams,
      }),
    }
  );

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const { data: filteredProductList } = useInfiniteQuery(
    ['filteredProductList', selectedCategory],
    ({ pageParam = 0 }) =>
      getAllSearchResult(
        `\"category2\":\"${selectedCategory}\"`,
        pageParam,
        PAGE_LIMIT
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < PAGE_LIMIT) {
          return undefined;
        }
        return pages.length * PAGE_LIMIT;
      },
      enabled: !!selectedCategory && selectedCategory !== 'all',
      select: (data) => ({
        pages: data.pages.flat().map((product) => ({
          ...product,
          ...JSON.parse(product.title),
        })),
        pageParams: data.pageParams,
      }),
    }
  );

  const productList =
    selectedCategory && selectedCategory !== 'all'
      ? filteredProductList
      : allProductsList;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <ProductCategorySelect />
      <div className="productCard-section">
        {productList?.pages.map((product, index) => (
          <div
            className="productCard"
            key={index}
            {...(index === productList.pages.length - 1 && { ref })}
          >
            <CardProducts type="product" itemObject={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
