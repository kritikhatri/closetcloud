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
    // The React app calls "/api/...". In development Vite forwards those
    // requests to the Express server on port 4000. To the browser it all
    // looks like one website, so the login cookie just works, with no
    // cross-site cookie or CORS setup needed.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
