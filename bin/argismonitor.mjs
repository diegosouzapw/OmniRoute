#!/usr/bin/env node

/**
 * ArgisMonitor CLI entry point (formerly `omniroute`).
 *
 * This is the canonical binary for the ArgisMonitor distribution of
 * KooshaPari/OmniRoute. The legacy `omniroute` binary is preserved as a
 * thin shim that re-exports here with a one-time deprecation notice.
 *
 * Special bypasses (handled before Commander):
 *   --mcp                     Start MCP server over stdio
 *   reset-encrypted-columns   Recovery tool for broken encrypted credentials
 *
 * All other commands are routed through Commander (bin/cli/program.mjs).
 */

import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import updateNotifier from "update-notifier";
import { isNativeBinaryCompatible } from "../scripts/build/native-binary-compat.mjs";
import { getNodeRuntimeSupport, getNodeRuntimeWarning } from "./nodeRuntimeSupport.mjs";
import { getDefaultDataDir } from "./cli/data-dir.mjs";
import { shouldProvisionStorageKey } from "./cli/utils/storageKeyProvision.mjs";

// -----------------------------------------------------------------------------
// ArgisMonitor additive-rename shim layer
// -----------------------------------------------------------------------------
// New identifiers (canonical):
//   - binary:        `argismonitor`
//   - data dir:      `~/.argismonitor` (DATA_DIR)
//   - env vars:      ARGIS_* (ARGIS_LANG, ARGIS_NO_UPDATE_NOTIFIER,
//                     ARGIS_CLI_SKIP_REPO_ENV, ARGIS_DATA_DIR, ...)
//   - npm pkg:       `argismonitor` (with @argismonitor/* scoped pkgs)
//   - repo:          KooshaPari/ArgisMonitor (post-rename)
//
// Legacy aliases (preserved; emit a one-time stderr notice on first use):
//   - binary:        `omniroute`         -> bin/omniroute.mjs shim
//   - data dir:      `~/.omniroute`      (fallback if ARGIS_DATA_DIR unset)
//   - env vars:      OMNIROUTE_*         (read AFTER ARGIS_*)
//   - npm pkg:       `omniroute`         (deprecated redirect post-publish)
//
// To silence the legacy-notice:
//   OMNIROUTE_LEGACY=1 argismonitor ...
// or:
//   ARGIS_LEGACY_OFF=1 argismonitor ...
//
// Removal window: tracked in docs/RENAMES-STRATEGY.md (no earlier than 6
// months after the `KooshaPari/OmniRoute` -> `KooshaPari/ArgisMonitor`
// rename is pushed to remote + npm `argismonitor` is published as `latest`).
// -----------------------------------------------------------------------------

// Bridge OMNIROUTE_* env vars -> ARGIS_* if the new names are unset. This
// lets existing automation keep working while we migrate.
const ENV_BRIDGE = {
  ARGIS_LANG: ["OMNIROUTE_LANG"],
  ARGIS_NO_UPDATE_NOTIFIER: ["OMNIROUTE_NO_UPDATE_NOTIFIER"],
  ARGIS_CLI_SKIP_REPO_ENV: ["OMNIROUTE_CLI_SKIP_REPO_ENV"],
  ARGIS_DATA_DIR: ["OMNIROUTE_DATA_DIR", "DATA_DIR"],
  ARGIS_LEGACY_OFF: ["OMNIROUTE_LEGACY"],
};
const _legacyHits = [];
for (const [newKey, oldKeys] of Object.entries(ENV_BRIDGE)) {
  if (process.env[newKey] === undefined) {
    for (const oldKey of oldKeys) {
      if (process.env[oldKey] !== undefined) {
        process.env[newKey] = process.env[oldKey];
        _legacyHits.push(oldKey);
        break;
      }
    }
  }
}
// Emit a one-time legacy-notice (suppressed in CI / OMNIROUTE_LEGACY=1).
if (_legacyHits.length > 0 && !process.env.CI) {
  const silenced =
    process.env.OMNIROUTE_LEGACY === "1" || process.env.ARGIS_LEGACY_OFF === "1";
  if (!silenced) {
    process.stderr.write(
      "\x1b[33m⚠ ArgisMonitor legacy env vars detected: " +
        _legacyHits.join(", ") +
        "\x1b[0m\n" +
        "  These will be removed in a future release. Migrate to:\n" +
        _legacyHits.map((k) => `    ${k.replace(/^OMNIROUTE_/, "ARGIS_")}`).join("\n") +
        "\n" +
        "  Silence this notice with: ARGIS_LEGACY_OFF=1\n" +
        "  See docs/RENAMES-STRATEGY.md for the migration window.\n"
    );
  }
}

