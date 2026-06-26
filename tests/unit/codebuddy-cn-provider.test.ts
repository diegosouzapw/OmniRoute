import test from "node:test";
import assert from "node:assert/strict";

import {
  AI_PROVIDERS,
  USAGE_SUPPORTED_PROVIDERS,
  FREE_APIKEY_PROVIDER_IDS,
} from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";
import {
  PROVIDERS as OAUTH_PROVIDER_IDS,
  CODEBUDDY_CN_CONFIG,
} from "../../src/lib/oauth/constants/oauth.ts";
import PROVIDERS_MAP from "../../src/lib/oauth/providers/index.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";

test("codebuddy-cn is registered as an OAuth provider in the UI catalog", () => {
  const p = AI_PROVIDERS["codebuddy-cn"];
  assert.ok(p, "AI_PROVIDERS['codebuddy-cn'] must exist");
  assert.equal(p.id, "codebuddy-cn");
  assert.equal(p.alias, "cbcn");
  assert.equal(p.name, "CodeBuddy CN");
});

test("codebuddy-cn registry entry has expected shape", () => {
  const r = REGISTRY["codebuddy-cn"];
  assert.ok(r, "REGISTRY['codebuddy-cn'] must exist");
  assert.equal(r.alias, "cbcn");
  assert.equal(r.executor, "codebuddy-cn");
  assert.equal(r.baseUrl, "https://copilot.tencent.com/v2/chat/completions");
  assert.equal(r.authHeader, "bearer");
  // Headers carry the Tencent CodeBuddy CLI fingerprint
  assert.equal(r.headers?.["X-Product"], "SaaS");
  assert.equal(r.headers?.["X-IDE-Type"], "CLI");
  assert.equal(r.headers?.["X-IDE-Name"], "CLI");
  assert.equal(r.headers?.["x-requested-with"], "XMLHttpRequest");
  assert.equal(r.headers?.["x-codebuddy-request"], "1");
  // 15 models from the upstream catalog
  const ids = r.models.map((m) => m.id);
  for (const expected of [
    "glm-5.2",
    "glm-5.1",
    "glm-5.0",
    "glm-5.0-turbo",
    "glm-5v-turbo",
    "glm-4.7",
    "minimax-m3",
    "minimax-m2.7",
    "kimi-k2.7",
    "kimi-k2.6",
    "kimi-k2.5",
    "hy3-preview",
    "deepseek-v4-pro",
    "deepseek-v4-flash",
    "deepseek-v3-2-volc",
  ]) {
    assert.ok(ids.includes(expected), `model ${expected} must be registered`);
  }
  assert.equal(r.models.length, 15);
});

test("codebuddy-cn glm-5.2 carries 1M context and openai-style reasoning that cannot be disabled", () => {
  const r = REGISTRY["codebuddy-cn"];
  const m = r.models.find((x) => x.id === "glm-5.2");
  assert.ok(m, "glm-5.2 must exist");
  // contextLength is the OmniRoute analogue of upstream's contextWindow
  assert.equal(m.contextLength, 1000000);
  assert.equal(m.supportsReasoning, true);
});

test("codebuddy-cn vision flag is set on the visual models", () => {
  const r = REGISTRY["codebuddy-cn"];
  for (const id of ["glm-5v-turbo", "minimax-m3", "kimi-k2.7", "deepseek-v4-pro"]) {
    const m = r.models.find((x) => x.id === id);
    assert.ok(m, `${id} must exist`);
    assert.equal(m.supportsVision, true, `${id} should have vision`);
  }
});

test("getExecutor returns the CodeBuddyCnExecutor for 'codebuddy-cn' and the 'cbcn' alias", () => {
  const e = getExecutor("codebuddy-cn");
  assert.ok(e instanceof CodeBuddyCnExecutor, "executor must be CodeBuddyCnExecutor");
  const aliasExec = getExecutor("cbcn");
  assert.ok(aliasExec instanceof CodeBuddyCnExecutor, "alias 'cbcn' must resolve to same executor");
});

test("CodeBuddyCnExecutor.transformRequest forces stream:true and adds OpenAI-style reasoning_summary", () => {
  const e = new CodeBuddyCnExecutor();
  const out = e.transformRequest(
    "glm-5.2",
    { model: "glm-5.2", messages: [{ role: "user", content: "hi" }], stream: false },
    false,
    {} as unknown as Parameters<typeof e.transformRequest>[3]
  );
  assert.ok(out && typeof out === "object" && !Array.isArray(out));
  const body = out as Record<string, unknown>;
  assert.equal(body.stream, true, "stream must be forced to true");
  assert.equal(body.reasoning_effort, "medium", "default reasoning_effort must be 'medium'");
  assert.equal(body.reasoning_summary, "auto", "reasoning_summary must be 'auto'");
});

test("CodeBuddyCnExecutor preserves explicit reasoning_effort", () => {
  const e = new CodeBuddyCnExecutor();
  const out = e.transformRequest(
    "glm-5.2",
    { model: "glm-5.2", messages: [], reasoning_effort: "high" },
    true,
    {} as unknown as Parameters<typeof e.transformRequest>[3]
  );
  const body = out as Record<string, unknown>;
  assert.equal(body.reasoning_effort, "high");
  assert.equal(body.reasoning_summary, "auto");
});

