import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    // Esto es lo que necesitas añadir
    "react-router": {
      "strict": true,
    }
  }],
})