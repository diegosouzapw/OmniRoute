#!/usr/bin/env node

/**
 * OmniRoute CLI — Smart AI Router with Auto Fallback
 *
 * Usage:
 *   omniroute              Start the server (default port 20128)
 *   omniroute --port 3000  Start on custom port
 *   omniroute --no-open    Start without opening browser
 *   omniroute --help       Show help
 *   omniroute --version    Show version
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const APP_DIR = join(ROOT, "app");

// ── Parse args ─────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
  \x1b[1m\x1b[36m⚡ OmniRoute\x1b[0m — Smart AI Router with Auto Fallback

  \x1b[1mUsage:\x1b[0m
    omniroute                 Start the server
    omniroute --port <port>   Use custom API port (default: 20128)
    omniroute --no-open       Don't open browser automatically
    omniroute --help          Show this help
    omniroute --version       Show version

  \x1b[1mAfter starting:\x1b[0m
    Dashboard:  http://localhost:<dashboard-port>
    API:        http://localhost:<api-port>/v1

  \x1b[1mConnect your tools:\x1b[0m
    Set your CLI tool (Cursor, Cline, Codex, etc.) to use:
    \x1b[33mhttp://localhost:<api-port>/v1\x1b[0m
  `);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  try {
    const pkg = await import(join(ROOT, "package.json"), {
      with: { type: "json" },
    });
    console.log(pkg.default.version);
  } catch {
    console.log("unknown");
  }
  process.exit(0);
}

function parsePort(value, fallback) {
  const parsed = parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

// Parse --port (canonical/base port)
let port = parsePort(process.env.PORT || "20128", 20128);
const portIdx = args.indexOf("--port");
if (portIdx !== -1 && args[portIdx + 1]) {
  const cliPort = parsePort(args[portIdx + 1], null);
  if (cliPort === null) {
    console.error("\x1b[31m✖ Invalid port number\x1b[0m");
    process.exit(1);
  }
  port = cliPort;
}

const apiPort = parsePort(process.env.API_PORT || String(port), port);
const dashboardPort = parsePort(process.env.DASHBOARD_PORT || String(port), port);

const noOpen = args.includes("--no-open");

// ── Banner ─────────────────────────────────────────────────
console.log(`
\x1b[36m   ____                  _ ____              _
  / __ \\                (_) __ \\            | |
 | |  | |_ __ ___  _ __ _| |__) |___  _   _| |_ ___
 | |  | | '_ \` _ \\| '_ \\ |  _  // _ \\| | | | __/ _ \\
 | |__| | | | | | | | | | | | \\ \\ (_) | |_| | ||  __/
  \\____/|_| |_| |_|_| |_|_|_|  \\_\\___/ \\__,_|\\__\\___|
\x1b[0m`);

// ── Node.js version check ──────────────────────────────────
const nodeMajor = parseInt(process.versions.node.split(".")[0], 10);
if (nodeMajor >= 24) {
  console.warn(`\x1b[33m  ⚠  Warning: You are running Node.js ${process.versions.node}.
     OmniRoute uses better-sqlite3, a native addon that does not yet
     have compatible prebuilt binaries for Node.js 24+.
     You may experience errors like "is not a valid Win32 application"
     or "NODE_MODULE_VERSION mismatch".

     Recommended: use Node.js 22 LTS (or 20 LTS).
     Workaround:  npm rebuild better-sqlite3\x1b[0m
`);
}

// ── Resolve server entry ───────────────────────────────────
const serverJs = join(APP_DIR, "server.js");

if (!existsSync(serverJs)) {
  console.error("\x1b[31m✖ Server not found at:\x1b[0m", serverJs);
  console.error("  This usually means the package was not built correctly.");
  console.error("  Try reinstalling: npm install -g omniroute");
  process.exit(1);
}

// ── Start server ───────────────────────────────────────────
console.log(`  \x1b[2m⏳ Starting server...\x1b[0m\n`);

const env = {
  ...process.env,
  OMNIROUTE_PORT: String(port),
  PORT: String(dashboardPort),
  DASHBOARD_PORT: String(dashboardPort),
  API_PORT: String(apiPort),
  HOSTNAME: "0.0.0.0",
  NODE_ENV: "production",
};

const server = spawn("node", [serverJs], {
  cwd: APP_DIR,
  env,
  stdio: "pipe",
});

let started = false;

server.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // Detect server ready
  if (
    !started &&
    (text.includes("Ready") || text.includes("started") || text.includes("listening"))
  ) {
    started = true;
    onReady();
  }
});

server.stderr.on("data", (data) => {
  process.stderr.write(data);
});

server.on("error", (err) => {
  console.error("\x1b[31m✖ Failed to start server:\x1b[0m", err.message);
  process.exit(1);
});

server.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\x1b[31m✖ Server exited with code ${code}\x1b[0m`);
  }
  process.exit(code ?? 0);
});

// ── Graceful shutdown ──────────────────────────────────────
function shutdown() {
  console.log("\n\x1b[33m⏹ Shutting down OmniRoute...\x1b[0m");
  server.kill("SIGTERM");
  setTimeout(() => {
    server.kill("SIGKILL");
    process.exit(0);
  }, 5000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// ── On ready ───────────────────────────────────────────────
async function onReady() {
  const dashboardUrl = `http://localhost:${dashboardPort}`;
  const apiUrl = `http://localhost:${apiPort}`;

  console.log(`
  \x1b[32m✔ OmniRoute is running!\x1b[0m

  \x1b[1m  Dashboard:\x1b[0m  ${dashboardUrl}
  \x1b[1m  API Base:\x1b[0m   ${apiUrl}/v1

  \x1b[2m  Point your CLI tool (Cursor, Cline, Codex) to:\x1b[0m
  \x1b[33m  ${apiUrl}/v1\x1b[0m

  \x1b[2m  Press Ctrl+C to stop\x1b[0m
  `);

  if (!noOpen) {
    try {
      const open = await import("open");
      await open.default(dashboardUrl);
    } catch {
      // open is optional — if not available, just skip
    }
  }
}

// Fallback: if no "Ready" message detected in 15s, assume server is up
setTimeout(() => {
  if (!started) {
    started = true;
    onReady();
  }
}, 15000);
