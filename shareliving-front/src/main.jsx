
// window.VITE_APP_GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
// window.VITE_APP_GOOGLE_CLIENT_SECRET = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;
// window.VITE_APP_GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 디버그: 환경 변수 출력
console.log('Google Client ID:', window.VITE_APP_GOOGLE_CLIENT_ID);
console.log('Google Redirect URI:', window.VITE_APP_GOOGLE_REDIRECT_URI);
console.log('All Environment Variables:', import.meta.env);

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );