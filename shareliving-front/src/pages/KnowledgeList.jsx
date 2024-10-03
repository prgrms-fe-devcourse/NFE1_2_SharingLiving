import React, { useState } from 'react';
import '../components/ProductList/scss/KnowledgeList.scss';
import CardProducts from '../components/items/CardProducts';
import KnowledgeSortingSelect from '../components/ProductList/component/KnowledgeSortingSelect';
import {
  getChannelList,
  getKnowledgeChannel,
} from '../components/authentication/utils/service/apiUtil';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const KnowledgeList = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const { data: channels } = useQuery('channels', getChannelList);
  const channelId = channels?.find(({ name }) => name === 'knowledge')?._id;

  const { data: allKnowledgeList } = useQuery(
    'allKnowledgeList',
    () => getKnowledgeChannel(channelId),
    {
      enabled: !!channelId,
      select: (res) =>
        res.map((knowledge) => ({
          ...knowledge,
          ...JSON.parse(knowledge.title),
        })),
    }
  );

  const sortedByLates = allKnowledgeList?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const sortedByLikes = allKnowledgeList?.sort(
    (a, b) => b.likes.length - a.likes.length
  );

  const knowledgeList =
    selectedCategory === 'likes' ? sortedByLikes : sortedByLates;

  return (
    <div>
      <KnowledgeSortingSelect />
      <div className="knowledgeCard-section">
        {knowledgeList?.map((knowledgeItem, index) => (
          <div className="knowledgeCard" key={index}>
            <CardProducts type="knowledge" itemObject={knowledgeItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeList;
