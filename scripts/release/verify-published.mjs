#!/usr/bin/env node
/**
 * verify-published — post-publish net for the npm channel (WS1.4, #7065 class).
 *
 * After `npm stage approve` (or any publish), install the PUBLISHED version from the
 * PUBLIC registry inside a clean `node:24-slim` container and boot it to a healthy
 * /api/monitoring/health that reports the expected version. This is the last net:
 * it validates the exact bytes users will install, on a machine with none of our
 * repo/devbox state. Wired into /generate-release Phase 4 (monitoring).
 *
 * Usage: node scripts/release/verify-published.mjs <version>
 * Requires Docker (the clean container IS the point). Exit: 0 verified ·
 * 1 boot/version failure · 2 bad usage / docker unavailable.
 */
import { execFileSync, spawnSync } from "node:child_process";

const BOOT_DEADLINE_S = 240;
const PORT = 23987;

/** Strict semver (with optional prerelease) — the version reaches a shell inside
 *  the container via env, but validate anyway (Hard Rule #13 defense in depth). */
export function parseVersionArg(arg) {
  if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(arg || "")) return null;
  return arg;
}

/** docker invocation — version and knobs travel as env vars, never interpolated
 *  into the script body (Hard Rule #13). */
export function buildDockerArgs(version) {
  return [
    "run",
    "--rm",
    "-e",
    `VERIFY_VERSION=${version}`,
    "-e",
    `VERIFY_PORT=${PORT}`,
    "-e",
    `VERIFY_DEADLINE_S=${BOOT_DEADLINE_S}`,
    "node:24-slim",
    "bash",
    "-lc",
    CONTAINER_SCRIPT,
  ];
}

// Runs INSIDE node:24-slim. Reads everything from env; polls with node's fetch
// (slim has no curl). Kept as a single quoted constant — no runtime interpolation.
export const CONTAINER_SCRIPT = `
set -euo pipefail
echo "[verify-published] npm i -g omniroute@\${VERIFY_VERSION} (public registry)"
npm install -g "omniroute@\${VERIFY_VERSION}"
export DATA_DIR=/tmp/omniroute-data JWT_SECRET=verify-published-secret-with-sufficient-length API_KEY_SECRET=verify-published-api-key-secret DISABLE_SQLITE_AUTO_BACKUP=true OMNIROUTE_SKIP_SYSTEM_TRUST=1
mkdir -p "\$DATA_DIR"
omniroute serve --port "\$VERIFY_PORT" &
node -e '
const port = process.env.VERIFY_PORT;
const want = process.env.VERIFY_VERSION;
const deadline = Date.now() + Number(process.env.VERIFY_DEADLINE_S) * 1000;
(async () => {
  while (Date.now() < deadline) {
    try {
      const res = await fetch("http://127.0.0.1:" + port + "/api/monitoring/health");
      const body = await res.json().catch(() => null);
      if (res.status === 200 && body && body.version === want) {
        console.log("[verify-published] healthy: HTTP 200, version " + body.version);
        process.exit(0);
      }
      if (res.status === 200 && body && body.version !== want) {
        console.error("[verify-published] WRONG VERSION: " + body.version + " (want " + want + ")");
        process.exit(1);
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.error("[verify-published] deadline: server never became healthy");
  process.exit(1);
})();
'
`;

function main() {
  const version = parseVersionArg(process.argv[2]);
  if (!version) {
    console.error("usage: node scripts/release/verify-published.mjs <version> [--no-docker]");
    process.exit(2);
  }
  try {
    execFileSync("docker", ["--version"], { stdio: "ignore" });
  } catch {
    console.error("[verify-published] docker unavailable — this verifier requires a clean container");
    process.exit(2);
  }
  console.log(`[verify-published] clean-container verify of omniroute@${version}…`);
  const r = spawnSync("docker", buildDockerArgs(version), { stdio: "inherit" });
  if (r.status === 0) {
    console.log("[verify-published] ✅ the published package installs and boots");
    process.exit(0);
  }
  console.error(`[verify-published] ❌ FAILED (exit ${r.status}) — consider: npm deprecate omniroute@${version} "<reason>"`);
  process.exit(1);
}

import path from "node:path";
const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isDirectRun) main();
