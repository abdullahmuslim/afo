import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),      // Public site
        admin: resolve(__dirname, 'admin/index.html'), // Admin panel
        auth: resolve(__dirname, 'admin/auth/index.html') // Admin panel authentication
      }
    }
  }
});
