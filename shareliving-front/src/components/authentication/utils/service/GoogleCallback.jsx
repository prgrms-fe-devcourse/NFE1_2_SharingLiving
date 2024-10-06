import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../../../context/AppContext'; // AppContext import 추가

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing Google login...');
  const { updateSocialLoginInfo } = useAppContext(); // AppContext에서 함수 가져오기

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    console.log('Received authorization code:', code);
    
    if (code) {
      (async () => {
        await handleGoogleCallback(code);
      })();
    } else {
      console.error('No authorization code found.');
      setStatus('No authorization code found in the URL.');
    }
  }, [location.search]);

  const handleGoogleCallback = async (code) => {
    try {
      setStatus('Requesting access token...');
      
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          code: code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('Token Response:', tokenResponse.data);

      if (tokenResponse.data.access_token) {
        setStatus('인증완료(토큰)). 유저 정보 가지고오기...');
        
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });

        console.log('토큰 정보:', userInfoResponse.data);
        setStatus('Login successful! Updating user info...');

        // AppContext를 사용하여 사용자 정보 업데이트
        updateSocialLoginInfo({
          id: userInfoResponse.data.id,
          name: userInfoResponse.data.name,
          email: userInfoResponse.data.email,
          profileImage: userInfoResponse.data.picture,
          provider: 'google',
          token: tokenResponse.data.access_token
        });

        setTimeout(() => navigate('/mypage'), 2000);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Google 로그인 실패:', error);
      let errorMessage = error.message;
      if (error.response) {
        console.error('Error response:', error.response.data);
        errorMessage = `${error.response.status}: ${JSON.stringify(error.response.data)}`;
      }
      setStatus(`로그인 실패: ${errorMessage}. 다시 시도하세요.`);
    }
  };

  return (
    <div>
      <h2>Google Login Status</h2>
      <p>{status}</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default GoogleCallback;