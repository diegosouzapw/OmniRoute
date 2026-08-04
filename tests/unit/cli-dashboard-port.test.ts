import test from "node:test";
import assert from "node:assert/strict";

/**
 * Replicate the parsePort + port resolution logic from bin/cli/commands/dashboard.mjs
 * to verify that PORT env var is respected when --port is not passed (mirrors
 * tests/unit/cli-serve-port.test.ts's convention for serve.mjs).
 */
function parsePort(value: string | undefined, fallback: number): number {
  const parsed = parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

function resolvePort(optsPort: string | undefined, envPort: string | undefined): number {
  return parsePort(optsPort ?? envPort ?? "20128", 20128);
}

test("dashboard port: uses --port flag when explicitly provided, overriding env", () => {
  const port = resolvePort("3000", "9999");
  assert.equal(port, 3000);
});

test("dashboard port: falls back to PORT env var when --port is not provided", () => {
  const port = resolvePort(undefined, "20129");
  assert.equal(port, 20129);
});

test("dashboard port: falls back to 20128 when neither --port nor PORT env var is set", () => {
  const port = resolvePort(undefined, undefined);
  assert.equal(port, 20128);
});

test("dashboard port: invalid --port (non-numeric) falls back to 20128", () => {
  const port = resolvePort("abc", undefined);
  assert.equal(port, 20128);
});

test("dashboard port: --port 0 (out of range) falls back to 20128", () => {
  const port = resolvePort("0", undefined);
  assert.equal(port, 20128);
});

test("dashboard port: --port 70000 (out of range) falls back to 20128", () => {
  const port = resolvePort("70000", undefined);
  assert.equal(port, 20128);
});

test("dashboard URL generation: http://localhost:<port> built correctly for a custom port", () => {
  const port = resolvePort(undefined, "31337");
  assert.equal(`http://localhost:${port}`, "http://localhost:31337");
});

test("dashboard command: --port option has no Commander default", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const dashboardSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../bin/cli/commands/dashboard.mjs"),
    "utf-8",
  );
  // Ensure the option does NOT carry a baked-in Commander default (third arg).
  assert.match(
    dashboardSource,
    /\.option\("--port <port>",\s*"Port the server is running on"\)/,
  );
});

test("dashboard command: source references process.env.PORT (env-fallback regression guard)", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const dashboardSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../bin/cli/commands/dashboard.mjs"),
    "utf-8",
  );
  assert.match(dashboardSource, /process\.env\.PORT/);
});
