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
    const code = new URLSearchParams(location.search).get('code');
    const state = new URLSearchParams(location.search).get('state');
    if (code && state) {
      handleNaverCallback(code, state);
    } else {
      setStatus('No authorization code or state found in the URL.');
    }
  }, [location.search]);

  const handleNaverCallback = async (code, state) => {
    try {
      setStatus('Requesting access token...');
      console.log('Code:', code);
      console.log('State:', state);
      console.log('Client ID:', NAVER_CLIENT_ID);
      console.log('Redirect URI:', NAVER_REDIRECT_URI);

      const tokenResponse = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: NAVER_CLIENT_ID,
            client_secret: NAVER_CLIENT_SECRET,
            code: code,
            state: state,
          },
        }
      );

      console.log('Token Response:', tokenResponse.data);
      
      if (tokenResponse.data.access_token) {
        setStatus('Access token received. Getting user info...');
        const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });

        console.log('User Info:', userInfoResponse.data);
        setStatus('Login successful! Redirecting...');
        
        localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data.response));
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Naver login failed:', error);
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
      <h2>Naver Login Status</h2>
      <p>{status}</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default NaverCallback;