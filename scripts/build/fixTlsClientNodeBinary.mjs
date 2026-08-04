#!/usr/bin/env node

/**
 * tls-client-node postinstall repair (#7802).
 *
 * tls-client-node's own postinstall.js fetches a platform-specific native
 * binary (.so/.dylib/.dll) from the bogdanfinn/tls-client GitHub Releases
 * API. That script is blocked by `npm ci --ignore-scripts` (the Dockerfile
 * builder stage runs with scripts disabled for supply-chain hygiene) and,
 * even when it does run, silently no-ops on a rate-limited/failed GitHub API
 * call instead of raising — so `node_modules/tls-client-node/bin/` can end
 * up empty with no visible signal until the first live request throws
 * TlsClientUnavailableError (chatgpt-web/claude-web/grok-web/lmarena/
 * perplexity-web all share this transport).
 *
 * This module:
 *   1. Copies an already-fetched root `bin/` into the standalone
 *      `dist/node_modules/tls-client-node/bin/` bundle (same pattern as
 *      fixWreqJsBinary), so the published npm package works even though its
 *      own `files` allowlist never ships the binary.
 *   2. When the root `bin/` is empty (--ignore-scripts blocked it, or a
 *      transient GitHub rate-limit ate the first attempt), retries the
 *      module's own postinstall.js with exponential backoff instead of
 *      giving up on the first failure.
 *
 * Best-effort throughout: a failure here never throws out of postinstall.mjs
 * — it only warns, matching the other fix*Binary() steps. The runtime layer
 * (perplexityTlsClient.ts and its 4 siblings) already surfaces a clear
 * TlsClientUnavailableError pointing at the missing binary, so an operator
 * who hits a still-empty bin/ after this repair gets an actionable message
 * rather than an opaque crash.
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DEFAULT_RETRY_DELAYS_MS = [1_000, 3_000, 8_000];

function hasAnyFile(dir) {
  if (!existsSync(dir)) return false;
  try {
    return readdirSync(dir).length > 0;
  } catch {
    return false;
  }
}

function copyBinDir(sourceDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  for (const file of readdirSync(sourceDir)) {
    copyFileSync(join(sourceDir, file), join(destDir, file));
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Re-run tls-client-node's own postinstall.js in-process, retrying with
 * backoff when the attempt leaves `bin/` empty (covers transient GitHub API
 * rate-limiting — the upstream script itself never throws on failure, it
 * only warns, so "still empty after running it" is the only failure signal
 * available).
 */
async function downloadWithRetry(rootTlsClientDir, retryDelaysMs, log) {
  const postinstallScript = join(rootTlsClientDir, "scripts", "postinstall.js");
  const binDir = join(rootTlsClientDir, "bin");
  if (!existsSync(postinstallScript)) return false;

  for (let attempt = 0; attempt <= retryDelaysMs.length; attempt++) {
    if (attempt > 0) {
      log(
        `  ⏳ tls-client-node native binary still missing — retrying download ` +
          `(attempt ${attempt + 1}/${retryDelaysMs.length + 1}) after rate-limit/backoff...`
      );
      await sleep(retryDelaysMs[attempt - 1]);
    }

    try {
      const { execFileSync } = await import("node:child_process");
      execFileSync(process.execPath, [postinstallScript], {
        cwd: rootTlsClientDir,
        stdio: "pipe",
        timeout: 30_000,
      });
    } catch (err) {
      log(`  ⚠️  tls-client-node postinstall attempt failed: ${err.message.split("\n")[0]}`);
    }

    if (hasAnyFile(binDir)) return true;
  }

  return false;
}

/**
 * @param {object} opts
 * @param {string} opts.rootDir - repo root
 * @param {(msg: string) => void} [opts.log]
 * @param {number[]} [opts.retryDelaysMs] - override for tests (avoid real sleeps)
 */
export async function fixTlsClientNodeBinary({
  rootDir,
  log = (m) => console.log(m),
  retryDelaysMs = DEFAULT_RETRY_DELAYS_MS,
} = {}) {
  const rootTlsClientDir = join(rootDir, "node_modules", "tls-client-node");
  const rootBinDir = join(rootTlsClientDir, "bin");
  const distTlsClientDir = join(rootDir, "dist", "node_modules", "tls-client-node");

  if (!existsSync(rootTlsClientDir)) return;

  if (!hasAnyFile(rootBinDir)) {
    log(
      "\n  🔧 tls-client-node native binary missing (blocked by --ignore-scripts or a " +
        "failed fetch) — attempting repair...\n"
    );
    const recovered = await downloadWithRetry(rootTlsClientDir, retryDelaysMs, log);
    if (!recovered) {
      console.warn(
        "\n  ⚠️  Could not fetch tls-client-node's native binary " +
          "(GitHub API rate-limited or unreachable after retries)."
      );
      console.warn(
        "     chatgpt-web/claude-web/grok-web/lmarena/perplexity-web will raise a clear " +
          "TlsClientUnavailableError on first use until this is resolved."
      );
      console.warn(
        `     Manual fix: node ${join(rootTlsClientDir, "scripts", "postinstall.js")}\n`
      );
      return;
    }
    log("  ✅ tls-client-node native binary fetched successfully!\n");
  }

  if (!existsSync(distTlsClientDir) || !hasAnyFile(rootBinDir)) return;

  const distBinDir = join(distTlsClientDir, "bin");
  if (hasAnyFile(distBinDir)) return;

  try {
    copyBinDir(rootBinDir, distBinDir);
    log("  ✅ tls-client-node native binary copied to standalone dist/node_modules.\n");
  } catch (err) {
    console.warn(`  ⚠️  Could not copy tls-client-node binary into dist/: ${err.message}`);
  }
}
