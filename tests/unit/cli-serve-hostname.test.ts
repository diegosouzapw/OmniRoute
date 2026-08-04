import test from "node:test";
import assert from "node:assert/strict";

/**
 * Replicate the HOSTNAME resolution from bin/cli/commands/serve.mjs to verify
 * the #6194 fix: POSIX shells auto-set HOSTNAME to the machine name, which
 * collides with the bind address. The fix uses os.hostname() to detect the
 * auto-set signature and ignores it, while preserving backward compatibility
 * for explicit HOSTNAME values (e.g. Windows CMD/PowerShell users).
 *
 * Resolution order:
 *   1. OMNIROUTE_SERVER_HOST (new dedicated var — always wins)
 *   2. HOSTNAME if it does NOT match os.hostname() (legacy backward compat)
 *   3. "0.0.0.0" (default)
 */
function resolveHostname(
  envServerHost: string | undefined,
  envHostname: string | undefined,
  machineHostname: string
): string {
  return envServerHost || (envHostname !== machineHostname ? envHostname : undefined) || "0.0.0.0";
}

// --- OMNIROUTE_SERVER_HOST takes precedence ---

test("serve hostname: OMNIROUTE_SERVER_HOST takes precedence over everything", () => {
  assert.equal(resolveHostname("127.0.0.1", "myhostname", "myhostname"), "127.0.0.1");
});

test("serve hostname: OMNIROUTE_SERVER_HOST overrides an explicit HOSTNAME", () => {
  assert.equal(resolveHostname("192.168.1.100", "10.0.0.1", "myhostname"), "192.168.1.100");
});

// --- POSIX shell auto-set detection (the #6194 bug) ---

test("serve hostname: POSIX auto-set HOSTNAME (matches os.hostname()) is ignored (#6194)", () => {
  // bash/zsh sets HOSTNAME=<machine-name>. When it matches os.hostname(),
  // it's the auto-set signature — must be ignored.
  assert.equal(resolveHostname(undefined, "myhostname", "myhostname"), "0.0.0.0");
});

// --- Backward compatibility for explicit HOSTNAME values ---

test("serve hostname: explicit HOSTNAME (not matching os.hostname()) is preserved", () => {
  // Windows CMD/PowerShell user who set HOSTNAME=192.168.1.50 in .env
  // HOSTNAME != os.hostname() → treat as intentional user config
  assert.equal(resolveHostname(undefined, "192.168.1.50", "myhostname"), "192.168.1.50");
});

test("serve hostname: localhost as explicit HOSTNAME is preserved", () => {
  assert.equal(resolveHostname(undefined, "localhost", "myhostname"), "localhost");
});

// --- Default fallback ---

test("serve hostname: falls back to 0.0.0.0 when both are unset", () => {
  assert.equal(resolveHostname(undefined, undefined, "myhostname"), "0.0.0.0");
});

test("serve hostname: falls back to 0.0.0.0 when both are empty strings", () => {
  assert.equal(resolveHostname("", "", "myhostname"), "0.0.0.0");
});

test("serve hostname: OMNIROUTE_SERVER_HOST empty string falls through to HOSTNAME check", () => {
  // Empty string is falsy → falls through; HOSTNAME is auto-set → ignored → 0.0.0.0
  assert.equal(resolveHostname("", "myhostname", "myhostname"), "0.0.0.0");
});

test("serve hostname: OMNIROUTE_SERVER_HOST empty string with explicit HOSTNAME", () => {
  // Empty string is falsy → falls through; HOSTNAME != os.hostname() → used
  assert.equal(resolveHostname("", "10.0.0.5", "myhostname"), "10.0.0.5");
});
