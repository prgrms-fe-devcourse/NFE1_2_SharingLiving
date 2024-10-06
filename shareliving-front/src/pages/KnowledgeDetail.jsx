import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const KnowledgeDetail = () => {
  const thisLocation = useLocation().pathname.split('/').pop(); // 현재 접근한 문서의 id
  const currentContext = useAppContext();

  currentContext.setShowBreadcrumbs(true);

  const knowledge = {
    title: 'ㅇㅇㅇ',
    treeCount: 3,
    imageUrl: '/'
  }

  return (
    <div>
      <h1>지식 나눔 상세 페이지</h1>
      <p>제목: {knowledge.title}</p>
      <img src={knowledge.imageUrl} alt="지식 이미지" />

      { thisLocation }
    </div>
  );
};

export default KnowledgeDetail;