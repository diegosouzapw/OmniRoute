import { test } from "node:test";
import assert from "node:assert/strict";

import { ACTIVITY_ICONS, getActivityIcon } from "../../src/lib/audit/activityIcons";
import { HIGH_LEVEL_ACTIONS } from "../../src/lib/audit/highLevelActions";

// B/G3: updated to reflect real action names aligned with logAuditEvent emitters.
test("getActivityIcon('provider.credentials.created') returns correct spec", () => {
  assert.deepEqual(getActivityIcon("provider.credentials.created"), {
    icon: "extension",
    i18nKeyVerb: "providerCredentialsCreated",
  });
});

test("getActivityIcon('auth.login.success') returns correct spec", () => {
  assert.deepEqual(getActivityIcon("auth.login.success"), {
    icon: "login",
    i18nKeyVerb: "authLoginSuccess",
  });
});

test("getActivityIcon('quota.pool.created') returns correct spec", () => {
  assert.deepEqual(getActivityIcon("quota.pool.created"), {
    icon: "pie_chart",
    i18nKeyVerb: "quotaPoolCreated",
  });
});

test("getActivityIcon returns fallback for unknown action", () => {
  assert.deepEqual(getActivityIcon("some.unknown"), {
    icon: "info",
    i18nKeyVerb: "genericEvent",
  });
});

test("getActivityIcon returns fallback for empty string", () => {
  assert.deepEqual(getActivityIcon(""), { icon: "info", i18nKeyVerb: "genericEvent" });
});

test("ACTIVITY_ICONS has entry for every HIGH_LEVEL_ACTION (1:1 coverage)", () => {
  for (const a of HIGH_LEVEL_ACTIONS as readonly string[]) {
    assert.ok(a in ACTIVITY_ICONS, `ACTIVITY_ICONS missing entry for '${a}'`);
  }
});

test("every ACTIVITY_ICONS entry has non-empty icon and i18nKeyVerb", () => {
  for (const [action, spec] of Object.entries(ACTIVITY_ICONS)) {
    assert.ok(spec.icon.length > 0, `${action}.icon empty`);
    assert.ok(spec.i18nKeyVerb.length > 0, `${action}.i18nKeyVerb empty`);
  }
});

test("ACTIVITY_ICONS count equals HIGH_LEVEL_ACTIONS count", () => {
  assert.equal(Object.keys(ACTIVITY_ICONS).length, (HIGH_LEVEL_ACTIONS as readonly string[]).length);
});
