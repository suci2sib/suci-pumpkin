import path from "path" // 1. Tambahkan import path di paling atas
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 2. Tambahkan konfigurasi alias di bawah ini untuk Shadcn UI
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})