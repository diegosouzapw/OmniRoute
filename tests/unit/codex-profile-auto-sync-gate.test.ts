import test from "node:test";
import assert from "node:assert/strict";

import { autoSyncCodexProfilesFromLiveCatalog } from "@/lib/cli-helper/codexProfileAutoSync";

// #5737 hardening: the Codex profile auto-sync writes files into the operator's ~/.codex,
// so it MUST be opt-in (default OFF) and MUST short-circuit before any catalog fetch / file
// write when either gate is closed. These tests pin the two gates (env opt-in + the existing
// CLI_ALLOW_CONFIG_WRITES write-guard) so a future change can't silently turn it back on.

const GATE_ENV = ["OMNIROUTE_AUTO_SYNC_CODEX_PROFILES", "CLI_ALLOW_CONFIG_WRITES"] as const;

function snapshotEnv(): Record<string, string | undefined> {
  const snap: Record<string, string | undefined> = {};
  for (const k of GATE_ENV) snap[k] = process.env[k];
  return snap;
}

function restoreEnv(snap: Record<string, string | undefined>): void {
  for (const k of GATE_ENV) {
    if (snap[k] === undefined) delete process.env[k];
    else process.env[k] = snap[k];
  }
}

function mockSyncRequest(): Request {
  // A local model-sync request; the gate returns before any header is actually forwarded.
  return new Request("http://127.0.0.1:20128/api/providers/openai/sync-models", { method: "POST" });
}

test("auto-sync is OFF by default (flag unset) — returns disabled, never fetches or writes", async () => {
  const snap = snapshotEnv();
  try {
    delete process.env.OMNIROUTE_AUTO_SYNC_CODEX_PROFILES;
    const result = await autoSyncCodexProfilesFromLiveCatalog(
      mockSyncRequest(),
      "test:default-off"
    );
    assert.equal(result.ok, false);
    assert.equal(result.reason, "disabled");
  } finally {
    restoreEnv(snap);
  }
});

test("explicit OMNIROUTE_AUTO_SYNC_CODEX_PROFILES=false stays disabled", async () => {
  const snap = snapshotEnv();
  try {
    process.env.OMNIROUTE_AUTO_SYNC_CODEX_PROFILES = "false";
    const result = await autoSyncCodexProfilesFromLiveCatalog(
      mockSyncRequest(),
      "test:explicit-false"
    );
    assert.equal(result.ok, false);
    assert.equal(result.reason, "disabled");
  } finally {
    restoreEnv(snap);
  }
});

test("non-truthy flag values ('0', 'no', 'off', 'maybe') stay disabled", async () => {
  const snap = snapshotEnv();
  try {
    for (const v of ["0", "no", "off", "maybe", ""]) {
      process.env.OMNIROUTE_AUTO_SYNC_CODEX_PROFILES = v;
      const result = await autoSyncCodexProfilesFromLiveCatalog(mockSyncRequest(), `test:${v}`);
      assert.equal(result.ok, false, `value '${v}' must not enable auto-sync`);
      assert.equal(result.reason, "disabled", `value '${v}' must report disabled`);
    }
  } finally {
    restoreEnv(snap);
  }
});

test("enabled flag but CLI_ALLOW_CONFIG_WRITES=false is blocked by the write-guard (no write)", async () => {
  const snap = snapshotEnv();
  try {
    process.env.OMNIROUTE_AUTO_SYNC_CODEX_PROFILES = "true";
    process.env.CLI_ALLOW_CONFIG_WRITES = "false";
    const result = await autoSyncCodexProfilesFromLiveCatalog(
      mockSyncRequest(),
      "test:write-guard"
    );
    assert.equal(result.ok, false);
    assert.match(result.reason, /CLI config writes are disabled/);
  } finally {
    restoreEnv(snap);
  }
});
