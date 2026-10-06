import { defineConfig } from "vitest/config";
import path from "path";

/**
 * Live-server E2E suites (`tests/e2e/ecosystem.test.ts`,
 * `tests/e2e/protocol-clients.test.ts`).
 *
 * These are the only two suites that drive a REAL running OmniRoute over HTTP
 * rather than importing modules. Their runners — `scripts/dev/run-ecosystem-tests.mjs`
 * and `scripts/dev/run-protocol-clients-tests.mjs` — boot a dev server, wait for
 * `/api/monitoring/health`, then invoke Vitest with this config.
 *
 * They need their own config because `vitest.config.ts` deliberately EXCLUDES both
 * files (they must not run in the jsdom UI job, which has no server). Since the
 * runners previously invoked Vitest with no `--config`, they loaded that default
 * config and the exclusion discarded the very file passed as the positional filter —
 * so both scripts failed with "No test files found, exiting with code 1" and neither
 * suite had a way to execute.
 */
export default defineConfig({
  test: {
    // Real HTTP against a running server — never jsdom.
    environment: "node",
    globals: true,
    include: ["tests/e2e/ecosystem.test.ts", "tests/e2e/protocol-clients.test.ts"],
    exclude: ["**/node_modules/**", "**/.git/**"],
    // Both suites share ONE server instance, so files must not run concurrently.
    fileParallelism: false,
    // Upstream calls over the network are slower than in-process unit tests; the
    // suites themselves also read ECOSYSTEM_*_TIMEOUT_MS for their per-case budgets.
    testTimeout: 60000,
    hookTimeout: 60000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Mirrors tsconfig paths, same as the other two vitest configs.
      "@omniroute/open-sse": path.resolve(__dirname, "./open-sse"),
    },
  },
});
