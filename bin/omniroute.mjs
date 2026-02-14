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
    omniroute --port <port>   Use custom port (default: 20128)
    omniroute --no-open       Don't open browser automatically
    omniroute --help          Show this help
    omniroute --version       Show version

  \x1b[1mAfter starting:\x1b[0m
    Dashboard:  http://localhost:<port>
    API:        http://localhost:<port>/v1

  \x1b[1mConnect your tools:\x1b[0m
    Set your CLI tool (Cursor, Cline, Codex, etc.) to use:
    \x1b[33mhttp://localhost:20128/v1\x1b[0m
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

// Parse --port
let port = 20128;
const portIdx = args.indexOf("--port");
if (portIdx !== -1 && args[portIdx + 1]) {
  port = parseInt(args[portIdx + 1], 10);
  if (isNaN(port)) {
    console.error("\x1b[31m✖ Invalid port number\x1b[0m");
    process.exit(1);
  }
}

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

// ── Resolve server entry ───────────────────────────────────
const serverJs = join(APP_DIR, "server.js");

if (!existsSync(serverJs)) {
  console.error(
    "\x1b[31m✖ Server not found at:\x1b[0m",
    serverJs,
  );
  console.error(
    "  This usually means the package was not built correctly.",
  );
  console.error("  Try reinstalling: npm install -g omniroute");
  process.exit(1);
}

// ── Start server ───────────────────────────────────────────
console.log(`  \x1b[2m⏳ Starting server...\x1b[0m\n`);

const env = {
  ...process.env,
  PORT: String(port),
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
  if (!started && (text.includes("Ready") || text.includes("started") || text.includes("listening"))) {
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
  const url = `http://localhost:${port}`;

  console.log(`
  \x1b[32m✔ OmniRoute is running!\x1b[0m

  \x1b[1m  Dashboard:\x1b[0m  ${url}
  \x1b[1m  API Base:\x1b[0m   ${url}/v1

  \x1b[2m  Point your CLI tool (Cursor, Cline, Codex) to:\x1b[0m
  \x1b[33m  ${url}/v1\x1b[0m

  \x1b[2m  Press Ctrl+C to stop\x1b[0m
  `);

  if (!noOpen) {
    try {
      const open = await import("open");
      await open.default(url);
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
