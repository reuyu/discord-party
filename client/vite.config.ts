import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // 0.0.0.0 바인딩으로 외부/로컬 네트워크 접속 허용
    allowedHosts: true, // Cloudflare Tunnel, ngrok 등 외부 터널 도메인 전체 허용
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true
      }
    }
  }
});
