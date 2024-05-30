import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {},
    // Agrega la importación de Bootstrap aquí
    postcss: {
      plugins: [
        require('autoprefixer'),
        // Importa los estilos de Bootstrap
        require('postcss-import'),
        require('tailwindcss'), // Si estás usando TailwindCSS
        require('postcss-flexbugs-fixes'),
        // Aquí importa Bootstrap CSS
        require('bootstrap/dist/css/bootstrap.min.css').default,
      ],
    },
  },
})
