import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'; // Context 불러오기

import Header from '../Header';
import Footer from '../Footer';
import MainSidebar from '../MainSidebar';
import BreadCrumbs from '../BreadCrumbs';
import BottomNavBar from '../BottomNavBar';

const Layout = () => {
  const { showBreadcrumbs, hideSidebar } = useAppContext();
  const isLogged = true; // 로그인 상태

  return (
    <>
      <Header />

      <main id="contentView" className="inner-wrapper">
        <div id="mainContainer">
          <BreadCrumbs showBreadcrumbs={showBreadcrumbs} />

          <Outlet />
        </div>

        <MainSidebar isLogged={isLogged} hideSidebar={hideSidebar} />
      </main>

      <Footer />

      <BottomNavBar />
    </>
  );
};

export default Layout;