import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: true, // Autorise l'accès externe
    port: 5173, // Port du frontend
    proxy: {
      "/api": {
        target: "http://localhost:5000", // URL de ton backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
