import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { NextRequest } from "next/server";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-flag-policy-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.JWT_SECRET = "flag-policy-isolated-session-secret";

const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const flagsDb = await import("../../src/lib/db/featureFlags.ts");
const flags = await import("../../src/shared/utils/featureFlags.ts");
const route = await import("../../src/app/api/settings/feature-flags/route.ts");
const { mintDashboardSessionToken } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const { getUnpricedUsageReport } = await import("../../src/lib/usage/unpricedUsage.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");

const POLICY = "UNPRICED_USAGE_BUDGET_POLICY";
const LEGACY = "USAGE_LIMIT_IGNORE_UNPRICED";
type Source = "db" | "env" | "default";
type Policy = "fail_closed" | "count_as_zero";
interface State {
  effectiveValue: Policy;
  source: Source;
  configuredSource: Source;
  sourceKey: string;
}
interface Flag extends State {
  key: string;
}
interface Update extends State {
  previousValue: Policy;
  previousSource: Source;
  previousConfiguredSource: Source;
  previousSourceKey: string;
}
let cookie: string;
let chat: Request;

function request(method = "GET", body?: { key: string; value?: string }) {
  return new NextRequest("http://localhost/api/settings/feature-flags", {
    method,
    headers: { Cookie: cookie, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

function state(
  effectiveValue: Policy,
  source: Source,
  configuredSource: Source,
  sourceKey: string
): State {
  return { effectiveValue, source, configuredSource, sourceKey };
}

async function assertRuntime(expected: Policy) {
  assert.equal(flags.getUnpricedUsageBudgetPolicy(), expected);
  assert.equal((await getUnpricedUsageReport()).policy, expected);
  const rejection = (await enforceApiKeyPolicy(chat, "openai/gpt-4o")).rejection;
  assert.equal(rejection?.status ?? null, expected === "fail_closed" ? 400 : null);
}

async function assertGet(expected: State, dbCount?: number, envCount?: number) {
  const response = await route.GET(request());
  assert.equal(response.status, 200);
  const payload = (await response.json()) as {
    flags: Flag[];
    summary: { overriddenByDb: number; overriddenByEnv: number };
  };
  const flag = payload.flags.find((f) => f.key === POLICY);
  assert.ok(flag);
  assert.equal(flag.effectiveValue, expected.effectiveValue);
  assert.equal(flag.source, expected.source);
  assert.equal(flag.configuredSource, expected.configuredSource);
  assert.equal(flag.sourceKey, expected.sourceKey);
  const resolved = flags.resolveAllFeatureFlags().find((f) => f.key === POLICY);
  assert.equal(resolved?.effectiveValue, expected.effectiveValue);
  if (dbCount !== undefined) assert.equal(payload.summary.overriddenByDb, dbCount);
  if (envCount !== undefined) assert.equal(payload.summary.overriddenByEnv, envCount);
  await assertRuntime(expected.effectiveValue);
}

async function putPolicy(value?: string) {
  const response = await route.PUT(
    request("PUT", { key: POLICY, ...(value === undefined ? {} : { value }) })
  );
  assert.equal(response.status, 200);
  return (await response.json()) as Update;
}

async function assertUpdate(result: Update, before: State, after: State) {
  assert.equal(result.previousValue, before.effectiveValue);
  assert.equal(result.previousSource, before.source);
  assert.equal(result.previousConfiguredSource, before.configuredSource);
  assert.equal(result.previousSourceKey, before.sourceKey);
  assert.equal(result.effectiveValue, after.effectiveValue);
  assert.equal(result.source, after.source);
  assert.equal(result.configuredSource, after.configuredSource);
  assert.equal(result.sourceKey, after.sourceKey);
  await assertGet(after);
}

test.beforeEach(async () => {
  delete process.env[POLICY];
  delete process.env[LEGACY];
  flagsDb.clearAllFeatureFlagOverrides();
  core.getDbInstance().exec("DELETE FROM usage_history");
  cookie = `auth_token=${await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET))}`;
  const key = await keys.createApiKey("flag-policy-test", "flag-policy-fixture");
  await keys.updateApiKeyPermissions(key.id, { usageLimitEnabled: true, weeklyUsageLimitUsd: 100 });
  keys.clearApiKeyCaches();
  await saveRequestUsage({
    provider: "flag-policy-fixture",
    model: "unpriced",
    apiKeyId: key.id,
    tokens: { input: 100 },
    success: true,
    timestamp: new Date().toISOString(),
  });
  chat = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key.key}` },
  });
});

test.after(() => {
  delete process.env[POLICY];
  delete process.env[LEGACY];
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const source of ["db", "env"] as const) {
  for (const value of ["true", "1", "yes", "false", "TRUE", "", "invalid"]) {
    test(`GET and enforcement agree when boolean ${source}=${JSON.stringify(value)} is inherited`, async () => {
      if (source === "db") flagsDb.setFeatureFlagOverride(LEGACY, value);
      else process.env[LEGACY] = value;
      const actualSource = source === "env" && value === "" ? "default" : source;
      const policy = ["true", "1", "yes"].includes(value) ? "count_as_zero" : "fail_closed";
      await assertGet(
        state(policy, actualSource, "default", LEGACY),
        source === "db" ? 1 : 0,
        actualSource === "env" ? 1 : 0
      );
      assert.equal(
        flagsDb.getFeatureFlagOverride(POLICY),
        undefined,
        "reading an inherited policy must never persist an enum"
      );
    });
  }
}

test("enum PUT previous/effective provenance and reset follow the real boolean policy", async () => {
  flagsDb.setFeatureFlagOverride(LEGACY, "true");
  const inherited = state("count_as_zero", "db", "default", LEGACY);
  const explicit = state("fail_closed", "db", "db", POLICY);
  await assertGet(inherited, 1, 0);
  await assertUpdate(await putPolicy("fail_closed"), inherited, explicit);
  await assertGet(explicit, 2, 0);
  await assertUpdate(await putPolicy(), explicit, inherited);
  assert.equal(flagsDb.getFeatureFlagOverride(POLICY), undefined);
  assert.equal(
    flagsDb.getFeatureFlagOverride(LEGACY),
    "true",
    "enum reset must not delete its inherited boolean"
  );
  await assertGet(inherited, 1, 0);
});

test("enum DB wins over enum env, and removal restores enum env before boolean", async () => {
  process.env[LEGACY] = "yes";
  process.env[POLICY] = "fail_closed";
  const env = state("fail_closed", "env", "env", POLICY);
  const db = state("count_as_zero", "db", "db", POLICY);
  await assertGet(env, 0, 2);
  await assertUpdate(await putPolicy("count_as_zero"), env, db);
  await assertUpdate(await putPolicy(), db, env);
  delete process.env[POLICY];
  await assertGet(state("count_as_zero", "env", "default", LEGACY), 0, 1);
});

test("boolean PUT and reset immediately change inherited policy but not an explicit enum", async () => {
  process.env[LEGACY] = "true";
  let response = await route.PUT(request("PUT", { key: LEGACY, value: "false" }));
  assert.equal(response.status, 200);
  await assertGet(state("fail_closed", "db", "default", LEGACY), 1, 0);
  response = await route.PUT(request("PUT", { key: LEGACY }));
  assert.equal(response.status, 200);
  await assertGet(state("count_as_zero", "env", "default", LEGACY), 0, 1);
  await putPolicy("fail_closed");
  response = await route.PUT(request("PUT", { key: LEGACY, value: "yes" }));
  assert.equal(response.status, 200);
  await assertGet(state("fail_closed", "db", "db", POLICY), 2, 0);
});

for (const value of ["invalid", "", " count_as_zero "]) {
  test(`raw DB enum ${JSON.stringify(value)} stays explicit and fail-closed`, async () => {
    flagsDb.setFeatureFlagOverride(LEGACY, "true");
    process.env[POLICY] = "count_as_zero";
    // Bypass the public writer only to reproduce an existing malformed stored row.
    core
      .getDbInstance()
      .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("feature_flags", POLICY, value);
    flagsDb.clearFeatureFlagOverrideCache(POLICY);
    const invalid = state("fail_closed", "db", "db", POLICY);
    await assertGet(invalid, 2, 0);
    await assertUpdate(await putPolicy(), invalid, state("count_as_zero", "env", "env", POLICY));
  });
}

test("invalid enum env stays explicit; empty enum env is absent", async () => {
  flagsDb.setFeatureFlagOverride(LEGACY, "true");
  for (const value of ["invalid", "COUNT_AS_ZERO", " "]) {
    process.env[POLICY] = value;
    await assertGet(state("fail_closed", "env", "env", POLICY), 1, 1);
  }
  process.env[POLICY] = "";
  await assertGet(state("count_as_zero", "db", "default", LEGACY), 1, 0);
});

test("invalid enum PUT is rejected without changing either flag", async () => {
  flagsDb.setFeatureFlagOverride(LEGACY, "true");
  const response = await route.PUT(request("PUT", { key: POLICY, value: "invalid" }));
  assert.equal(response.status, 400);
  assert.equal(flagsDb.getFeatureFlagOverride(POLICY), undefined);
  await assertGet(state("count_as_zero", "db", "default", LEGACY));
});

test("unreadable flag store never advertises success or relaxes enforcement via env", async () => {
  process.env[POLICY] = "count_as_zero";
  process.env[LEGACY] = "true";
  const db = core.getDbInstance();
  db.exec("ALTER TABLE key_value RENAME TO key_value_offline");
  flagsDb.clearFeatureFlagOverrideCache();
  try {
    const get = await route.GET(request());
    assert.equal(get.status, 500);
    assert.doesNotMatch(JSON.stringify(await get.json()), /at \/|\.ts:\d/);
    assert.equal((await route.PUT(request("PUT", { key: POLICY }))).status, 500);
    assert.equal(flags.getUnpricedUsageBudgetPolicy(), "fail_closed");
    const rejection = (await enforceApiKeyPolicy(chat, "openai/gpt-4o")).rejection;
    assert.ok(rejection, "unreadable settings must never allow the request");
    assert.ok([400, 503].includes(rejection.status));
  } finally {
    db.exec("ALTER TABLE key_value_offline RENAME TO key_value");
    flagsDb.clearFeatureFlagOverrideCache();
  }
});
