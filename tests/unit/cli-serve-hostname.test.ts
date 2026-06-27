import test from "node:test";
import assert from "node:assert/strict";

/**
 * Replicate the HOSTNAME resolution from bin/cli/commands/serve.mjs to verify
 * that the spawned server honours a HOSTNAME provided via env/.env instead of
 * always hardcoding "0.0.0.0" (#5134). Mirrors the in-file replication pattern
 * used by cli-serve-port.test.ts (serve.mjs spawns processes, so the logic is
 * tested in isolation rather than imported).
 */
function resolveHostname(envHostname: string | undefined): string {
  return envHostname || "0.0.0.0";
}

test("serve hostname: honours HOSTNAME env var when set", () => {
  assert.equal(resolveHostname("127.0.0.1"), "127.0.0.1");
});

test("serve hostname: honours a specific bind interface", () => {
  assert.equal(resolveHostname("192.168.0.15"), "192.168.0.15");
});

test("serve hostname: falls back to 0.0.0.0 when HOSTNAME is unset", () => {
  assert.equal(resolveHostname(undefined), "0.0.0.0");
});

test("serve hostname: falls back to 0.0.0.0 when HOSTNAME is an empty string", () => {
  assert.equal(resolveHostname(""), "0.0.0.0");
});
