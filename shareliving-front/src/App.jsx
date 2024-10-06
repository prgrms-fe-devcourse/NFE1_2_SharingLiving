import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider, useAppContext } from './context/AppContext'; // useAppContext 추가

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
import ProductList from './pages/ProductList';
import KnowledgeList from './pages/KnowledgeList';

import Login from './components/authentication/component/Login';
import Signup from './components/authentication/component/Signup';
import FindAccountInfo from './components/authentication/component/FindAccountInfoPopup';
import KakaoCallback from './components/authentication/utils/service/kakaoCallback';
import GoogleCallback from './components/authentication/utils/service/GoogleCallback';

// ProtectedRoute 컴포넌트를 App.jsx 내에서 정의
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAppContext();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const baseRouter = createBrowserRouter([
  {
    path: '/auth/google/callback',
    element: <GoogleCallback />,
    errorElement: <div>Google 로그인에 실패했습니다.</div>,
  },
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
        element: <ProtectedRoute><MyPage /></ProtectedRoute>,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/edit-profile',
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
        errorElement: <div>업데이트에 실패했습니다.</div>,
      },
      {
        path: '/messages',
        element: <ProtectedRoute><MessagesPage /></ProtectedRoute>,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/messages/received/:messageId',
        element: <ProtectedRoute><MessageDetail /></ProtectedRoute>,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/messages/received/:messageId/reply',
        element: <ProtectedRoute><ReplyMessage /></ProtectedRoute>,
        errorElement: <div>메시지 전송에 실패했습니다.</div>,
      },
      {
        path: '/messages/sent/:messageId',
        element: <ProtectedRoute><MessageDetail /></ProtectedRoute>,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
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
        element: <ProtectedRoute><ShareHistory /></ProtectedRoute>,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/product',
        element: <ProductList />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/knowledge',
        element: <KnowledgeList />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/knowledge/:id',
        element: <KnowledgeDetail />,
        errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
      },
      {
        path: '/add-product',
        element: <ProtectedRoute><ProductWrite /></ProtectedRoute>,
        errorElement: <div>제품 등록에 실패했습니다.</div>,
      },
      {
        path: '/add-knowledge',
        element: <ProtectedRoute><KnowledgeWrite /></ProtectedRoute>,
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
        errorElement: <div>Kakao 로그인에 실패했습니다.</div>,
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <div>회원가입에 실패했습니다.</div>,
      },
      {
        path: '/find-account-info',
        element: <FindAccountInfo />,
        errorElement: <div>회원 정보 찾기에 실패했습니다.</div>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={baseRouter} />
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;