import test from "node:test";
import assert from "node:assert/strict";

/**
 * Replicate the parsePort + port resolution logic from bin/cli/commands/serve.mjs
 * to verify that PORT env var is respected when --port is not passed.
 */
function parsePort(value: string | undefined, fallback: number): number {
  const parsed = parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

function resolvePort(optsPort: string | undefined, envPort: string | undefined): number {
  return parsePort(optsPort ?? envPort ?? "20128", 20128);
}

test("serve port: uses --port flag when explicitly provided", () => {
  const port = resolvePort("3000", "9999");
  assert.equal(port, 3000);
});

test("serve port: falls back to PORT env var when --port is not provided", () => {
  const port = resolvePort(undefined, "20129");
  assert.equal(port, 20129);
});

test("serve port: falls back to 20128 when neither --port nor PORT env var is set", () => {
  const port = resolvePort(undefined, undefined);
  assert.equal(port, 20128);
});

test("serve port: invalid --port falls back to 20128", () => {
  const port = resolvePort("abc", undefined);
  assert.equal(port, 20128);
});

test("serve port: port 0 is invalid, falls back to 20128", () => {
  const port = resolvePort("0", undefined);
  assert.equal(port, 20128);
});

test("serve port: port > 65535 is invalid, falls back to 20128", () => {
  const port = resolvePort("70000", undefined);
  assert.equal(port, 20128);
});

test("serve command: --port option has no Commander default", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const serveSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs"),
    "utf-8",
  );
  // Ensure the option does NOT have a third argument (Commander default)
  assert.match(serveSource, /\.option\("--port <port>",\s*t\("serve\.port"\)\)/);
});

/**
 * Replicate the APP_DIR resolution from bin/cli/commands/serve.mjs to verify the
 * backward-compatibility fallback introduced by the build-output-isolation refactor:
 * the standalone bundle now ships in `dist/`, but an upgrade over a partially-replaced
 * install — or a package built before the rename — must still boot from legacy `app/`.
 */
function resolveAppDir(root: string, distServerExists: boolean): string {
  return distServerExists ? `${root}/dist` : `${root}/app`;
}

test("serve app dir: resolves to dist/ when dist/server.js exists (current layout)", () => {
  assert.equal(resolveAppDir("/opt/omniroute", true), "/opt/omniroute/dist");
});

test("serve app dir: falls back to legacy app/ when dist/server.js is absent (upgrade safety)", () => {
  assert.equal(resolveAppDir("/opt/omniroute", false), "/opt/omniroute/app");
});

test("serve command: APP_DIR keeps the dist/ -> app/ backward-compat fallback", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const serveSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs"),
    "utf-8",
  );
  // Must probe dist/server.js and fall back to app/ — never hard-code dist/ only.
  assert.match(
    serveSource,
    /existsSync\(join\(ROOT, "dist", "server\.js"\)\)\s*\?\s*join\(ROOT, "dist"\)\s*:\s*join\(ROOT, "app"\)/,
  );
});
