import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Add this

export default defineConfig({
  base: "/abzolute-site/",
  plugins: [
    react(),
    tailwindcss(), // Add this
  ],
})
