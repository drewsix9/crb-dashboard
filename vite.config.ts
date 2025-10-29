import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [react()],
  base: '/',       // keep root unless deploying under a subpath
})
