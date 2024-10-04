import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = import.meta.env.VITE_APP_NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URI = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;

const NaverCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing Naver login...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    
    if (code && state) {
      handleNaverCallback(code, state);
    } else {
      setStatus('No authorization code or state found in the URL.');
    }
  }, [location.search]);

  const handleNaverCallback = async (code, state) => {
    try {
      setStatus('Requesting access token...');
      
      const tokenResponse = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: NAVER_CLIENT_ID,
            client_secret: NAVER_CLIENT_SECRET,
            code,
            state,
          },
        }
      );

      if (tokenResponse.data.access_token) {
        setStatus('Access token received. Getting user info...');
        const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });

        setStatus('Login successful! Redirecting...');
        
        localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data.response));
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Naver login failed:', error);
      setStatus(`Login failed: ${error.message}. Please try again.`);
    }
  };

  return (
    <div>
      <h2>Naver Login Status</h2>
      <p>{status}</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default NaverCallback;