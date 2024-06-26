import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1/', // 目标后端服务器地址
        changeOrigin: true, // 是否改变源地址
        // rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
})
