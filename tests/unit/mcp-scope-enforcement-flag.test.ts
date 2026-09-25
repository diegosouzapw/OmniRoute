import test from "node:test";
import assert from "node:assert/strict";

// "MCP Enforce Scopes" (OMNIROUTE_MCP_ENFORCE_SCOPES) is a Feature Flags toggle with
// requiresRestart: false, but both readers compared process.env to "true" at module load, so
// the toggle did nothing and the page reported a state the MCP gate never had. The flag now
// resolves like every other one: DB override, then env, then the definition default.

const KEY = "OMNIROUTE_MCP_ENFORCE_SCOPES";

async function withFlag<T>(
  env: string | undefined,
  dbOverride: string | undefined,
  fn: () => Promise<T> | T
): Promise<T> {
  const { getFeatureFlagOverride, setFeatureFlagOverride, removeFeatureFlagOverride } =
    await import("../../src/lib/db/featureFlags.ts");
  const prev = process.env[KEY];
  const prevOverride = getFeatureFlagOverride(KEY);
  if (env === undefined) delete process.env[KEY];
  else process.env[KEY] = env;
  if (dbOverride === undefined) removeFeatureFlagOverride(KEY);
  else setFeatureFlagOverride(KEY, dbOverride);
  try {
    return await fn();
  } finally {
    if (prevOverride === undefined) removeFeatureFlagOverride(KEY);
    else setFeatureFlagOverride(KEY, prevOverride);
    if (prev === undefined) delete process.env[KEY];
    else process.env[KEY] = prev;
  }
}

async function isEnforced(): Promise<boolean> {
  const { isMcpScopeEnforcementEnabled } = await import("../../src/shared/utils/featureFlags.ts");
  return isMcpScopeEnforcementEnabled();
}

test("a dashboard ON enforces scopes without a restart", async () => {
  await withFlag(undefined, "true", async () => {
    assert.equal(await isEnforced(), true);
  });
});

test("a dashboard OFF beats OMNIROUTE_MCP_ENFORCE_SCOPES=true in env", async () => {
  await withFlag("true", "false", async () => {
    assert.equal(await isEnforced(), false);
  });
});

test("env still turns enforcement on when the dashboard has no override", async () => {
  await withFlag("true", undefined, async () => {
    assert.equal(await isEnforced(), true);
  });
});

test("nothing set leaves scope enforcement off, as shipped", async () => {
  await withFlag(undefined, undefined, async () => {
    assert.equal(await isEnforced(), false);
  });
});

test("the scope gate follows the flag, and the advertised default matches it", async () => {
  const { evaluateToolScopes } = await import("../../open-sse/mcp-server/scopeEnforcement.ts");
  const { FEATURE_FLAG_DEFINITIONS } =
    await import("../../src/shared/constants/featureFlagDefinitions.ts");
  const definition = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === KEY);
  assert.ok(definition, "flag must stay in the catalog");

  // A caller with no scopes: allowed while the gate is off, rejected once it is on.
  const allowsScopelessCaller = async () =>
    evaluateToolScopes("mcp_health", [], await isEnforced()).allowed;

  await withFlag(undefined, undefined, async () => {
    assert.equal(
      await allowsScopelessCaller(),
      definition.defaultValue !== "true",
      "the Feature Flags page must not advertise a default the MCP gate does not apply"
    );
  });
  await withFlag(undefined, "true", async () => {
    assert.equal(await allowsScopelessCaller(), false);
  });
});
