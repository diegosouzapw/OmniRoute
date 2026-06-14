import { defineConfig, devices } from "@playwright/test";

const dashboardPort = process.env.DASHBOARD_PORT || process.env.PORT || "20128";
const dashboardBaseUrl = `http://localhost:${dashboardPort}`;
const webServerReadyUrl = `${dashboardBaseUrl}/api/monitoring/health`;
const playwrightServerMode = process.env.OMNIROUTE_PLAYWRIGHT_SERVER_MODE || "start";
const playwrightWebServerTimeout = Number.parseInt(
  process.env.OMNIROUTE_PLAYWRIGHT_WEB_SERVER_TIMEOUT || "900000",
  10
);

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["**/*.spec.ts"],
  fullyParallel: false,
  // Per-test cap. 600s was high enough that one hung test (× retries) could
  // exhaust the e2e job's wall-clock budget, so the GitHub job hit its
  // timeout-minutes and was CANCELLED mid-run instead of the test failing fast.
  // 180s is generous for a UI flow yet bounds a hang to a clear per-test failure.
  timeout: 180_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  // `line` (not `github`) in CI so per-test progress + timing stream live to the
  // job log. The `github` reporter buffers all output until the run ends, so when
  // a slow shard was cancelled at its timeout the log showed only "Running N
  // tests" then silence — impossible to tell which test was slow/hung.
  reporter: process.env.CI ? "line" : "html",
  expect: {
    timeout: process.env.CI ? 30_000 : 10_000,
  },
  use: {
    baseURL: dashboardBaseUrl,
    navigationTimeout: 300_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `${JSON.stringify(process.execPath)} scripts/dev/run-next-playwright.mjs ${playwrightServerMode}`,
    url: webServerReadyUrl,
    reuseExistingServer: !process.env.CI,
    timeout: Number.isFinite(playwrightWebServerTimeout) ? playwrightWebServerTimeout : 900_000,
  },
});
