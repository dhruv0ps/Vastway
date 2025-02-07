import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    https: {
      key: './localhost.key',
      cert: './localhost.crt',
    },
    host: 'localhost',
  },
})
