/**
 * #7274: session affinity ("sticky session") was hardcoded to work for the
 * `codex` provider only — `resolveSessionAffinityTtlMs()` bailed to 0 for
 * every other provider even though the underlying pin mechanism
 * (`selectSessionAffinityConnection`) and header extraction
 * (`extractSessionAffinityKey`) were already provider-agnostic. This test
 * proves:
 *
 * 1. A non-Codex provider with the (renamed, generic) TTL set > 0 now
 *    persists and reuses a pin across two `getProviderCredentials` calls for
 *    the same session key — this must FAIL before the fix (provider !==
 *    "codex" early-return) and PASS after.
 * 2. Existing operators who only ever configured the old
 *    `codexSessionAffinityTtlMs` key keep working unmodified — proven both at
 *    the settings-resolution layer (`resolveSessionAffinityTtlMs` falls back
 *    to the legacy key) and at the raw-SQL layer (migration
 *    124_generic_session_affinity_ttl.sql copies the old key's persisted
 *    value into the new key, additively and idempotently).
 * 3. None of the three session-affinity headers (`x-codex-session-id`,
 *    `x-session-id`, `x-omniroute-session`) are forwarded upstream by
 *    providers that use custom executors with no client-header passthrough.
 *    `x-codex-session-id` and `x-omniroute-session` are never forwarded by
 *    ANY executor (grep-verified, asserted here for the generic DefaultExecutor
 *    path). `x-session-id` is a known, pre-existing exception: DefaultExecutor
 *    (used by most providers without a bespoke executor) forwards it upstream
 *    as an agent-metadata tracking header per 9router#2413 — this predates
 *    #7274, is unrelated to the TTL generalization, and is asserted here as a
 *    documented characterization (not silently claimed safe) rather than
 *    changed, since fixing it is a separate, wider-blast-radius decision
 *    outside this issue's declared scope.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

// NOTE: every module that transitively touches src/lib/db/core.ts (which
// resolves DATA_DIR at MODULE-LOAD time, not lazily) must be imported
// dynamically AFTER process.env.DATA_DIR is set below — a static top-level
// `import` is hoisted and would run before the override, resolving against
// the real ~/.omniroute data dir instead of this test's isolated tmp dir.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-affinity-7274-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "session-affinity-7274-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const affinityDb = await import("../../src/lib/db/sessionAccountAffinity.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { resolveSessionAffinityTtlMs } = await import("../../src/sse/services/sessionAffinityPin.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: (overrides.authType as string) || "api_key",
    name: (overrides.name as string) || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    accessToken: (overrides.accessToken as string) || `at-${Math.random().toString(16).slice(2, 10)}`,
    isActive: (overrides.isActive as boolean) ?? true,
    testStatus: (overrides.testStatus as string) || "active",
    providerSpecificData: (overrides.providerSpecificData as Record<string, unknown>) || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── 1. generic (non-Codex) provider now honors the TTL ──────────────────────

test("#7274 a non-Codex provider with sessionAffinityTtlMs > 0 persists and reuses a pin", async () => {
  await settingsDb.updateSettings({ sessionAffinityTtlMs: 60_000 });

  const connectionA = await seedConnection("glm", { name: "glm-affinity-a" });
  const connectionB = await seedConnection("glm", { name: "glm-affinity-b" });

  const request1 = await auth.getProviderCredentials("glm", null, null, "glm-4.6", {
    sessionKey: "session-generic",
    forcedConnectionId: connectionA.id,
  });
  assert.equal(request1?.connectionId, connectionA.id, "first request pins to the forced connection");
  assert.equal(
    affinityDb.getSessionAccountAffinity("session-generic", "glm", 60_000)?.connectionId,
    connectionA.id,
    "an affinity pin must now be created for a non-Codex provider (previously impossible)"
  );

  // Same session, a different forcedConnectionId (as combo re-scoring would
  // produce) — the existing pin must win, exactly like the Codex-only #5903
  // behavior, but now for a generic provider.
  const request2 = await auth.getProviderCredentials("glm", null, null, "glm-4.6", {
    sessionKey: "session-generic",
    forcedConnectionId: connectionB.id,
  });
  assert.equal(
    request2?.connectionId,
    connectionA.id,
    "second request must reuse the pinned connection A, not the freshly forced B"
  );
});

test("#7274 a non-Codex provider stays unpinned when sessionAffinityTtlMs is 0 (disabled by default)", async () => {
  await settingsDb.updateSettings({ sessionAffinityTtlMs: 0 });

  const connectionA = await seedConnection("anthropic", { name: "anthropic-no-affinity-a" });
  const connectionB = await seedConnection("anthropic", { name: "anthropic-no-affinity-b" });

  const request1 = await auth.getProviderCredentials("anthropic", null, null, "claude-opus-4-8", {
    sessionKey: "session-disabled",
    forcedConnectionId: connectionA.id,
  });
  assert.equal(request1?.connectionId, connectionA.id);

  const request2 = await auth.getProviderCredentials("anthropic", null, null, "claude-opus-4-8", {
    sessionKey: "session-disabled",
    forcedConnectionId: connectionB.id,
  });
  assert.equal(
    request2?.connectionId,
    connectionB.id,
    "with the TTL at 0, every request must honor the fresh forcedConnectionId"
  );
});

// ── 2a. settings-resolution layer: legacy key fallback ──────────────────────

test("#7274 resolveSessionAffinityTtlMs falls back to the legacy codexSessionAffinityTtlMs key", () => {
  const ttl = resolveSessionAffinityTtlMs(
    "codex",
    {},
    { codexSessionAffinityTtlMs: 60_000 } // pre-migration shape: no generic key present
  );
  assert.equal(ttl, 60_000, "an operator who only ever set the old key must keep their TTL");
});

test("#7274 resolveSessionAffinityTtlMs prefers the new generic key over the legacy one", () => {
  const ttl = resolveSessionAffinityTtlMs(
    "codex",
    {},
    { sessionAffinityTtlMs: 90_000, codexSessionAffinityTtlMs: 60_000 }
  );
  assert.equal(ttl, 90_000, "the generic key must win once it has been persisted");
});

test("#7274 resolveSessionAffinityTtlMs now applies to any provider, not just codex", () => {
  const ttl = resolveSessionAffinityTtlMs("openai", {}, { sessionAffinityTtlMs: 45_000 });
  assert.equal(ttl, 45_000, "the provider !== \"codex\" early-return must be gone");
});

// ── 2b. raw-SQL migration: additive, idempotent carry-over ──────────────────

test("#7274 migration 124 carries codexSessionAffinityTtlMs over to sessionAffinityTtlMs, additively and idempotently", () => {
  const migrationSql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/124_generic_session_affinity_ttl.sql"),
    "utf8"
  );

  const db = new Database(":memory:");
  try {
    db.exec(
      `CREATE TABLE key_value (
        namespace TEXT NOT NULL,
        key TEXT NOT NULL,
        value TEXT,
        PRIMARY KEY (namespace, key)
      );`
    );
    db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('settings', 'codexSessionAffinityTtlMs', '60000')"
    ).run();

    db.exec(migrationSql);

    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'sessionAffinityTtlMs'")
      .get() as { value: string } | undefined;
    assert.equal(row?.value, "60000", "the generic key must carry the old value over");

    const oldRow = db
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'codexSessionAffinityTtlMs'"
      )
      .get() as { value: string } | undefined;
    assert.equal(oldRow?.value, "60000", "the migration is additive — the old key/row is not deleted");

    // Idempotency: re-running the migration (as the runner would on a replay)
    // must not throw and must not change the already-carried-over value.
    assert.doesNotThrow(() => db.exec(migrationSql));
    const rowAfterReplay = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'sessionAffinityTtlMs'")
      .get() as { value: string } | undefined;
    assert.equal(rowAfterReplay?.value, "60000");
  } finally {
    db.close();
  }
});

test("#7274 migration 124 is a no-op when the operator never configured the legacy key (fresh install)", () => {
  const migrationSql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/124_generic_session_affinity_ttl.sql"),
    "utf8"
  );

  const db = new Database(":memory:");
  try {
    db.exec(
      `CREATE TABLE key_value (
        namespace TEXT NOT NULL,
        key TEXT NOT NULL,
        value TEXT,
        PRIMARY KEY (namespace, key)
      );`
    );

    assert.doesNotThrow(() => db.exec(migrationSql));
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'sessionAffinityTtlMs'")
      .get();
    assert.equal(row, undefined, "no row should be created when there was nothing to carry over");
  } finally {
    db.close();
  }
});

// ── 3. header-leak guard (data-leak-adjacent — Rule from the plan's Risks) ──

test("#7274 x-codex-session-id and x-omniroute-session are never forwarded upstream by DefaultExecutor", () => {
  const executor = new DefaultExecutor("glm");
  const headers = executor.buildHeaders({ accessToken: "test-key" }, true, {
    "x-codex-session-id": "internal-correlation-id-should-not-leak",
    "x-omniroute-session": "another-internal-correlation-id",
  }) as Record<string, string>;

  const lowerKeys = Object.keys(headers).map((k) => k.toLowerCase());
  assert.ok(
    !lowerKeys.includes("x-codex-session-id"),
    "x-codex-session-id must never reach the upstream request"
  );
  assert.ok(
    !lowerKeys.includes("x-omniroute-session"),
    "x-omniroute-session must never reach the upstream request"
  );
});

test("#7274 CHARACTERIZATION: x-session-id IS forwarded upstream by DefaultExecutor (pre-existing 9router#2413 behavior, out of this issue's scope)", () => {
  const executor = new DefaultExecutor("glm");
  const headers = executor.buildHeaders({ accessToken: "test-key" }, true, {
    "x-session-id": "internal-correlation-id",
  }) as Record<string, string>;

  // This is documented, intentional agent-tracking-metadata forwarding
  // (open-sse/utils/opencodeHeaders.ts::AGENT_METADATA_HEADER_KEYS, 9router#2413)
  // that predates #7274 and is unrelated to the session-affinity TTL fix. It
  // is captured here as a verified characterization — not silently assumed
  // safe — per the plan's Risks section. Changing this forwarding behavior is
  // a separate, wider-blast-radius decision (it affects every provider on
  // DefaultExecutor) tracked as a follow-up, not fixed in this PR.
  assert.equal(
    headers["x-session-id"],
    "internal-correlation-id",
    "documents current behavior: x-session-id is forwarded, unlike the other two session headers"
  );
});
