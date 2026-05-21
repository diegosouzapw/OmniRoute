/**
 * T-012 — Settings PATCH audit log.
 *
 * Covers spec AC-9 / AC-10 / AC-11 (plus idempotent no-op case):
 *   - AC-9  success diff row carries `action=settings.update`, target,
 *           actor, ip, and per-key {before, after} diff for every changed key.
 *   - AC-10 each rejection path (PASSWORD_REQUIRED, PASSWORD_MISMATCH,
 *           BYPASS_PREFIX_NOT_ALLOWED, zod validation failure) writes a
 *           `settings.update_failed` row with the matching `reason` code and
 *           NEVER persists settings.
 *   - AC-11 every changed key shows up in the success diff — not only
 *           security-impacting keys.
 *   - Idempotent PATCH (body matches stored state) writes NO row.
 *
 * Runs through the real PATCH handler + `setupSettingsFixture` mock so the
 * production `updateSettings → applyRuntimeSettings → logAuditEvent` pipeline
 * fires exactly as it does in deployment.
 *
 * INSUFFICIENT_SCOPE is intentionally NOT exercised here — per spec AC-13 it
 * is rejected by `requireManagementAuth` before the audit-aware handler body
 * runs, so no row is written.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { setupSettingsFixture } from "../_mocks/settings.ts";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// Allocate fixture FIRST so DATA_DIR is set before any DB import resolves.
const fixture = setupSettingsFixture("settings-audit");
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
const settingsRoute = await import("../../../src/app/api/settings/route.ts");
const compliance = await import("../../../src/lib/compliance/index.ts");
const managementPassword = await import("../../../src/lib/auth/managementPassword.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");

test.beforeEach(async () => {
  await fixture.resetStorage();
  apiKeysDb.resetApiKeyState();
  runtime.resetRuntimeSettingsStateForTests();
});

test.after(() => {
  core.resetDbInstance();
  fixture.cleanup();
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

async function bootstrapWithPassword(password: string): Promise<void> {
  process.env.JWT_SECRET = "test-jwt-secret-settings-audit";
  process.env.INITIAL_PASSWORD = password;
  await settingsDb.updateSettings({ requireLogin: true });
  await managementPassword.ensurePersistentManagementPasswordHash({
    source: "test.bootstrap",
  });
}

function settingsRows() {
  // `getAuditLog`'s `AuditLogEntry[]` return type now exposes `action`,
  // `actor`, `target`, `status`, `details`, etc. directly — no local cast
  // needed. See src/lib/compliance/index.ts.
  return compliance.getAuditLog({ target: "settings", limit: 50 });
}

// ─── AC-9 — success diff row written ──────────────────────────────────────

test("AC-9: successful PATCH writes settings.update with diff of changed keys", async () => {
  await bootstrapWithPassword("initial-pass-ac9");
  const before = await settingsDb.getSettings();
  assert.equal(before.localOnlyManageScopeBypassEnabled, true);

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassEnabled: false,
        currentPassword: "initial-pass-ac9",
      },
    })
  );

  assert.equal(response.status, 200);

  const rows = settingsRows();
  const successRows = rows.filter((r) => r.action === "settings.update");
  assert.equal(successRows.length, 1, `expected 1 success row, got: ${JSON.stringify(rows)}`);
  const row = successRows[0];
  assert.equal(row.target, "settings");
  assert.equal(row.status, "success");
  assert.equal(row.resource_type, "settings");
  // Cookie session ⇒ actor=dashboard.
  assert.equal(row.actor, "dashboard");
  const details = row.details as { diff: Record<string, { before: unknown; after: unknown }> };
  assert.ok(details && typeof details === "object", "details must be parsed JSON");
  assert.ok(details.diff, "diff present");
  assert.deepEqual(details.diff.localOnlyManageScopeBypassEnabled, {
    before: true,
    after: false,
  });
});

// ─── AC-10 — failure rows for each rejection path ────────────────────────

test("AC-10a: PASSWORD_REQUIRED failure writes settings.update_failed", async () => {
  await bootstrapWithPassword("initial-pass-ac10a");

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { localOnlyManageScopeBypassEnabled: false },
    })
  );

  assert.equal(response.status, 400);
  const rows = settingsRows().filter((r) => r.action === "settings.update_failed");
  assert.equal(rows.length, 1);
  const details = rows[0].details as { reason: string; attempted_keys: string[] };
  assert.equal(details.reason, "PASSWORD_REQUIRED");
  assert.ok(details.attempted_keys.includes("localOnlyManageScopeBypassEnabled"));
  // No raw payload values — only the key NAMES are recorded under
  // `attempted_keys`. There must be no `before`/`after` or `diff` block on a
  // failure row, and no other fields beyond reason+attempted_keys in details.
  assert.deepEqual(
    Object.keys(details).sort(),
    ["attempted_keys", "reason"],
    "failure details must only contain reason + attempted_keys (no payload echo)"
  );

  // Persisted state unchanged.
  const after = await settingsDb.getSettings();
  assert.equal(after.localOnlyManageScopeBypassEnabled, true);
});

test("AC-10b: PASSWORD_MISMATCH failure writes settings.update_failed", async () => {
  await bootstrapWithPassword("initial-pass-ac10b");

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassEnabled: false,
        currentPassword: "definitely-wrong",
      },
    })
  );

  assert.equal(response.status, 401);
  const rows = settingsRows().filter((r) => r.action === "settings.update_failed");
  assert.equal(rows.length, 1);
  const details = rows[0].details as { reason: string; attempted_keys: string[] };
  assert.equal(details.reason, "PASSWORD_MISMATCH");
  // Password attempt MUST NOT leak — only key names.
  const serialized = JSON.stringify(rows[0]);
  assert.equal(
    serialized.includes("definitely-wrong"),
    false,
    "rejected currentPassword must not appear in audit row"
  );

  const after = await settingsDb.getSettings();
  assert.equal(after.localOnlyManageScopeBypassEnabled, true);
});

test("AC-10c: BYPASS_PREFIX_NOT_ALLOWED failure writes settings.update_failed", async () => {
  await bootstrapWithPassword("initial-pass-ac10c");

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/cli-tools/runtime/"],
        currentPassword: "initial-pass-ac10c",
      },
    })
  );

  assert.equal(response.status, 400);
  const rows = settingsRows().filter((r) => r.action === "settings.update_failed");
  assert.equal(rows.length, 1);
  const details = rows[0].details as { reason: string };
  assert.equal(details.reason, "BYPASS_PREFIX_NOT_ALLOWED");

  // Snapshot untouched.
  const after = await settingsDb.getSettings();
  assert.deepEqual(after.localOnlyManageScopeBypassPrefixes, ["/api/mcp/"]);
});

test("AC-10d: zod validation failure (wrong type) writes settings.update_failed", async () => {
  await bootstrapWithPassword("initial-pass-ac10d");

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassEnabled: "definitely-not-a-boolean",
        currentPassword: "initial-pass-ac10d",
      },
    })
  );

  assert.equal(response.status, 400);
  const rows = settingsRows().filter((r) => r.action === "settings.update_failed");
  assert.equal(rows.length, 1);
  const details = rows[0].details as { reason: string };
  assert.equal(details.reason, "VALIDATION_FAILED");
});

// AC-13 sanity: INSUFFICIENT_SCOPE rejection happens upstream in
// requireManagementAuth and never reaches the handler body, so no audit row.
// We cover it implicitly by NOT having an INSUFFICIENT_SCOPE failure test —
// the route-level rejection is already covered by api-auth.test.ts.

// ─── AC-11 — diff covers every changed key (not only security keys) ──────

test("AC-11: diff records every changed key, including non-security keys", async () => {
  await bootstrapWithPassword("initial-pass-ac11");

  // Seed an initial value for a non-security key so the diff is meaningful.
  await settingsDb.updateSettings({ theme: "light", instanceName: "before" });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        theme: "dark",
        instanceName: "after",
        localOnlyManageScopeBypassEnabled: false,
        currentPassword: "initial-pass-ac11",
      },
    })
  );

  assert.equal(response.status, 200);
  const rows = settingsRows().filter((r) => r.action === "settings.update");
  assert.equal(rows.length, 1);
  const details = rows[0].details as { diff: Record<string, { before: unknown; after: unknown }> };
  // Security key AND multiple non-security keys must all be in diff.
  assert.ok(details.diff.localOnlyManageScopeBypassEnabled, "security key in diff");
  assert.ok(details.diff.theme, "theme (non-security) in diff");
  assert.ok(details.diff.instanceName, "instanceName (non-security) in diff");
  assert.deepEqual(details.diff.theme, { before: "light", after: "dark" });
  assert.deepEqual(details.diff.instanceName, { before: "before", after: "after" });
});

// ─── Idempotent no-op writes NO row ──────────────────────────────────────

test("idempotent PATCH (body matches current state) writes NO audit row", async () => {
  await bootstrapWithPassword("initial-pass-noop");

  // Settings already at default — patch the same value back.
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassEnabled: true, // same as default
        currentPassword: "initial-pass-noop",
      },
    })
  );

  assert.equal(response.status, 200);
  const rows = settingsRows();
  assert.equal(
    rows.length,
    0,
    `idempotent PATCH must not emit an audit row, got: ${JSON.stringify(rows)}`
  );
});

// ─── Multi-row sanity: success + failure sequence ─────────────────────────

test("sequence: failure then success produces exactly 1 failure row + 1 success row", async () => {
  await bootstrapWithPassword("initial-pass-seq");

  // 1) failure
  await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { localOnlyManageScopeBypassEnabled: false, currentPassword: "wrong" },
    })
  );
  // 2) success
  await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassEnabled: false,
        currentPassword: "initial-pass-seq",
      },
    })
  );

  const rows = settingsRows();
  const failures = rows.filter((r) => r.action === "settings.update_failed");
  const successes = rows.filter((r) => r.action === "settings.update");
  assert.equal(failures.length, 1);
  assert.equal(successes.length, 1);
});
