import React, { useEffect, useMemo, useState } from 'react';
import '../components/ProductList/scss/KnowledgeList.scss';
import CardProducts from '../components/items/CardProducts';
import KnowledgeSortingSelect from '../components/ProductList/component/KnowledgeSortingSelect';
import {
  getChannelList,
  getKnowledgeChannel,
} from '../components/authentication/utils/service/apiUtil';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

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

  const sortedByLikes = allKnowledgeList
    ? [...allKnowledgeList].sort((a, b) => b.likes.length - a.likes.length)
    : [];

  const knowledgeList =
    selectedCategory === 'likes' ? sortedByLikes : allKnowledgeList;

  const PAGE_LIMIT = 20;
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const postList = useMemo(
    () => (knowledgeList ? knowledgeList.slice(0, page * PAGE_LIMIT) : []),
    [knowledgeList, page]
  );

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <div>
      <KnowledgeSortingSelect />
      <div className="knowledgeCard-section">
        {postList?.map((knowledgeItem, index) => (
          <div
            className="knowledgeCard"
            key={index}
            {...(index === postList.length - 1 && { ref })}
          >
            <CardProducts type="knowledge" itemObject={knowledgeItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeList;
