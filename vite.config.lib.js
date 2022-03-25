import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    publicDir: false,
    build: {
      outDir: './lib',
      lib: {
        entry: './src/designer/index.js',
        name: 'react-designer.min.js',
        formats: ['cjs', 'es'],
      },
    },
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: '[hash:base64:5]',
      },
    },
  }
})
