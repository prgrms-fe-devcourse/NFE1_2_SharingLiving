import React, { useState } from 'react';
import '../components/ProductList/scss/ProductList.scss';
import CardProducts from '../components/items/CardProducts';
import ProductCategorySelect from '../components/ProductList/component/ProductCategorySelect';
import {
  getAllSearchResult,
  getChannelList,
  getProductChannel,
} from '../components/authentication/utils/service/apiUtil';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const { data: channels } = useQuery('channels', getChannelList);
  const channelId = channels?.find(({ name }) => name === 'product')?._id;

  const { data: allProductsList } = useQuery(
    'allProductsList',
    () => getProductChannel(channelId),
    {
      enabled: !!channelId,
      select: (res) =>
        res.map((product) => ({
          ...product,
          ...JSON.parse(product.title),
        })),
    }
  );

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const { data: filteredProductList } = useQuery(
    ['filteredProductList', selectedCategory],
    () => getAllSearchResult(`\"category2\":\"${selectedCategory}\"`),
    {
      enabled: !!selectedCategory && selectedCategory !== 'all',
      select: (res) =>
        res.map((product) => ({
          ...product,
          ...JSON.parse(product.title),
        })),
    }
  );

  const productList =
    selectedCategory && selectedCategory !== 'all'
      ? filteredProductList
      : allProductsList;

  return (
    <div>
      <ProductCategorySelect />
      <div className="productCard-section">
        {productList?.map((product, index) => (
          <div className="productCard" key={index}>
            <CardProducts type="product" itemObject={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
