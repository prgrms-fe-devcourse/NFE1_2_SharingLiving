import MainSidebar from "./MainSidebar";

const LandingPage = () => {
    return (
        <main id="contentView" className="inner-wrapper">
            <div id="mainContainer">
                <section id="secHero">
                    <p>내 손으로 자연을 보호하는 가장 따뜻한 방법</p>
                    <h2>나누리빙</h2>

                    <p>여러분의 나눔으로 몇 그루의 나무가 보호되었어요.</p>
                </section>

                <section id="secBanners">
                    배너 등이 들어갈 수 있는 더미 공간 - 제거해도 무관
                </section>

                <section id="secShareProducts">
                    최근 제품 나눔 글
                </section>

                <section id="secShareKnowledge">
                    최근 지식 나눔 글
                </section>

                <section id="secInfoBanner">
                    이용 안내글로 이동하는 배너
                </section>

                <section id="secReviews">
                    최근 나눔 이용 후기
                </section>

                <section id="secNews">
                    최신 소식이나 소셜 업데이트 등
                </section>
            </div>

            <MainSidebar />
        </main>
    );
};

export default LandingPage;