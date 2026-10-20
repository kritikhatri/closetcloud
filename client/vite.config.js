import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fixed port so it never collides with other projects, and so the
  // backend's CORS setting can trust exactly one frontend address.
  server: {
    port: 5180,
    strictPort: true,
  },
})