// Register tsx so dynamic imports of .ts source files (referenced as .js per
// TypeScript conventions) resolve correctly. The build never emits .js for
// src/lib/cli-helper/, so tsx handles the .ts → .js resolution at runtime.
await import("tsx/esm");
await import("../open-sse/utils/setupPolyfill.ts");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// MCP stdio transport uses stdout exclusively for JSON-RPC messages.
// Redirect console.log/warn to stderr early (before loadEnvFile and DB init)
// so no startup output corrupts the protocol.
if (process.argv.includes("--mcp")) {
  const { Console } = await import("node:console");
  const stderrConsole = new Console({ stdout: process.stderr, stderr: process.stderr });
  console.log = stderrConsole.log.bind(stderrConsole);
  console.warn = stderrConsole.warn.bind(stderrConsole);
}

function loadEnvFile() {
  const envPaths = [];
  const loadedEnvPaths = [];
  const seenEnvPaths = new Set();
  const addEnvPath = (envPath) => {
    if (seenEnvPaths.has(envPath)) return;
    seenEnvPaths.add(envPath);
    envPaths.push(envPath);
  };

  if (process.env.DATA_DIR || process.env.ARGIS_DATA_DIR) {
    addEnvPath(join(process.env.ARGIS_DATA_DIR || process.env.DATA_DIR, ".env"));
  }

  addEnvPath(join(getDefaultDataDir(), ".env"));

  addEnvPath(join(process.cwd(), ".env"));
  // Skip the repo-checkout .env when explicitly requested (used by isolation tests
  // that need a deterministic environment without the development repo's defaults).
  if (process.env.OMNIROUTE_CLI_SKIP_REPO_ENV !== "1" && process.env.ARGIS_CLI_SKIP_REPO_ENV !== "1") {
    addEnvPath(join(ROOT, ".env"));
  }

  for (const envPath of envPaths) {
    try {
      if (existsSync(envPath)) {
        const content = readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const value = trimmed.slice(eqIdx + 1).trim();
            if (process.env[key] === undefined) {
              process.env[key] = value.replace(/^["']|["']$/g, "");
            }
          }
        }
        loadedEnvPaths.push(envPath);
      }
    } catch {
      // Ignore errors reading env files.
    }
  }

  for (const envPath of loadedEnvPaths) {
    console.log(`  \x1b[2m📋 Loaded env from ${envPath}\x1b[0m`);
  }
}

loadEnvFile();

// Generate STORAGE_ENCRYPTION_KEY if not set (persisted to ~/.omniroute/.env)
// This ensures the key survives across upgrades and is not regenerated on each install.
// See: https://github.com/diegosouzapw/OmniRoute/issues/1622
//
// Only provision for commands that actually touch encrypted storage. Purely
// informational invocations (`--version`, `--help`, `help`) must not create a
// key or write ~/.omniroute/.env — running a read-only command should never
// mutate the data dir.
if (shouldProvisionStorageKey(process.argv)) {
  const { randomBytes } = await import("node:crypto");
  const { existsSync, mkdirSync, readFileSync, writeFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const { homedir } = await import("node:os");

  if (!process.env.STORAGE_ENCRYPTION_KEY) {
    // Persist the key into DATA_DIR when set — that's the directory mounted as a volume in
    // Docker (where storage.sqlite lives), so the key survives `docker down` / `docker pull`.
    // Writing only to ~/.omniroute (the container home, not a volume) silently lost the key on
    // container recreation, leaving the persisted encrypted DB undecryptable (regression of #1622).
    const dataDir = process.env.ARGIS_DATA_DIR || process.env.DATA_DIR || join(homedir(), ".argismonitor");
    const envPath = join(dataDir, ".env");
    const dbPath = join(dataDir, "storage.sqlite");

    // Safety guard: never auto-generate a fresh key when a database already exists in
    // DATA_DIR. A new key cannot decrypt previously-encrypted credentials and would lock the
    // user out (then the encryption layer aborts on every read). Mirrors bootstrapEnv's
    // hasEncryptedCredentials guard. Restoring the previous key in DATA_DIR/.env recovers it.
    // (#1622 follow-up — reported by Daniel Nach; original persistence by @Chewji9875)
    if (existsSync(dbPath)) {
      console.warn(
        `  \x1b[33m⚠ STORAGE_ENCRYPTION_KEY is not set but a database already exists at\x1b[0m\n` +
          `  \x1b[33m  ${dbPath}\x1b[0m\n` +
          `  \x1b[33m  Not auto-generating a new key — it could not decrypt existing data. Restore your\x1b[0m\n` +
          `  \x1b[33m  previous key in ${envPath}, or move/remove the database to start fresh.\x1b[0m`
      );
    } else {
      // First run (no database yet) — generate and persist a fresh key.
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
      }

      const key = randomBytes(32).toString("hex");

      // Read existing .env content or start fresh
      let content = "";
      if (existsSync(envPath)) {
        content = readFileSync(envPath, "utf-8");
      }

      // Append key if not already present
      if (!content.includes("STORAGE_ENCRYPTION_KEY=")) {
        const separator = content.trim() ? "\n" : "";
        const newContent = content.trimEnd() + separator + `STORAGE_ENCRYPTION_KEY=${key}`;
        writeFileSync(envPath, newContent + "\n", "utf-8");
        console.log(`  \x1b[2m✨ Generated STORAGE_ENCRYPTION_KEY in ${envPath}\x1b[0m`);
      }

      // Set in process.env for immediate use
      process.env.STORAGE_ENCRYPTION_KEY = key;
    }
  }
}

