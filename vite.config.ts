import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path';
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "components": path.resolve(__dirname, "./components"),
      "pages": path.resolve(__dirname, "./pages"),
      "layouts": path.resolve(__dirname, "./layouts"),
      "hooks": path.resolve(__dirname, "./hooks"),
      "constants": path.resolve(__dirname, "./constants"),
      "mocks": path.resolve(__dirname, "./mocks"),
      "router": path.resolve(__dirname, "./router"),
      "styles": path.resolve(__dirname, "./styles"),
      "types": path.resolve(__dirname, "./types"),
      "utils": path.resolve(__dirname, "./utils"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    minify: true,
    rollupOptions: {}
  }
})
