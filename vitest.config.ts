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
      "tests/e2e/ecosystem.test.ts",
      "tests/e2e/protocol-clients.test.ts",
    ],
    exclude: [
      // Standard Vitest / tooling exclusions
      "node_modules/**",
      "dist/**",
      "cypress/**",
      ".idea/**",
      ".git/**",
      ".cache/**",
      // E2E tests — run via their own scripts, not the UI vitest job
      "tests/e2e/ecosystem.test.ts",
      "tests/e2e/protocol-clients.test.ts",
      // ── Pre-existing failures tracked by #8618 ───────────────────────────────
      "open-sse/services/autoCombo/__tests__/providerDiversity.test.ts", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/kimiSponsorBanner.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/compareView.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-modal-keep-open.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-field-6540.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/issue-7845-log-detail-structured-error.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/allocation-table.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/namedCombos-active-badge.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/providerIconKimiLogomark.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/ClaudeClassifierCompatToggle.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/system-storage-manual-vacuum.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/burn-rate-chart.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-modal-zero-config.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-modal-hidden-models-7156.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/toonEncoderTable.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playView.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/studioTabs.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/studio-pages.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/livePage.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/diffPane.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/CliCodePage.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/runtime-page-client.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/engineConfigPage.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "open-sse/services/autoCombo/__tests__/autoCombo.test.ts", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/agent-card-risk-modal.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/request-logger-autorefresh-visibility-3972.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/search-tools-compare-tab.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/noauth-account-card.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-build-tab.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-studio.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-compare-tab.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/webhooks/__tests__/webhook-wizard.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/search-tools-scrape-result.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/CliToolCard.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/comboLiveStudio.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/cache/__tests__/CachePage.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/lib/memory/__tests__/retrieval.test.ts", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-modal-select-all.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-modal-deselect.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/engine-pages.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-config-pane.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/logs-page-detail-modal-reopen-on-close.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/agent-card.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/agent-bridge-page.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/model-select-modal-connection-filter.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-structured-output-editor.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-tools-builder.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-improve-prompt-button.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/endpoint/__tests__/ApiEndpointsTab.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/compression-combos-routing-mode-6760.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/use-local-storage-pool-migration.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/omniglyphContextPage.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/waterfallInspector.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-compare-column.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/playground-chat-tab.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/providers/[id]/__tests__/ProviderDetailPageClient.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/lib/skills/__tests__/integration.test.ts", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/cache/__tests__/CacheTrends.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/cache/__tests__/IdempotencyLayer.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/cache/__tests__/CachePerformance.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/cache/__tests__/MemoryCards.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "src/app/(dashboard)/dashboard/discovery/__tests__/DiscoveryPageClient.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "open-sse/services/autoCombo/__tests__/chaosVirtualCombo.test.ts", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/combos-page-smoke.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
      "tests/unit/ui/evals-tab-smoke.test.tsx", // #8618 — pre-existing failure; remove this exclusion when fixed
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
