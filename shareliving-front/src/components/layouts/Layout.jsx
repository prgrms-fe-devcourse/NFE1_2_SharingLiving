import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'; // Context 불러오기

import Header from '../Header';
import Footer from '../Footer';
import MainSidebar from '../MainSidebar';
import BreadCrumbs from '../BreadCrumbs';
import BottomNavBar from '../BottomNavBar';

const Layout = () => {
  const { showBreadcrumbs, hideSidebar } = useAppContext();
  const { currentUser } = useAppContext(); // currentUser 가져오기
  const isLogged = currentUser; // 로그인 상태
  console.log('로그인상태', isLogged);

  return (
    <>
      <Header isLogged={isLogged} />

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
