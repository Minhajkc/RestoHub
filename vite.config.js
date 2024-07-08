// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Other config settings
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', '@reduxjs/toolkit'], // Add @reduxjs/toolkit to external dependencies
    },
  },
});
