import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
      verbose: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 优化代码分割和预加载
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            } else if (id.includes('react-router')) {
              return 'router';
            } else if (id.includes('@tanstack/react-query')) {
              return 'query';
            } else if (id.includes('framer-motion')) {
              return 'motion';
            } else if (id.includes('react-markdown')) {
              return 'markdown';
            }
          }
        },
      },
    },
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 优化静态资源
    assetsInlineLimit: 4096, // 4kb以下的资源内联
  },
  define: {
    'process.env': process.env,
  },
})