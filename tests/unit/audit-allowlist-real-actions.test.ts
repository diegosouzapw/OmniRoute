/**
 * audit-allowlist-real-actions.test.ts
 *
 * B/G3 gap-closure: Verifies that HIGH_LEVEL_ACTIONS contains the REAL action strings
 * emitted by `logAuditEvent()` calls found in the repository (verified via grep).
 *
 * If this test breaks, it means either:
 *   1. A new logAuditEvent emitter was added but not reflected in the allowlist, OR
 *   2. An emitter was renamed without updating the allowlist.
 * In both cases: update highLevelActions.ts AND activityIcons.ts atomically.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { HIGH_LEVEL_ACTIONS, isHighLevelAction } from "../../src/lib/audit/highLevelActions";
import { ACTIVITY_ICONS, getActivityIcon } from "../../src/lib/audit/activityIcons";

/** All 27 real actions discovered via grep logAuditEvent in the repo (B/G3, 2026-05). */
const REAL_REPO_ACTIONS = [
  "auth.login.success",
  "auth.login.error",
  "auth.login.failed",
  "auth.login.locked",
  "auth.login.misconfigured",
  "auth.login.setup_required",
  "auth.logout.success",
  "provider.credentials.applied",
  "provider.credentials.batch_revoked",
  "provider.credentials.batch_updated",
  "provider.credentials.bulk_created",
  "provider.credentials.bulk_imported",
  "provider.credentials.created",
  "provider.credentials.imported",
  "provider.credentials.revoked",
  "provider.credentials.updated",
  "provider.validation.ssrf_blocked",
  "quota.plan.updated",
  "quota.pool.created",
  "quota.pool.deleted",
  "quota.pool.updated",
  "quota.store.driver_changed",
  "service.reveal_api_key",
  "settings.update",
  "settings.update_failed",
  "sync.token.created",
  "sync.token.revoked",
] as const;

test("every HIGH_LEVEL_ACTION has a corresponding ACTIVITY_ICONS entry (1:1 coverage)", () => {
  for (const action of HIGH_LEVEL_ACTIONS as readonly string[]) {
    assert.ok(action in ACTIVITY_ICONS, `ACTIVITY_ICONS missing entry for '${action}'`);
  }
});

test("ACTIVITY_ICONS has no extra entries beyond HIGH_LEVEL_ACTIONS (strict 1:1)", () => {
  const allowlistSet = new Set<string>(HIGH_LEVEL_ACTIONS);
  for (const key of Object.keys(ACTIVITY_ICONS)) {
    assert.ok(allowlistSet.has(key), `ACTIVITY_ICONS has extra key not in allowlist: '${key}'`);
  }
});

test("all 27 real repo actions are present in HIGH_LEVEL_ACTIONS", () => {
  const allowlistSet = new Set<string>(HIGH_LEVEL_ACTIONS);
  for (const action of REAL_REPO_ACTIONS) {
    assert.ok(allowlistSet.has(action), `HIGH_LEVEL_ACTIONS missing real repo action: '${action}'`);
  }
});

test("HIGH_LEVEL_ACTIONS contains exactly the same 27 real repo actions (no extras, no missing)", () => {
  assert.equal(
    (HIGH_LEVEL_ACTIONS as readonly string[]).length,
    REAL_REPO_ACTIONS.length,
    `Expected ${REAL_REPO_ACTIONS.length} actions, got ${(HIGH_LEVEL_ACTIONS as readonly string[]).length}`
  );
});

test("isHighLevelAction('provider.credentials.created') === true", () => {
  assert.equal(isHighLevelAction("provider.credentials.created"), true);
});

// Regression for #3271 follow-up: the bulk activate/deactivate endpoint emits
// provider.credentials.batch_updated, so it must appear in the Activity feed
// allowlist and have a non-fallback icon (emitter + registries kept atomic).
test("provider.credentials.batch_updated is a registered high-level action", () => {
  assert.equal(isHighLevelAction("provider.credentials.batch_updated"), true);
  const spec = getActivityIcon("provider.credentials.batch_updated");
  assert.notDeepEqual(spec, { icon: "info", i18nKeyVerb: "genericEvent" });
  assert.equal(spec.i18nKeyVerb, "providerCredentialsBatchUpdated");
});

test("isHighLevelAction('nonexistent.action') === false", () => {
  assert.equal(isHighLevelAction("nonexistent.action"), false);
});

test("isHighLevelAction('auth.login') === false (old naming no longer in allowlist)", () => {
  assert.equal(isHighLevelAction("auth.login"), false);
});

test("getActivityIcon('auth.login.success') returns specific spec, not fallback", () => {
  const spec = getActivityIcon("auth.login.success");
  assert.notDeepEqual(spec, { icon: "info", i18nKeyVerb: "genericEvent" });
  assert.equal(spec.icon, "login");
  assert.equal(spec.i18nKeyVerb, "authLoginSuccess");
});

test("getActivityIcon('provider.credentials.created') returns specific spec, not fallback", () => {
  const spec = getActivityIcon("provider.credentials.created");
  assert.notDeepEqual(spec, { icon: "info", i18nKeyVerb: "genericEvent" });
  assert.equal(spec.icon, "extension");
  assert.equal(spec.i18nKeyVerb, "providerCredentialsCreated");
});

test("getActivityIcon('settings.update') returns specific spec, not fallback", () => {
  const spec = getActivityIcon("settings.update");
  assert.notDeepEqual(spec, { icon: "info", i18nKeyVerb: "genericEvent" });
  assert.equal(spec.icon, "settings");
  assert.equal(spec.i18nKeyVerb, "settingsUpdate");
});

test("every ACTIVITY_ICONS spec has non-empty icon and i18nKeyVerb", () => {
  for (const [action, spec] of Object.entries(ACTIVITY_ICONS)) {
    assert.ok(spec.icon.length > 0, `${action}.icon is empty`);
    assert.ok(spec.i18nKeyVerb.length > 0, `${action}.i18nKeyVerb is empty`);
  }
});
