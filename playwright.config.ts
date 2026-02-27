import { defineConfig, devices } from "@playwright/test";

const dashboardPort = process.env.DASHBOARD_PORT || process.env.PORT || "20128";
const dashboardBaseUrl = `http://localhost:${dashboardPort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: dashboardBaseUrl,
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
    command: process.env.CI ? "npm start" : "npm run dev",
    url: dashboardBaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
