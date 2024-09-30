import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/style.css';

import Layout from './components/layouts/Layout';
import LandingPage from './components/LandingPage';
import ProductWrite from './pages/ProductWrite';
import KnowledgeWrite from './pages/KnowledgeWrite';

const baseRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <div>오류</div>,
  },
  {
    path: '/add-product',
    element: <ProductWrite />,
    errorElement: <div>데이터가 올바르지 않습니다.</div>,
    children: [
      {
        path: ':productID',
        element: <div>제품 나눔 글</div>,
        errorElement: <div>존재하지 않는 글입니다.</div>
      }
    ]
  },
  {
    path: '/add-knowledge',
    element: <KnowledgeWrite />,
    errorElement: <div>데이터가 올바르지 않습니다.</div>,
    children: [
      {
        path: ':knowledgeID',
        element: <div>지식 나눔 글</div>,
        errorElement: <div>존재하지 않는 글입니다.</div>
      }
    ]
  },
  {
    path: '/mypage',
    element: <div>마이 페이지</div>,
    errorElement: <div>데이터가 올바르지 않습니다.</div>
  },
]);

const App = () => {
  return (
    <>
      <Layout>
        <RouterProvider router={ baseRouter } />
      </Layout>
    </>
  );
};

export default App;