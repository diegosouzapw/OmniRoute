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
