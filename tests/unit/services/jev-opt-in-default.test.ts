/**
 * #15641 review: the decision layer is opt-in. A TypeSafe credential on its own
 * (TYPESAFE_API_KEY, OMNIROUTE_JEV_API_KEY or a dashboard `typesafe` connection) must
 * NOT engage any lane or send request content to the classifier — only an explicit
 * OMNIROUTE_JEV_ENABLED=on does (same spirit as Hard Rule #20 for payload mutation).
 */
import test from "node:test";
import assert from "node:assert/strict";

const JEV_ENV_KEYS = [
  "OMNIROUTE_JEV_ENABLED",
  "OMNIROUTE_JEV_API_KEY",
  "OMNIROUTE_JEV_BASE_URL",
  "OMNIROUTE_JEV_WIRE",
  "OMNIROUTE_JEV_PROVIDER",
  "OMNIROUTE_JEV_MODEL",
  "OMNIROUTE_JEV_TIMEOUT_MS",
  "OMNIROUTE_JEV_FEATURES",
  "TYPESAFE_API_KEY",
  "TYPESAFE_BASE_URL",
];
const savedEnv = new Map(JEV_ENV_KEYS.map((key) => [key, process.env[key]]));

const {
  JEV_FEATURES,
  isJevFeatureEnabled,
  resolveJevRuntime,
  __resetJevRuntimeCacheForTests,
  __resetJevClientForTests,
  decideRoute,
} = await import("../../../open-sse/services/jev/index.ts");

const originalFetch = globalThis.fetch;
let fetchCalls = 0;

test.beforeEach(() => {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
  __resetJevRuntimeCacheForTests();
  __resetJevClientForTests();
  fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls++;
    return Response.json({});
  }) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  __resetJevRuntimeCacheForTests();
});

for (const [label, apply] of [
  ["TYPESAFE_API_KEY", () => (process.env.TYPESAFE_API_KEY = "sk-typesafe")],
  ["OMNIROUTE_JEV_API_KEY", () => (process.env.OMNIROUTE_JEV_API_KEY = "sk-jev")],
] as const) {
  test(`${label} alone engages no lane and sends nothing upstream`, async () => {
    apply();
    for (const feature of JEV_FEATURES) {
      assert.equal(isJevFeatureEnabled(feature), false, `${feature} must stay off`);
    }
    assert.equal(await resolveJevRuntime(), null);
    assert.equal(await decideRoute({ prompt: "write a sorting function" }), null);
    assert.equal(fetchCalls, 0);
  });
}

test("OMNIROUTE_JEV_ENABLED=auto (the old implicit default) is not an opt-in", async () => {
  process.env.TYPESAFE_API_KEY = "sk-typesafe";
  process.env.OMNIROUTE_JEV_ENABLED = "auto";
  assert.equal(isJevFeatureEnabled("routing"), false);
  assert.equal(await resolveJevRuntime(), null);
});

test("an explicit OMNIROUTE_JEV_ENABLED=on with a credential resolves the runtime", async () => {
  process.env.TYPESAFE_API_KEY = "sk-typesafe";
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_FEATURES = "routing";
  assert.equal(isJevFeatureEnabled("routing"), true);
  assert.equal(isJevFeatureEnabled("mcp"), false);
  const runtime = await resolveJevRuntime();
  assert.ok(runtime);
  assert.equal(runtime.apiKey, "sk-typesafe");
});

test("TYPESAFE_BASE_URL is honored as the documented legacy alias of OMNIROUTE_JEV_BASE_URL", async () => {
  process.env.TYPESAFE_API_KEY = "sk-typesafe";
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.TYPESAFE_BASE_URL = "https://legacy.typesafe.example/";
  const runtime = await resolveJevRuntime();
  assert.ok(runtime);
  assert.equal(runtime.baseUrl, "https://legacy.typesafe.example");

  __resetJevRuntimeCacheForTests();
  process.env.OMNIROUTE_JEV_BASE_URL = "https://primary.example";
  assert.equal((await resolveJevRuntime())?.baseUrl, "https://primary.example");
});
