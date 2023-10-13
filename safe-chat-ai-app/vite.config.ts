import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = defineConfig({
  plugins: [react()],

  // Specify the alias for MUI and Emotion
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine",
      "@mui/system": "@mui/system/esm",
    },
  },
  optimizeDeps: {
    exclude: ['@emotion/styled'],
    include: ['hoist-non-react-statics'],
  },

  // Proxy setup for development to handle CORS issues
  server: {
    proxy: {
      "/analyze": "http://localhost:31001",
      "/anonymize": "http://localhost:31002",
    },
  },
  build: {
    rollupOptions: {
      external: ["@emotion/react", "@emotion/styled"],
      output: {
        globals: {
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
        },
      },
    },
  },
});

export default config;
