/**
 * T-011 — DB-stored authz bypass policy + hot-reload.
 *
 * Covers spec AC-3 through AC-8:
 *   - AC-3 kill-switch flip → bypass disabled → /api/mcp/ from non-loopback → 403
 *   - AC-4 PATCH missing currentPassword → 400 PASSWORD_REQUIRED
 *   - AC-5 wrong currentPassword → 401 PASSWORD_MISMATCH
 *   - AC-6 toggle list reflects DB after PATCH
 *   - AC-7 add a new prefix → persists + applyRuntimeSettings fires + snapshot reflects
 *   - AC-8 add /api/cli-tools/runtime/ → 400 BYPASS_PREFIX_NOT_ALLOWED, snapshot unchanged
 *
 * Goes through the production `updateSettings → applyRuntimeSettings` and
 * the real PATCH route handler — no direct `getAuthzBypassSnapshot` mocks.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { setupSettingsFixture, mockSettings } from "../_mocks/settings.ts";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// Allocate fixture FIRST so DATA_DIR is set before any DB import resolves.
const fixture = setupSettingsFixture("authz-bypass");
// API-key auth check uses a Redis-backed cache otherwise — disable so
// isValidApiKey() does not stall on ETIMEDOUT in the local test loop.
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
const routeGuard = await import("../../../src/server/authz/routeGuard.ts");
const settingsRoute = await import("../../../src/app/api/settings/route.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");

test.beforeEach(async () => {
  await fixture.resetStorage();
  apiKeysDb.resetApiKeyState();
  // Force the route guard to start each test from cold-boot default
  // (enabled=true, prefixes=["/api/mcp/"]).
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

function nonLoopbackCtx(headers: Headers, path = "/api/mcp/stream") {
  return {
    request: {
      method: "GET",
      headers,
      url: `https://dashboard.example${path}`,
      nextUrl: { pathname: path },
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      normalizedPath: path,
      reason: "management_api" as const,
    },
    requestId: "req_authz_bypass_test",
  };
}

// ─── AC-3 — kill-switch flips bypass off → request 403 ───────────────────

test("AC-3: kill-switch off → /api/mcp/* with manage-scope Bearer from non-loopback → 403 LOCAL_ONLY", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-bypass";
  process.env.INITIAL_PASSWORD = "initial-pass";
  // Seed DB with default snapshot first (kill-switch ON) and confirm the
  // bypass works.
  await mockSettings({ requireLogin: true });
  const managePolicy = await import("../../../src/server/authz/policies/management.ts");
  const created = await apiKeysDb.createApiKey("ac3-mgmt", "machine-ac3", ["manage"]);

  const headers = new Headers({ authorization: `Bearer ${created.key}` });

  // Sanity: bypass ENABLED → 200/allow.
  const before = await managePolicy.managementPolicy.evaluate(nonLoopbackCtx(headers));
  assert.equal(before.allow, true, "default kill-switch ON should allow manage-scope bypass");

  // Flip the kill-switch off via the production pipeline.
  await mockSettings({ localOnlyManageScopeBypassEnabled: false });
  assert.equal(routeGuard.isLocalOnlyBypassableByManageScope("/api/mcp/stream"), false);

  // After the hot-reload, the policy must reject.
  const after = await managePolicy.managementPolicy.evaluate(nonLoopbackCtx(headers));
  assert.equal(after.allow, false);
  if (!after.allow) {
    assert.equal(after.status, 403);
    assert.equal(after.code, "LOCAL_ONLY");
  }
});

// ─── AC-4 — missing currentPassword → 400 PASSWORD_REQUIRED ──────────────

test("AC-4: PATCH missing currentPassword for security-impacting key → 400 PASSWORD_REQUIRED", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-bypass";
  process.env.INITIAL_PASSWORD = "initial-pass-ac4";
  // Bootstrap a password so the cold-boot exception does NOT fire.
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { localOnlyManageScopeBypassEnabled: false },
    })
  );

  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: { code: string; keys: string[] } };
  assert.equal(body.error.code, "PASSWORD_REQUIRED");
  assert.ok(body.error.keys.includes("localOnlyManageScopeBypassEnabled"));

  // Persisted state unchanged — kill-switch still on by default.
  const settings = await settingsDb.getSettings();
  assert.equal(settings.localOnlyManageScopeBypassEnabled, true);
});

// ─── AC-5 — wrong currentPassword → 401 PASSWORD_MISMATCH ────────────────

test("AC-5: PATCH wrong currentPassword for security-impacting key → 401 PASSWORD_MISMATCH", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-bypass";
  process.env.INITIAL_PASSWORD = "initial-pass-ac5";
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });

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
  const body = (await response.json()) as { error: { code: string } };
  assert.equal(body.error.code, "PASSWORD_MISMATCH");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.localOnlyManageScopeBypassEnabled, true);
});

// ─── AC-6 — bypass list reflects DB after PATCH ──────────────────────────

test("AC-6: PATCH with correct currentPassword + new prefix list → persists to DB", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-bypass";
  process.env.INITIAL_PASSWORD = "initial-pass-ac6";
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassPrefixes: ["/api/mcp/"],
        currentPassword: "initial-pass-ac6",
      },
    })
  );

  assert.equal(response.status, 200);
  const settings = await settingsDb.getSettings();
  assert.deepEqual(settings.localOnlyManageScopeBypassPrefixes, ["/api/mcp/"]);
});

// ─── AC-7 — add prefix → applyRuntimeSettings fires + snapshot reflects ──

test("AC-7: PATCH adds prefix → applyRuntimeSettings fires + getAuthzBypassSnapshot reflects (hot-reload <50ms)", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-bypass";
  process.env.INITIAL_PASSWORD = "initial-pass-ac7";
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });
  // Prime the snapshot from the persisted defaults so we measure a real diff.
  const seeded = await settingsDb.getSettings();
  await runtime.applyRuntimeSettings(seeded);

  const before = routeGuard.LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES;
  assert.deepEqual([...before], ["/api/mcp/"]);

  // Measure the snapshot-read latency (spec SLA: <50 ms).
  const t0 = process.hrtime.bigint();
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/mcp/v2/"],
        currentPassword: "initial-pass-ac7",
      },
    })
  );
  const snapshotAfterPatch = runtime.getAuthzBypassSnapshot();
  const elapsedNs = process.hrtime.bigint() - t0;

  assert.equal(response.status, 200);
  assert.deepEqual(snapshotAfterPatch.prefixes, ["/api/mcp/", "/api/mcp/v2/"]);
  assert.equal(snapshotAfterPatch.enabled, true);
  // The hot-path accessor itself is O(1) — total PATCH→snapshot covers
  // bcrypt + SQLite write, so we only assert the in-memory accessor is fast.
  // Microbench: dedicated snapshot read.
  const tSnap0 = process.hrtime.bigint();
  for (let i = 0; i < 10_000; i++) runtime.getAuthzBypassSnapshot();
  const snapElapsedNs = process.hrtime.bigint() - tSnap0;
  assert.ok(
    snapElapsedNs < 50_000_000n,
    `getAuthzBypassSnapshot x10k must complete in <50 ms (got ${Number(snapElapsedNs) / 1e6} ms)`
  );
  // Whole PATCH < 5 s sanity bound (bcrypt-bounded).
  assert.ok(elapsedNs < 5_000_000_000n);

  // Live route-guard predicate reflects the new prefix.
  assert.equal(routeGuard.isLocalOnlyBypassableByManageScope("/api/mcp/v2/foo"), true);
});

// ─── AC-8 — spawn-capable prefix → 400 BYPASS_PREFIX_NOT_ALLOWED ─────────

test("AC-8: PATCH with /api/cli-tools/runtime/ in bypass list → 400 BYPASS_PREFIX_NOT_ALLOWED + snapshot unchanged", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-bypass";
  process.env.INITIAL_PASSWORD = "initial-pass-ac8";
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });
  // Prime snapshot from default DB state.
  const seeded = await settingsDb.getSettings();
  await runtime.applyRuntimeSettings(seeded);
  const snapshotBefore = runtime.getAuthzBypassSnapshot();

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/cli-tools/runtime/"],
        currentPassword: "initial-pass-ac8",
      },
    })
  );

  assert.equal(response.status, 400);
  const body = (await response.json()) as {
    error: { details?: Array<{ field: string; message: string }> };
  };
  // zod path is the array path; the message embeds the BYPASS_PREFIX_NOT_ALLOWED code.
  const offending = body.error.details?.find((d) =>
    d.message.includes("BYPASS_PREFIX_NOT_ALLOWED")
  );
  assert.ok(offending, `expected BYPASS_PREFIX_NOT_ALLOWED in details: ${JSON.stringify(body)}`);

  // Persisted state untouched.
  const settings = await settingsDb.getSettings();
  assert.deepEqual(settings.localOnlyManageScopeBypassPrefixes, ["/api/mcp/"]);
  // Runtime snapshot untouched.
  const snapshotAfter = runtime.getAuthzBypassSnapshot();
  assert.deepEqual(snapshotAfter.prefixes, snapshotBefore.prefixes);
  assert.equal(snapshotAfter.enabled, snapshotBefore.enabled);
});

// ─── Defence-in-depth: snapshot mutation alone cannot grant spawn bypass ─

test("Defence-in-depth: even if a malformed snapshot lists /api/cli-tools/runtime/, the runtime predicate rejects it", async () => {
  // applyRuntimeSettings wires the snapshot through normalizeAuthzBypass,
  // which does not filter spawn-capable entries (zod is the gate). The
  // routeGuard predicate must still refuse them at runtime.
  await runtime.applyRuntimeSettings({
    localOnlyManageScopeBypassEnabled: true,
    localOnlyManageScopeBypassPrefixes: ["/api/cli-tools/runtime/"],
  });

  assert.equal(routeGuard.isLocalOnlyBypassableByManageScope("/api/cli-tools/runtime/foo"), false);
});
