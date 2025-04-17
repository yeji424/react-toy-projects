import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve('./src'), // 이 부분이 중요
      '@components': path.resolve('./src/components'),
      '@hooks': path.resolve('./src/hooks'),
      '@pages': path.resolve('./src/pages'),
      '@utils': path.resolve('./src/utils'),
      '@assets': path.resolve('./src/assets'),
      '@api': path.resolve('./src/api'),
      '@store': path.resolve('./src/store'),
      // 필요한 다른 경로도 추가 가능
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
