import { test } from "node:test";
import assert from "node:assert/strict";

import { HIGH_LEVEL_ACTIONS, isHighLevelAction } from "../../src/lib/audit/highLevelActions";

const ALL = HIGH_LEVEL_ACTIONS as readonly string[];

test("high-level actions module exposes runtime allowlist helpers", async () => {
  const mod = await import("../../src/lib/audit/highLevelActions");

  assert.equal(Array.isArray(mod.HIGH_LEVEL_ACTIONS), true);
  assert.equal(typeof mod.isHighLevelAction, "function");
});

// B/G3: allowlist aligned with logAuditEvent emitters (27 after batch_updated).
test("HIGH_LEVEL_ACTIONS has exactly 27 entries", () => {
  assert.equal(ALL.length, 27);
});

test("HIGH_LEVEL_ACTIONS has no duplicates", () => {
  assert.equal(new Set(ALL).size, ALL.length);
});

test("isHighLevelAction true for every entry in allowlist", () => {
  for (const a of ALL) {
    assert.ok(isHighLevelAction(a), `Expected true for '${a}'`);
  }
});

test("isHighLevelAction false for 'random.event'", () => {
  assert.equal(isHighLevelAction("random.event"), false);
});

test("isHighLevelAction false for empty string", () => {
  assert.equal(isHighLevelAction(""), false);
});

test("isHighLevelAction false for partial 'provider'", () => {
  assert.equal(isHighLevelAction("provider"), false);
});

test("includes all 5 quota.* actions from B26", () => {
  for (const a of [
    "quota.pool.created",
    "quota.pool.updated",
    "quota.pool.deleted",
    "quota.plan.updated",
    "quota.store.driver_changed",
  ]) {
    assert.ok(ALL.includes(a), `Missing ${a}`);
  }
});

test("includes real provider credential actions", () => {
  for (const a of [
    "provider.credentials.created",
    "provider.credentials.applied",
    "provider.credentials.updated",
    "provider.credentials.revoked",
    "provider.credentials.batch_revoked",
    "provider.credentials.bulk_created",
    "provider.credentials.bulk_imported",
    "provider.credentials.imported",
    "provider.validation.ssrf_blocked",
  ]) {
    assert.ok(ALL.includes(a), `Missing ${a}`);
  }
});

test("includes real auth actions", () => {
  for (const a of [
    "auth.login.success",
    "auth.login.error",
    "auth.login.failed",
    "auth.login.locked",
    "auth.login.misconfigured",
    "auth.login.setup_required",
    "auth.logout.success",
  ]) {
    assert.ok(ALL.includes(a), `Missing ${a}`);
  }
});

test("includes sync token actions", () => {
  for (const a of ["sync.token.created", "sync.token.revoked"]) {
    assert.ok(ALL.includes(a), `Missing ${a}`);
  }
});

test("includes real settings and service actions", () => {
  for (const a of ["settings.update", "settings.update_failed", "service.reveal_api_key"]) {
    assert.ok(ALL.includes(a), `Missing ${a}`);
  }
});
