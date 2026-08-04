import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Regression test for #6162 (liveness portion): `omniroute doctor` reported
// "Server liveness: Server responded with HTTP 401" on healthy installs
// because /api/health and /api/health/degradation both require the management
// token. The doctor called them without auth → 401 → WARN, even when the
// Next.js server was clearly alive and listening.
//
// Fix: probe the configured health endpoint first; on 401/403, fall back to
// a publicly served static asset (/favicon.ico) to confirm the server is
// alive. WARN now only fires when both probes fail.
//
// This regression test asserts:
//   1. The current doctor.mjs source contains the fallback logic.
//   2. The fallback derives its URL from the primary URL via `new URL()`
//      so custom host/port/protocol are preserved (Gemini code-assist review).

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DOCTOR_SRC = join(ROOT, "bin/cli/commands/doctor.mjs");

test("doctor.mjs must exist", () => {
  assert.ok(existsSync(DOCTOR_SRC), "bin/cli/commands/doctor.mjs should exist");
});

test("doctor.mjs implements a /favicon.ico fallback for unauthenticated liveness (#6162)", () => {
  const content = readFileSync(DOCTOR_SRC, "utf8");

  assert.ok(
    content.includes("/favicon.ico"),
    "doctor.mjs must include /favicon.ico as a fallback probe (fix for #6162)"
  );

  // The probe order matters: try the configured health endpoint first, then
  // fall back. Locking the order prevents future refactors from regressing
  // back to "always report WARN on 401".
  assert.ok(
    /\bprimary\.ok\b/.test(content),
    "doctor.mjs must branch on `primary.ok` to decide whether to fall back to /favicon.ico"
  );
});

test("doctor.mjs derives fallback URL from primary URL via new URL() (Gemini review)", () => {
  const content = readFileSync(DOCTOR_SRC, "utf8");

  assert.ok(
    content.includes("new URL("),
    "doctor.mjs must derive the fallback URL from the primary URL via `new URL()` to preserve protocol/host/port (Gemini review feedback on PR #6163)"
  );
});

test("doctor.mjs no longer reports WARN on HTTP 401/403 alone", () => {
  const content = readFileSync(DOCTOR_SRC, "utf8");

  // Old (buggy) line was:
  //   return warn("Server liveness", `Server responded with HTTP ${response.status}`, { url });
  // This asserted immediately on !response.ok without considering auth.
  // The fix should NOT contain that exact phrase anymore.
  assert.ok(
    !content.includes("`Server responded with HTTP ${response.status}`"),
    "doctor.mjs must not contain the buggy 'Server responded with HTTP ${response.status}' warn message (would be hit on auth-required 401)"
  );
});