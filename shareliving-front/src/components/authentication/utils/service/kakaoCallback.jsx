import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing Kakao login...');

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      handleKakaoCallback(code);
    } else {
      setStatus('No authorization code found in the URL.');
    }
  }, [location.search]);

  const handleKakaoCallback = async (code) => {
    try {
      setStatus('Requesting access token...');
      console.log('Code:', code);
      console.log('Client ID:', KAKAO_CLIENT_ID);
      console.log('Redirect URI:', KAKAO_REDIRECT_URI);

      const tokenResponse = await axios.post(
        '/kakao-api/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('Token Response:', tokenResponse.data);
      
      if (tokenResponse.data.access_token) {
        setStatus('Access token received. Getting user info...');
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });

        console.log('User Info:', userInfoResponse.data);
        setStatus('Login successful! Redirecting...');
        
        localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data));
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Kakao login failed:', error);
      let errorMessage = error.message;
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        errorMessage = `${error.response.status}: ${JSON.stringify(error.response.data)}`;
      }
      setStatus(`Login failed: ${errorMessage}. Please try again.`);
    }
  };

  return (
    <div>
      <h2>Kakao Login Status</h2>
      <p>{status}</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default KakaoCallback;