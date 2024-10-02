import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import './assets/css/style.css';

import Layout from './components/layouts/Layout';
import LandingPage from './components/LandingPage';
import ProductWrite from './pages/ProductWrite';
import KnowledgeWrite from './pages/KnowledgeWrite';
import MyPage from './pages/MyPage';
import EditProfile from './pages/EditProfile';
import MessagesPage from './pages/MessagesPage';
import MessageDetail from './components/MessageDetail';
import ReplyMessage from './pages/ReplyMessage';
import NoticeList from './components/NoticeList';
import NoticeDetail from './components/NoticeDetail';
import ShareHistory from './pages/ShareHistory';
import ProductDetail from './pages/ProductDetail';
import KnowledgeDetail from './pages/KnowledgeDetail';
import { AppProvider } from './context/AppContext'; // Context import
import Login from './components/authentication/component/Login'; 
import Signup from './components/authentication/component/Signup'; 
import FindAccountInfo from './components/authentication/component/FindAccountInfoPopup';
import KakaoCallback from './components/authentication/utils/service/kakaoCallback';
/*  
  주석 규칙
  
  - 404 오류 처리: 
    모든 페이지에서 발생할 수 있는 404 오류는 
    errorElement로 처리하여 사용자에게 안내합니다.
  
  - CRUD 관련 오류 메시지 (상황에 따라 커스텀):
    - R (조회 실패): 
      데이터를 불러오는 데 실패했습니다.
      
    - U (업데이트 실패): 
      업데이트에 실패했습니다.
      
    - C (생성 실패): 
      추가에 실패했습니다.
      
    - D (삭제 실패): 
      삭제에 실패했습니다.
*/

const baseRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 페이지를 찾을 수 없습니다.</div>,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/mypage',
        element: <MyPage />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/edit-profile',
        element: <EditProfile />,
        errorElement: <div>업데이트에 실패했습니다.</div>,
      },
      {
        path: '/messages',
        element: <MessagesPage />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/messages/:messageId',
        element: <MessageDetail />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/messages/:messageId/reply',
        element: <ReplyMessage />,
        errorElement: <div>메시지 전송에 실패했습니다.</div>,
      },
      {
        path: '/notices',
        element: <NoticeList />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/notices/:noticeId',
        element: <NoticeDetail />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/share-history',
        element: <ShareHistory />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/knowledge/:id',
        element: <KnowledgeDetail />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/add-product',
        element: <ProductWrite />,
        errorElement: <div>제품 등록에 실패했습니다.</div>,
      },
      {
        path: '/add-knowledge',
        element: <KnowledgeWrite />,
        errorElement: <div>지식 등록에 실패했습니다.</div>,
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <div>로그인에 실패했습니다.</div>,
      },
      {
        path: '/auth/kakao/callback',
        element: <KakaoCallback />,
        errorElement: <div>로그인에 실패했습니다.</div>,
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <div>회원가입에 실패했습니다.</div>,
      },
      {
        path: '/find-account-info',
        element: <FindAccountInfo />,
        errorElement: <div>회원가입에 실패했습니다.</div>,
      },
      
      // 필요한 경로를 추가
    ],
  },
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={baseRouter} />
    </AppProvider>
  );
};

export default App;