import Header from '../Header';
import Footer from '../Footer';
import MainSidebar from '../MainSidebar';
import BreadCrumbs from '../BreadCrumbs';
import AlterHeader from '../AlterHeader';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <AlterHeader />

            <main id="contentView" className="inner-wrapper">
                <div id="mainContainer">
                    <BreadCrumbs currentRoute={ 'home' } />

                    { children /** 이후 이 부분에 라우터 뷰 설정 */}
                </div>

                <MainSidebar />
            </main>

            <Footer />
        </>
    );
};

export default Layout;