test("CodeBuddyCnExecutor strips reasoning_effort when caller asks for none/off", () => {
  const e = new CodeBuddyCnExecutor();
  for (const effort of ["none", "off"]) {
    const out = e.transformRequest(
      "glm-5.2",
      { model: "glm-5.2", messages: [], reasoning_effort: effort },
      true,
      {} as unknown as Parameters<typeof e.transformRequest>[3]
    );
    const body = out as Record<string, unknown>;
    assert.equal(
      Object.prototype.hasOwnProperty.call(body, "reasoning_effort"),
      false,
      `reasoning_effort must be omitted for ${effort}`
    );
    assert.notEqual(body.reasoning_summary, "auto", `reasoning_summary must not be auto for ${effort}`);
  }
});

test("codebuddy-cn OAuth provider is wired with device_code flow and GET-poll on state", async () => {
  assert.equal(OAUTH_PROVIDER_IDS.CODEBUDDY_CN, "codebuddy-cn");
  const map = (PROVIDERS_MAP as Record<string, any>);
  const cb = map["codebuddy-cn"];
  assert.ok(cb, "PROVIDERS map must include 'codebuddy-cn'");
  assert.equal(cb.flowType, "device_code");
  assert.equal(typeof cb.requestDeviceCode, "function");
  assert.equal(typeof cb.pollToken, "function");

  // Drive pollToken with a stubbed fetch and assert it hits the token URL via GET
  // with the state as a query param (upstream's distinguishing detail).
  const origFetch = globalThis.fetch;
  const calls: { url: string; init?: RequestInit }[] = [];
  globalThis.fetch = async (url: any, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response(
      JSON.stringify({
        code: 0,
        data: {
          accessToken: "AT",
          refreshToken: "RT",
          tokenType: "Bearer",
          expiresIn: 3600,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    ) as unknown as Response;
  };
  try {
    const result = await cb.pollToken(CODEBUDDY_CN_CONFIG, "STATE-123");
    assert.ok(result?.ok, "successful poll should be ok:true");
    assert.equal(result?.data?.access_token, "AT");
    const got = calls.at(-1);
    assert.ok(got, "fetch must have been called");
    assert.equal(got.init?.method, "GET", "poll method must be GET");
    assert.match(got.url, /\?state=STATE-123$/, "state must appear as ?state= query param");
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("codebuddy-cn token refresh handler is wired in tokenRefresh.ts", () => {
  assert.equal(supportsTokenRefresh("codebuddy-cn"), true);
});

test("codebuddy-cn is in USAGE_SUPPORTED_PROVIDERS and quota handler parses Tencent accounts", async () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("codebuddy-cn"));
  const { getCodeBuddyCnUsage } = await import(
    "../../open-sse/services/usage/codebuddy-cn.ts"
  );

  const origFetch = globalThis.fetch;
  // Compose a mixed payload: one refill (CycleEndTime << DeductionEndTime) and
  // two bonus packs (CycleEndTime == DeductionEndTime), out of expiry order.
  const cycleEnd = "2026-08-01T00:00:00Z";
  const deductionEnd = 32503680000; // very far future (seconds)
  const bonus1End = "2026-07-01T00:00:00Z";
  const bonus2End = "2026-06-25T00:00:00Z";
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        code: 0,
        data: {
          Response: {
            Data: {
              Accounts: [
                {
                  PackageName: "Refill Pack",
                  CycleStartTime: "2026-07-01T00:00:00Z",
                  CycleEndTime: cycleEnd,
                  DeductionEndTime: deductionEnd,
                  CycleCapacitySize: 500,
                  CycleCapacityUsed: 12.34,
                },
                {
                  PackageName: "Bonus A",
                  CycleStartTime: "2026-05-01T00:00:00Z",
                  CycleEndTime: bonus1End,
                  DeductionEndTime: new Date(bonus1End).getTime() / 1000,
                  CapacitySize: 50,
                  CapacityUsed: 1,
                },
                {
                  PackageName: "Bonus B",
                  CycleStartTime: "2026-05-01T00:00:00Z",
                  CycleEndTime: bonus2End,
                  DeductionEndTime: new Date(bonus2End).getTime() / 1000,
                  CapacitySize: 25,
                  CapacityUsed: 5,
                },
              ],
            },
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    ) as unknown as Response;
  };

  try {
    const result = await getCodeBuddyCnUsage("ACCESS_TOKEN", undefined, undefined);
    assert.ok(result && typeof result === "object");
    const r = result as Record<string, any>;
    assert.equal(r.plan, "Refill Pack");
    assert.ok(r.quotas);
    // Refill (Monthly) uses CycleCapacity*; Bonus packs use plain Capacity*; soonest-expiring first.
    assert.ok(r.quotas.Monthly, "Monthly refill quota must be present");
    assert.equal(r.quotas.Monthly.total, 500);
    assert.equal(r.quotas.Monthly.used, 12.34);
    assert.ok(r.quotas["Bonus Pack 1"], "first bonus must be present");
    assert.ok(r.quotas["Bonus Pack 2"], "second bonus must be present");
    // Soonest-expiring first: Bonus B (Jun 25) before Bonus A (Jul 1).
    assert.equal(r.quotas["Bonus Pack 1"].total, 25, "Bonus Pack 1 should be the soonest (B)");
    assert.equal(r.quotas["Bonus Pack 2"].total, 50, "Bonus Pack 2 should be the later (A)");
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("codebuddy-cn is treated as a managed dual-auth provider (oauth + apikey accepted by POST /api/providers)", async () => {
  // The provider creation gate trusts FREE_APIKEY_PROVIDER_IDS to admit
  // OAuth-category providers that also accept a direct API key (like qoder).
  assert.ok(
    FREE_APIKEY_PROVIDER_IDS.has("codebuddy-cn"),
    "codebuddy-cn must be admitted by the dual-auth gate"
  );
});
