/**
 * phenotype-desktop Electrobun shell — main process template
 *
 * Features out of the box:
 *  - One-click service boot: runs `process-compose up -d` if SERVICES_COMPOSE_FILE is set
 *  - Loads renderer from RENDERER_URL env or falls back to bundled views://app/index.html
 *  - Standard window with hiddenInset title bar, 1400x900 default
 *  - Minimal app menu wired to webview JS dispatch
 */
import { BrowserWindow, ApplicationMenu } from "electrobun/bun";
import { $ } from "bun";
import { join } from "node:path";

// ── Config ────────────────────────────────────────────────────────────────────
const APP_NAME = process.env.APP_NAME ?? "OmniRoute";
// Bundled fallback page (polls + redirects to the live dev server).
const RENDERER_URL = "views://app/index.html";
// Live dev server (HMR) the window navigates to once reachable.
const DEV_URL = process.env.RENDERER_URL ?? "http://localhost:3000";

/**
 * Path to process-compose.yml (absolute or relative to CWD).
 * Set SERVICES_COMPOSE_FILE env var, e.g.:
 *   SERVICES_COMPOSE_FILE=/path/to/repo/process-compose.yml
 * Leave unset to skip service boot.
 */
const SERVICES_COMPOSE_FILE = process.env.SERVICES_COMPOSE_FILE;

// ── Service boot ─────────────────────────────────────────────────────────────
async function bootServices(): Promise<void> {
  if (!SERVICES_COMPOSE_FILE) {
    console.log(`[${APP_NAME}] SERVICES_COMPOSE_FILE not set — skipping service boot`);
    return;
  }
  console.log(`[${APP_NAME}] Booting services: process-compose up -d`);
  try {
    const result = await $`process-compose up -d --config ${SERVICES_COMPOSE_FILE}`.quiet();
    console.log(`[${APP_NAME}] Services:`, result.text().trim());
  } catch (err) {
    console.warn(
      `[${APP_NAME}] process-compose boot skipped (not found or services already running):`,
      (err as Error).message
    );
  }
}

// ── Window ───────────────────────────────────────────────────────────────────
function createMainWindow(): BrowserWindow {
  const win = new BrowserWindow({
    title: APP_NAME,
    url: RENDERER_URL,
    frame: {
      x: 0,
      y: 0,
      width: parseInt(process.env.WINDOW_WIDTH ?? "1400"),
      height: parseInt(process.env.WINDOW_HEIGHT ?? "900"),
    },
    titleBarStyle: "hiddenInset",
  });
  try {
    win.webview.executeJavascript(`window.__RENDERER_URL__ = ${JSON.stringify(DEV_URL)};`);
  } catch {
    /* webview not ready yet — fallback page uses its baked-in default */
  }
  return win;
}

// ── Menu ─────────────────────────────────────────────────────────────────────
function setupMenu(win: BrowserWindow): void {
  ApplicationMenu.setApplicationMenu([
    {
      label: APP_NAME,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // Add app-specific menus below this line
    // Example — dispatch to webview via executeJavaScript:
    // {
    //   label: "File",
    //   submenu: [
    //     {
    //       label: "New",
    //       accelerator: "CmdOrCtrl+N",
    //       click: () => win.webview.executeJavaScript("window.__app?.onNew?.()"),
    //     },
    //   ],
    // },
  ]);
}

// ── Bootstrap ────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  await bootServices();
  const win = createMainWindow();
  setupMenu(win);
  console.log(`[${APP_NAME}] Launched → ${DEV_URL} (fallback ${RENDERER_URL})`);
}

main().catch((err) => {
  console.error(`[${APP_NAME}] Fatal:`, err);
  process.exit(1);
});
