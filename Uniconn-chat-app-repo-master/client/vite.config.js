import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // No need for an empty string here
  return {
    define: {
      "process.env": env,
    },
    plugins: [react()],
  };
});
