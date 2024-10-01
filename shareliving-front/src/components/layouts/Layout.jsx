import Header from '../Header';
import Footer from '../Footer';
import MainSidebar from '../MainSidebar';
import BreadCrumbs from '../BreadCrumbs';

const Layout = ({ children }) => {
    return (
        <>
            <Header />

            <main id="contentView" className="inner-wrapper">
                <div id="mainContainer">
                    <BreadCrumbs currentRoute={ 'home' } />

                    { children }
                </div>

                <MainSidebar />
            </main>

            <Footer />
        </>
    );
};

export default Layout;