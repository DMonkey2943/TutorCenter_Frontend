import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173, // Đảm bảo frontend chạy trên cổng 5173
    proxy: {
      '/api': {
        target: 'http://localhost:8000/', // Địa chỉ backend Laravel
        changeOrigin: true, // Đảm bảo header Host được thay đổi
      },
      '/storage/public': {
        target: 'http://localhost:8000/', // Địa chỉ backend Laravel
        changeOrigin: true
      }
    }
  }
})
