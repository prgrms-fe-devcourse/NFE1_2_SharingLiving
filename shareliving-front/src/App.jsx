import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './components/Home'; 
import Login from './components/authentication/component/Login'; 
import Signup from './components/authentication/component/Signup'; 
import FindAccountInfo from './components/authentication/component/FindAccountInfoPopup';
import NaverLogin from './components/authentication/utils/service/Naver';
import NaverCallback from './components/authentication/utils/service/NaverCallback Component';
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/kakao/callback" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/find-account-info" element={<FindAccountInfo />} />
                <Route path="/login" element={<NaverLogin />} />
                <Route path="/naver-callback" element={<NaverCallback />} />
                {/* 다른 라우트들을 여기에 추가하세요 */}
            </Routes>
        </>
    );
}

export default App;