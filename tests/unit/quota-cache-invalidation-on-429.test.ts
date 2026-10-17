import test from "node:test";
import assert from "node:assert/strict";

import { resolveResilienceSettings } from "@/lib/resilience/settings";
import {
  executeProviderRequest,
  type ExecuteProviderRequestDeps,
} from "../../open-sse/handlers/chatCore/executeProviderRequest.ts";
import {
  __quotaCacheInvalidatorCountForTests,
  __resetQuotaCacheInvalidatorsForTests,
  getQuotaCacheInvalidator,
} from "../../open-sse/services/quotaPreflight.ts";
import {
  clearPayloadRulesConfigOverride,
  setPayloadRulesConfig,
} from "../../open-sse/services/payloadRules.ts";
import { invalidateQuotaCacheOnStatus } from "../../open-sse/services/genericQuotaFetcher.ts";
import {
  fetchV0Quota,
  invalidateV0QuotaCache,
  registerV0QuotaFetcher,
} from "../../open-sse/services/v0QuotaFetcher.ts";
import {
  fetchTavilyQuota,
  invalidateTavilyQuotaCache,
  registerTavilyQuotaFetcher,
} from "../../open-sse/services/tavilyQuotaFetcher.ts";
import {
  invalidateCodexQuotaCache,
  registerCodexQuotaFetcher,
} from "../../open-sse/services/codexQuotaFetcher.ts";
import { registerAgentrouterQuotaFetcher } from "../../open-sse/services/agentrouterQuotaFetcher.ts";
import { registerBailianCodingPlanQuotaFetcher } from "../../open-sse/services/bailianQuotaFetcher.ts";
import { registerContext7QuotaFetcher } from "../../open-sse/services/context7QuotaFetcher.ts";
import { registerCrofUsageFetcher } from "../../open-sse/services/crofUsageFetcher.ts";
import { registerDeepseekQuotaFetcher } from "../../open-sse/services/deepseekQuotaFetcher.ts";
import { registerFirecrawlQuotaFetcher } from "../../open-sse/services/firecrawlQuotaFetcher.ts";
import { registerGrokCliQuotaFetcher } from "../../open-sse/services/grokCliQuotaFetcher.ts";
import { registerGrokWebQuotaFetcher } from "../../open-sse/services/grokQuotaFetcher.ts";
import { registerJinaQuotaFetcher } from "../../open-sse/services/jinaQuotaFetcher.ts";
import { registerLlmgatewayQuotaFetcher } from "../../open-sse/services/llmgatewayQuotaFetcher.ts";
import { registerLyceumQuotaFetcher } from "../../open-sse/services/lyceumQuotaFetcher.ts";
import { registerMoonshotQuotaFetcher } from "../../open-sse/services/moonshotQuotaFetcher.ts";
import { registerOpencodeQuotaFetcher } from "../../open-sse/services/opencodeQuotaFetcher.ts";
import { registerOpenrouterQuotaFetcher } from "../../open-sse/services/openrouterQuotaFetcher.ts";
import { registerQwenTokenPlanQuotaFetcher } from "../../open-sse/services/qwenTokenPlanQuotaFetcher.ts";
import { registerXaiOauthQuotaFetcher } from "../../open-sse/services/xaiOauthQuotaFetcher.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
});

