import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'https://kdt.frontend.5th.programmers.co.kr:5003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/kakao-api': {
        target: 'https://kauth.kakao.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/kakao-api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Kakao proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Kakao Request:', req.method, req.url);
            console.log('Request Headers:', proxyReq.getHeaders());
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              console.log('Request Body:', body);
            });
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Kakao Response:', proxyRes.statusCode, req.url);
            console.log('Response Headers:', proxyRes.headers);
          });
        },
      },
      '/google-api': {
        target: 'https://accounts.google.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/google-api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Google proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Google Request:', req.method, req.url);
            console.log('Request Headers:', proxyReq.getHeaders());
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Google Response:', proxyRes.statusCode, req.url);
            console.log('Response Headers:', proxyRes.headers);
          });
        },
      },
    },
  },
});