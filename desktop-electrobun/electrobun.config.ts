/**
 * phenotype-desktop Electrobun shell template
 *
 * USAGE: Copy this directory alongside your web app, then edit the three
 * CONFIGURE sections below. Run `bun install && bun dev` on macOS.
 *
 * Template variables (find-replace before use):
 *   OmniRoute         e.g. "MyApp"
 *   com.phenotype.omniroute           e.g. "com.example.myapp"
 *   0.1.0      e.g. "0.1.0"
 *   http://localhost:3000  e.g. "http://localhost:3000"
 *   ../web/dist/index.html e.g. "../web/dist/index.html"  (relative from this dir)
 */
import type { ElectrobunConfig } from "electrobun";

// ── CONFIGURE 1: App identity ─────────────────────────────────────────────────
const APP_NAME = "OmniRoute";
const APP_ID = "com.phenotype.omniroute";
const APP_VERSION = "0.1.0";

// ── CONFIGURE 2: Renderer (dev server URL or bundled views path) ──────────────
const DEFAULT_DEV_URL = "http://localhost:3000";

// ── CONFIGURE 3: Bundled views entrypoint (production) ───────────────────────
const VIEWS_ENTRYPOINT = "src/views/index.html";

export default {
  app: {
    name: APP_NAME,
    identifier: APP_ID,
    version: APP_VERSION,
  },
  runtime: {
    exitOnLastWindowClosed: true,
    // Passed through to main.ts via BuildConfig at runtime
    devRendererUrl: process.env.RENDERER_URL ?? DEFAULT_DEV_URL,
  },
  build: {
    bun: {
      entrypoint: "src/main.ts",
    },
    views: [
      {
        name: "app",
        entrypoint: VIEWS_ENTRYPOINT,
      },
    ],
  },
} satisfies ElectrobunConfig;