// Apply --lang before Commander parses (program descriptions call t() during setup)
{
  const langIdx = process.argv.findIndex((a) => a === "--lang");
  const langArg = langIdx >= 0 ? process.argv[langIdx + 1] : null;
  const langEnv = process.env.ARGIS_LANG || process.env.OMNIROUTE_LANG;
  const chosen = langArg || langEnv;
  if (chosen) {
    const { setLocale } = await import(
      pathToFileURL(join(ROOT, "bin", "cli", "i18n.mjs")).href
    );
    setLocale(chosen);
  }
}

// Register update notifier — checks npm once per 24h, notifies on exit via stderr.
const _pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const _notifier = updateNotifier({ pkg: _pkg, updateCheckInterval: 1000 * 60 * 60 * 24 });
process.on("exit", () => {
  if (process.env.OMNIROUTE_NO_UPDATE_NOTIFIER || process.env.ARGIS_NO_UPDATE_NOTIFIER) return;
  if (process.env.CI) return;
  if (process.argv.includes("--quiet") || process.argv.includes("-q")) return;
  const outputIdx = process.argv.indexOf("--output");
  const outputVal = outputIdx >= 0 ? process.argv[outputIdx + 1] : null;
  if (outputVal === "json" || outputVal === "jsonl" || outputVal === "csv") return;
  if (process.argv.some((a) => a.startsWith("--output=json") || a.startsWith("--output=jsonl") || a.startsWith("--output=csv"))) return;
  if (_notifier.update) {
    _notifier.notify({
      defer: false,
      isGlobal: true,
      message:
        `Update available: ${_notifier.update.current} → ${_notifier.update.latest}\n` +
        "Run `npm install -g argismonitor` or `argismonitor update --apply`",
    });
  }
});

if (process.argv.includes("--mcp")) {
  try {
    const { startMcpCli } = await import(pathToFileURL(join(ROOT, "bin", "mcp-server.mjs")).href);
    await startMcpCli(ROOT);
  } catch (err) {
    console.error("\x1b[31m✖ Failed to start MCP server:\x1b[0m", err.message || err);
    process.exit(1);
  }
  process.exit(0);
}

if (process.argv.includes("reset-encrypted-columns")) {
  const { runResetEncryptedColumns } = await import(
    pathToFileURL(join(ROOT, "bin", "cli", "commands", "reset-encrypted-columns.mjs")).href
  );
  const exitCode = await runResetEncryptedColumns(process.argv.slice(2));
  process.exit(exitCode ?? 0);
}

try {
  const { createProgram } = await import(
    pathToFileURL(join(ROOT, "bin", "cli", "program.mjs")).href
  );
  const program = createProgram();
  await program.parseAsync(process.argv);
} catch (err) {
  if (err.exitCode !== undefined) process.exit(err.exitCode);
  console.error("\x1b[31m✖", err.message, "\x1b[0m");
  process.exit(1);
}
