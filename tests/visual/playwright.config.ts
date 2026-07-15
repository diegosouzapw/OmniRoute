import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.ts",
  timeout: 60000,
  expect: {
    timeout: 15000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: "visual",
      testMatch: "regression.spec.ts",
    },
  ],
  // Store snapshots alongside tests
  snapshotPathTemplate: "{testDir}/snapshots/{testFilePath}/{arg}{ext}",
});