function stubV0Endpoints(counter: { calls: number }): void {
  globalThis.fetch = (async (url: string | URL | Request) => {
    counter.calls += 1;
    if (String(url).endsWith("/v1/user/billing")) {
      return new Response(
        JSON.stringify({ billingType: "credit", data: { remaining: 50, limit: 100 } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ remaining: 900, limit: 1000 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
}

function tavilyUsageResponse(): Response {
  return new Response(
    JSON.stringify({
      key: { usage: 100, limit: null },
      account: {
        current_plan: "Researcher",
        plan_usage: 100,
        plan_limit: 1000,
        paygo_usage: 0,
        paygo_limit: null,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

/**
 * Runs the provider send site with a stubbed executor that answers `status`, so the
 * real 429 branch (guard, connection id, dispatcher arguments) executes — not a copy
 * of the call. Everything the branch needs beyond the response is inert (no network,
 * no rate-limit queue, no account gate).
 */
async function runProviderSite(connectionId: string, status: number): Promise<void> {
  const controller = new AbortController();
  const credentials = { connectionId, apiKey: "v0-key" };
  const model = "gpt-5-mini";
  const body = { model, messages: [{ role: "user", content: "hi" }] };
  const deps: ExecuteProviderRequestDeps = {
    agentGoalPolicy: {
      detected: false,
      readinessMaxTimeoutMs: 600_000,
      streamRecoveryEnabled: false,
    },
    assertManagedLeaseFence: () => {},
    buildUpstreamHeadersForExecute: () => ({}),
    clientRawRequest: { headers: new Headers(), signal: controller.signal },
    clientResponseFormat: "chat.completions",
    connectionId: null,
    correlationId: null,
    credentials: null,
    dedupEnabled: false,
    dedupHash: null,
    effectiveModel: model,
    executor: {
      execute: async () =>
        new Response(JSON.stringify({ error: { message: "quota exceeded" } }), {
          status,
          headers: { "content-type": "application/json" },
        }),
    },
    extendedContext: false,
    getExecutionCredentials: () => credentials,
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => false,
    isOpencodeClient: false,
    log: null,
    model,
    onCredentialsRefreshed: null,
    pendingScope: { id: null, model, provider: "v0-vercel", connectionId: null },
    provider: "v0-vercel",
    providerRequestCapture: { capture: () => {}, body: (fallback: unknown) => fallback },
    rawBody: body,
    recordKeyHealthStatus: () => {},
    requestedModel: model,
    resilienceSettings: resolveResilienceSettings(null),
    settings: null,
    skipUpstreamRetry: false,
    stream: false,
    streamController: { signal: controller.signal },
    targetFormat: "openai",
    trace: () => {},
    traceId: "quota-429-site",
    translatedBody: body,
    trustedEffortContext: {},
    upstreamStream: false,
    userAgent: "quota-429-site-test",
  };

  const result = await executeProviderRequest(deps, model);
  assert.equal(
    result.response.status,
    status,
    "the stubbed executor response must reach the caller"
  );
}

test("an upstream 429 makes the v0 fetcher read fresh usage instead of its cached snapshot", async () => {
  const connectionId = `v0-429-${Date.now()}`;
  registerV0QuotaFetcher();
  const counter = { calls: 0 };
  stubV0Endpoints(counter);
  try {
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 2, "a second read inside the TTL must be served from the cache");

    const dropped = invalidateQuotaCacheOnStatus({
      provider: "v0-vercel",
      connectionId,
      status: 429,
    });
    assert.equal(dropped, true);

    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 4, "the 429 drop must force the next read upstream");
  } finally {
    invalidateV0QuotaCache(connectionId);
  }
});

test("an upstream 429 makes the tavily fetcher read fresh usage instead of its cached snapshot", async () => {
  const connectionId = `tavily-429-${Date.now()}`;
  registerTavilyQuotaFetcher();
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return tavilyUsageResponse();
  }) as typeof fetch;
  try {
    await fetchTavilyQuota(connectionId, { apiKey: "tvly-key" });
    await fetchTavilyQuota(connectionId, { apiKey: "tvly-key" });
    assert.equal(calls, 1, "a second read inside the TTL must be served from the cache");

    const dropped = invalidateQuotaCacheOnStatus({
      provider: "tavily",
      connectionId,
      status: 429,
    });
    assert.equal(dropped, true);

    await fetchTavilyQuota(connectionId, { apiKey: "tvly-key" });
    assert.equal(calls, 2, "the 429 drop must force the next read upstream");
  } finally {
    invalidateTavilyQuotaCache(connectionId);
  }
});

test("the 429 site in executeProviderRequest drops the cached snapshot the next read would reuse", async () => {
  const connectionId = `v0-site-429-${Date.now()}`;
  registerV0QuotaFetcher();
  setPayloadRulesConfig({ default: [], override: [], filter: [], defaultRaw: [] });
  const counter = { calls: 0 };
  stubV0Endpoints(counter);
  try {
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 2, "a second read inside the TTL must be served from the cache");

    await runProviderSite(connectionId, 429);
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 4, "a 429 answered at the site must force the next read upstream");

    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    await runProviderSite(connectionId, 200);
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 4, "a 200 answered at the site must keep the cached snapshot");
  } finally {
    invalidateV0QuotaCache(connectionId);
    clearPayloadRulesConfigOverride();
  }
});

test("the codex cache drop is reachable through the shared registry", () => {
  registerCodexQuotaFetcher();
  assert.equal(getQuotaCacheInvalidator("codex"), invalidateCodexQuotaCache);

  const dropped = invalidateQuotaCacheOnStatus({
    provider: "codex",
    connectionId: `codex-429-${Date.now()}`,
    status: 429,
  });
  assert.equal(dropped, true);
});

test("a non-429 response leaves the cached quota snapshot in place", async () => {
  const connectionId = `v0-non-429-${Date.now()}`;
  registerV0QuotaFetcher();
  const counter = { calls: 0 };
  stubV0Endpoints(counter);
  try {
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });

    assert.equal(
      invalidateQuotaCacheOnStatus({ provider: "v0-vercel", connectionId, status: 200 }),
      false
    );
    assert.equal(
      invalidateQuotaCacheOnStatus({ provider: "v0-vercel", connectionId, status: 500 }),
      false
    );

    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 2, "a non-429 status must keep serving the cached snapshot");
  } finally {
    invalidateV0QuotaCache(connectionId);
  }
});

test("a probe-origin 429 leaves the cached quota snapshot in place", async () => {
  const connectionId = `v0-probe-${Date.now()}`;
  registerV0QuotaFetcher();
  const counter = { calls: 0 };
  stubV0Endpoints(counter);
  try {
    await fetchV0Quota(connectionId, { apiKey: "v0-key" });

    assert.equal(
      invalidateQuotaCacheOnStatus({
        provider: "v0-vercel",
        connectionId,
        status: 429,
        isolateProbe: true,
      }),
      false
    );

    await fetchV0Quota(connectionId, { apiKey: "v0-key" });
    assert.equal(counter.calls, 2, "an isolated probe must not drop the routing cache");
  } finally {
    invalidateV0QuotaCache(connectionId);
  }
});

test("empty identifiers are ignored and an unknown provider keeps the generic drop", () => {
  registerV0QuotaFetcher();

  assert.equal(
    invalidateQuotaCacheOnStatus({ provider: "", connectionId: "v0-empty", status: 429 }),
    false
  );
  assert.equal(
    invalidateQuotaCacheOnStatus({ provider: "v0-vercel", connectionId: "", status: 429 }),
    false
  );
  assert.equal(
    invalidateQuotaCacheOnStatus({ provider: null, connectionId: null, status: 429 }),
    false
  );
  assert.equal(
    invalidateQuotaCacheOnStatus({
      provider: "unknown-provider",
      connectionId: `unknown-provider-${Date.now()}`,
      status: 429,
    }),
    true
  );
});

test("every bespoke quota fetcher registers an invalidator for all of its provider keys", () => {
  __resetQuotaCacheInvalidatorsForTests();

  registerAgentrouterQuotaFetcher();
  registerBailianCodingPlanQuotaFetcher();
  registerCodexQuotaFetcher();
  registerContext7QuotaFetcher();
  registerCrofUsageFetcher();
  registerDeepseekQuotaFetcher();
  registerFirecrawlQuotaFetcher();
  registerGrokCliQuotaFetcher();
  registerGrokWebQuotaFetcher();
  registerJinaQuotaFetcher();
  registerLlmgatewayQuotaFetcher();
  registerLyceumQuotaFetcher();
  registerMoonshotQuotaFetcher();
  registerOpencodeQuotaFetcher();
  registerOpenrouterQuotaFetcher();
  registerQwenTokenPlanQuotaFetcher();
  registerTavilyQuotaFetcher();
  registerV0QuotaFetcher();
  registerXaiOauthQuotaFetcher();

  const keys = [
    "agentrouter",
    "bailian-coding-plan",
    "codex",
    "context7",
    "crof",
    "deepseek",
    "firecrawl",
    "grok-cli",
    "grok-web",
    "jina-search",
    "jina",
    "jina-ai",
    "jina-reader",
    "llmgateway",
    "lyceum",
    "moonshot",
    "kimi",
    "opencode-go",
    "opencode",
    "opencode-zen",
    "openrouter",
    "qwen-cloud-token-plan",
    "tavily-search",
    "tavily",
    "v0-vercel",
    "xai-oauth",
    "xao",
  ];
  for (const key of keys) {
    assert.equal(
      typeof getQuotaCacheInvalidator(key),
      "function",
      `missing quota cache invalidator for ${key}`
    );
  }
});

test("the invalidator registry keeps one entry per provider key and can be reset", () => {
  __resetQuotaCacheInvalidatorsForTests();
  assert.equal(__quotaCacheInvalidatorCountForTests(), 0);

  registerV0QuotaFetcher();
  registerV0QuotaFetcher();
  assert.equal(
    __quotaCacheInvalidatorCountForTests(),
    1,
    "re-registering a provider must overwrite its entry, not append a second one"
  );
  assert.equal(getQuotaCacheInvalidator("v0-vercel"), invalidateV0QuotaCache);

  __resetQuotaCacheInvalidatorsForTests();
  assert.equal(
    __quotaCacheInvalidatorCountForTests(),
    0,
    "reset must return the registry to its start size"
  );
  assert.equal(getQuotaCacheInvalidator("v0-vercel"), undefined);
});
