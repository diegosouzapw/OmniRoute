import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/app/(dashboard)/dashboard/cache/__tests__/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/.git/**"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
