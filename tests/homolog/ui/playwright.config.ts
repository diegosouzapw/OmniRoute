import { defineConfig } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const STORAGE_STATE = path.join(HERE, ".auth", "admin.json");

export default defineConfig({
  testDir: ".",
  timeout: 60_000,
  retries: 1,
  // Sem fullyParallel, os 98 testes de routes.spec.ts (mesmo arquivo) rodam
  // SERIALIZADOS num único worker (~10min); com ele, distribuem entre os workers.
  fullyParallel: true,
  workers: 8,
  reporter: [
    ["list"],
    [
      // outputDir ABSOLUTO: o reporter resolve paths relativos contra o CWD do
      // processo (não contra o config) — um path relativo escapava do worktree.
      "playwright-ctrf-json-reporter",
      {
        outputDir: path.resolve(HERE, "..", "..", "..", "homolog-report"),
        outputFile: "ui-ctrf.json",
      },
    ],
  ],
  use: {
    baseURL: process.env.HOMOLOG_BASE_URL || "http://192.168.0.15:20128",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "homolog",
      testMatch: /.*\.spec\.ts/,
      dependencies: ["setup"],
      use: { storageState: STORAGE_STATE },
    },
  ],
});
