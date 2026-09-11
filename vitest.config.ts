import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/_setup/vitestUiPolyfills.ts"],
    pool: "threads",
    maxWorkers: 20,
    fileParallelism: true,
    maxConcurrency: 20,
    include: [
      "src/app/**/dashboard/cache/__tests__/**/*.test.tsx",
      "src/app/**/dashboard/endpoint/__tests__/**/*.test.tsx",
      "src/app/**/dashboard/providers/**/__tests__/**/*.test.tsx",
      "src/app/**/dashboard/webhooks/__tests__/**/*.test.tsx",
      "src/app/**/dashboard/discovery/__tests__/**/*.test.tsx",
      "src/shared/hooks/__tests__/**/*.test.tsx",
      "src/lib/memory/__tests__/**/*.test.ts",
      "src/lib/skills/__tests__/**/*.test.ts",
      "tests/unit/encryption.test.ts",
      "tests/unit/**/*.test.tsx",
      "open-sse/**/__tests__/**/*.test.ts",
      "open-sse/services/**/__tests__/**/*.test.ts",
    ],
    exclude: [
      // Standard Vitest / tooling exclusions
      "node_modules/**",
      "dist/**",
      "cypress/**",
      ".idea/**",
      ".git/**",
      ".cache/**",
      // Live-server E2E — these drive a real running server, so they must never run
      // in this jsdom job. They have their own runners + vitest.e2e-live.config.ts.
      "tests/e2e/ecosystem.test.ts",
      "tests/e2e/protocol-clients.test.ts",
      // ── Pre-existing failures tracked by #8618 ───────────────────────────────
      "tests/unit/ui/request-logger-autorefresh-visibility-3972.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "src/app/(dashboard)/dashboard/webhooks/__tests__/webhook-wizard.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "tests/unit/ui/logs-page-detail-modal-reopen-on-close.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "tests/unit/ui/agent-card.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "src/app/(dashboard)/dashboard/endpoint/__tests__/ApiEndpointsTab.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "src/app/(dashboard)/dashboard/cache/__tests__/CacheTrends.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "src/app/(dashboard)/dashboard/cache/__tests__/IdempotencyLayer.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "src/app/(dashboard)/dashboard/cache/__tests__/CachePerformance.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "src/app/(dashboard)/dashboard/discovery/__tests__/DiscoveryPageClient.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "tests/unit/ui/combos-page-smoke.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
      "tests/unit/ui/evals-tab-smoke.test.tsx", // #13204 — falha real; remover esta exclusão quando consertado
    ],

    coverage: {
      reportsDirectory: "coverage",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Mirrors tsconfig paths. Without it, a UI test importing from open-sse
      // resolves to undefined instead of failing loudly — which silently made
      // every provider look credentialed in the free-tier card tests.
      "@omniroute/open-sse": path.resolve(__dirname, "./open-sse"),
    },
  },
});
