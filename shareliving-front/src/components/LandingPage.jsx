import { useQuery } from 'react-query';
import { getChannelList, getKnowledgeChannel } from '../components/authentication/utils/service/apiUtil';

import LandingSectionTitle from './LandingSectionTitle';
import ProductSlider from './ProductSlider';
import ReviewSlider from './ReviewSlider';
import CardProducts from './items/CardProducts';

const LandingPage = () => {
  /** 최근 지식 나눔 글 가지고 오기 */

  const { data: channels } = useQuery('channels', getChannelList);
  const channelId = channels?.find(({ name }) => name === 'knowledge')?._id;

  const { data: allKnowledgeList } = useQuery('allKnowledgeList', () => getKnowledgeChannel(channelId),
    {
      enabled: !!channelId,
      select: (res) => {
        const toTheLength = res.slice(0, res.length); // 임시 길이 - 최종적으로는 최근 글 3개가 적당할 것

        return toTheLength.map((knowledge) => ({ ...knowledge, ...JSON.parse(knowledge.title) }));
      },
    }
  );

  /** 최근 지식 나눔 글 가지고 오기 끝 */

  return (
    <>
      <div className="landing-page-aligner">
        <section id="secHero">
          <div className="hero-slide-item">
            <div className="slide-insert">
              <p>내 손으로 자연을 보호하는 가장 따뜻한 방법</p>
              <h2>나누리빙</h2>

              <p>여러분의 나눔으로 몇 그루의 나무가 보호되었어요.</p>
            </div>
          </div>
        </section>

        <section id="secBanners">
          배너 등이 들어갈 수 있는 더미 공간 - 제거해도 무관
        </section>

        <section id="secShareProducts">
          <LandingSectionTitle secDesc="사용한 물건에 새로운 가치를 부여해 보세요." secTitle="물품 나눔" secGoto="/product" />

          <div className="section-content product-list">
            <ProductSlider />
          </div>
        </section>

        <section id="secShareKnowledge">
          <LandingSectionTitle secDesc="나만 알고 있는 생활의 지식을 나누어 보세요." secTitle="생활 지식 나눔" secGoto="/knowledge" />

          <div className="section-content knowledge-list">
            {
              allKnowledgeList?.map((knowledge, index) => (
                <div key={index}>
                  <CardProducts type="knowledge" itemObject={ knowledge } />
                </div>
              ))
            }
          </div>
        </section>

        <section id="secInfoBanner">
          이용 안내글로 이동하는 배너
        </section>

        <section id="secReviews">
          <LandingSectionTitle secDesc="나누어 주신 분들께 감사의 마음을 표현해 보세요." secTitle="나눔 이용 후기" secGoto="/" />

          <div className="section-content review-list">
            <ReviewSlider />
          </div>
        </section>

        <section id="secNews">
          <LandingSectionTitle secDesc="나누리빙의 최근 소식입니다." secTitle="나누리빙 News" secGoto="/" />

          최신 소식이나 소셜 업데이트 등
        </section>
      </div>
    </>
  );
};

export default LandingPage;
