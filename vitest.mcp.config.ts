import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    pool: "threads",
    maxWorkers: 20,
    fileParallelism: true,
    maxConcurrency: 20,
    include: [
      "open-sse/mcp-server/__tests__/**/*.test.ts",
      "open-sse/services/autoCombo/__tests__/**/*.test.ts",
      "open-sse/services/combo/__tests__/**/*.test.ts",
      "open-sse/services/__tests__/antigravity-quota-family.test.ts",
      "tests/unit/autoCombo/**/*.test.ts",
      "tests/unit/encryption.spec.ts",
      "src/shared/components/**/*.test.tsx",
      "src/shared/hooks/__tests__/**/*.test.tsx",
      "src/app/(dashboard)/**/__tests__/**/*.test.tsx",
    ],
    exclude: ["**/node_modules/**", "**/.git/**"],
    coverage: {
      reportsDirectory: "coverage",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
