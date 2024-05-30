import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'https://sergiolix.github.io/Prueba',
  build: {
    rollupOptions: {
      external: ['bootstrap/dist/css/bootstrap.min.css']
    }
  }
});