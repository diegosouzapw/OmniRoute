import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "src/app/**/dashboard/cache/__tests__/**/*.test.tsx",
      "src/app/**/dashboard/endpoint/__tests__/**/*.test.tsx",
      "src/lib/memory/__tests__/**/*.test.ts",
      "src/lib/skills/__tests__/**/*.test.ts",
      "open-sse/**/__tests__/**/*.test.ts",
      "open-sse/services/**/__tests__/**/*.test.ts",
      "tests/e2e/ecosystem.test.ts",
      "tests/e2e/protocol-clients.test.ts",
    ],
    exclude: [
      "**/node_modules/**",
      "**/.git/**",
      "open-sse/services/autoCombo/__tests__/providerDiversity.test.ts",
    ],
    coverage: {
      reportsDirectory: "coverage",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
