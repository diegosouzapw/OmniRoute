#!/usr/bin/env node

/**
 * `omniroute` deprecation shim (replaced by `argismonitor`).
 *
 * ArgisMonitor is the new canonical name for this distribution of
 * OmniRoute (see KooshaPari/OmniRoute and KooshaPari/ArgisMonitor).
 * The old `omniroute` binary is kept as a thin compatibility wrapper:
 *
 *   - First invocation per process prints a one-time deprecation notice
 *     pointing at the new binary and install instructions.
 *   - All argv are forwarded to `argismonitor.mjs` unchanged, so every
 *     command, flag, env-var, MCP entry-point, and recovery tool behaves
 *     identically.
 *
 * To silence the notice:
 *   OMNIROUTE_LEGACY=1 omniroute ...
 *
 * To migrate:
 *   npm uninstall -g omniroute
 *   npm install -g argismonitor
 *
 * This shim is removed after a deprecation window; tracked in
 * `docs/FORK.md` and `docs/RENAMES-STRATEGY.md`.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const target = join(__dirname, "argismonitor.mjs");

if (!existsSync(target)) {
  console.error(
    "\x1b[31m✖ omniroute shim cannot find argismonitor.mjs at " + target + "\x1b[0m\n" +
      "  This usually means the install is incomplete. Reinstall:\n" +
      "    npm install -g argismonitor\n"
  );
  process.exit(1);
}

if (process.env.OMNIROUTE_LEGACY !== "1" && !process.env.CI) {
  process.stderr.write(
    "\x1b[33m⚠ `omniroute` is deprecated and forwards to `argismonitor`.\x1b[0m\n" +
      "  Reinstall as:  npm install -g argismonitor\n" +
      "  Silence notice: OMNIROUTE_LEGACY=1 omniroute ...\n" +
      "  See docs/RENAMES-STRATEGY.md for the migration window.\n"
  );
}

// Forward every argv (including the node executable and this shim path) to the new entry point.
// We invoke node directly on argismonitor.mjs so its shebang is irrelevant here.
const child = spawn(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});