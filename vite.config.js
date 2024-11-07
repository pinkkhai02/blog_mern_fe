
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';
import path from 'path-browserify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add this line
      include: "**/*.jsx",
    }),
  ],
  resolve: {
    alias:{
      path: 'path-browserify',
    }
  },
  build: {
    sourcemap: true
  },
  server: {
    sourcemap: true
  }
});
