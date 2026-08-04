/**
 * T-03 provider-hook contract tests.
 *
 * Covers `createOmniRouteProviderHook(opts, deps)`:
 *   - hook.id binds to resolved providerId (single + multi-instance)
 *   - models() narrows ctx.auth, fetches via injected fetcher, caches per
 *     (baseURL, apiKey) tuple, refetches after TTL
 *   - mapRawModelToModelV2 emits a v2 Model shape matching the
 *     @opencode-ai/sdk/v2 type
 *
 * Mocking strategy: the fetcher is dependency-injected at hook construction
 * (`deps.fetcher`). No global fetch monkey-patch needed. `deps.now` lets us
 * fast-forward time deterministically for TTL assertions.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  createOmniRouteProviderHook,
  mapRawModelToModelV2,
  type OmniRouteRawModelEntry,
  type OmniRouteModelsFetcher,
} from "../src/index.js";

const FIXTURE: OmniRouteRawModelEntry[] = [
  {
    id: "claude-primary",
    object: "model",
    owned_by: "combo",
    capabilities: { tool_calling: true, reasoning: true, vision: true, thinking: true },
    context_length: 200000,
    max_output_tokens: 64000,
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  },
  {
    id: "claude-low",
    object: "model",
    owned_by: "combo",
    capabilities: { tool_calling: true, reasoning: true, vision: true, thinking: false },
    context_length: 200000,
    max_output_tokens: 64000,
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  },
  {
    id: "gemini-3-flash",
    object: "model",
    owned_by: "google",
    capabilities: { tool_calling: true, reasoning: false, vision: true, thinking: false },
    context_length: 1000000,
    max_output_tokens: 8192,
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  },
];

function stubFetcher(payload: OmniRouteRawModelEntry[]): OmniRouteModelsFetcher & {
  callCount: () => number;
  callsBy: () => Array<[string, string]>;
} {
  let calls: Array<[string, string]> = [];
  const f: OmniRouteModelsFetcher = async (baseURL, apiKey) => {
    calls.push([baseURL, apiKey]);
    return payload;
  };
  return Object.assign(f, {
    callCount: () => calls.length,
    callsBy: () => calls,
  });
}

const apiAuth = (key: string, baseURL?: string): unknown =>
  baseURL ? { type: "api", key, baseURL } : { type: "api", key };

test("createOmniRouteProviderHook: default providerId is 'omniroute'", () => {
  const hook = createOmniRouteProviderHook(undefined, { combosFetcher: async () => [] });
  assert.equal(hook.id, "opencode-omniroute");
});

test("createOmniRouteProviderHook: custom providerId binds to hook.id (multi-instance)", () => {
  const a = createOmniRouteProviderHook(
    { providerId: "omniroute-preprod" },
    { combosFetcher: async () => [] }
  );
  const b = createOmniRouteProviderHook(
    { providerId: "omniroute-local" },
    { combosFetcher: async () => [] }
  );
  assert.equal(a.id, "opencode-omniroute-preprod");
  assert.equal(b.id, "opencode-omniroute-local");
});

test("models: extracts apiKey from ctx.auth (type=api) and calls fetcher with it", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1" },
    { fetcher, combosFetcher: async () => [] }
  );
  const out = await hook.models!({} as never, { auth: apiAuth("sk-abc") as never });
  assert.equal(fetcher.callCount(), 1);
  assert.deepEqual(fetcher.callsBy()[0], ["https://or.example.com/v1", "sk-abc"]);
  assert.equal(Object.keys(out).length, 3);
  // #6859: dynamic-hook catalog keys use the unprefixed omnirouteProviderId
  // ("omniroute"), not the OC-gate-prefixed hook.id ("opencode-omniroute") —
  // that prefix must never leak into anything OmniRoute's server parses.
  assert.ok(out["omniroute/claude-primary"]);
});

test("models: returns {} when ctx.auth is null/undefined/wrong-type/empty-key", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1" },
    { fetcher, combosFetcher: async () => [] }
  );

  assert.deepEqual(await hook.models!({} as never, {} as never), {});
  assert.deepEqual(await hook.models!({} as never, { auth: undefined } as never), {});
  assert.deepEqual(
    await hook.models!({} as never, {
      auth: { type: "oauth", refresh: "r", access: "a", expires: 0 } as never,
    }),
    {}
  );
  assert.deepEqual(
    await hook.models!({} as never, { auth: { type: "api", key: "" } as never }),
    {}
  );
  assert.equal(fetcher.callCount(), 0, "fetcher must not be called on auth rejection");
});

test("models: returns {} when no baseURL resolvable (no opts.baseURL and no auth.baseURL)", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook({}, { fetcher, combosFetcher: async () => [] });
  // valid api auth but neither opts nor auth carries a baseURL
  assert.deepEqual(await hook.models!({} as never, { auth: apiAuth("sk-x") as never }), {});
  assert.equal(fetcher.callCount(), 0);
});

test("models: baseURL falls back to auth.baseURL when opts.baseURL absent", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook({}, { fetcher, combosFetcher: async () => [] });
  const out = await hook.models!({} as never, {
    auth: apiAuth("sk-y", "https://or.creds-attached.example/v1") as never,
  });
  assert.equal(fetcher.callCount(), 1);
  assert.equal(fetcher.callsBy()[0][0], "https://or.creds-attached.example/v1");
  assert.equal(Object.keys(out).length, 3);
});

test("models: maps a sample /v1/models entry to ModelV2 (sanity)", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook(
    { providerId: "omniroute", baseURL: "https://or.example.com/v1" },
    { fetcher, combosFetcher: async () => [] }
  );
  const out = await hook.models!({} as never, { auth: apiAuth("sk-abc") as never });
  // #6859: dynamic-hook catalog keys/ids/providerID use the unprefixed
  // omnirouteProviderId ("omniroute") — the OC-gate prefix ("opencode-")
  // must stay OC-internal (hook.id / AuthHook.provider) and never leak into
  // anything OmniRoute's own server parses for credential lookup.
  const claude = out["omniroute/claude-primary"];
  assert.ok(claude, "claude-primary present");
  // `mapRawModelToModelV2` stamps the provider prefix on the id so OC's
  // static-catalog reader resolves `(providerID, modelID)` from the key.
  assert.equal(claude.id, "omniroute/claude-primary");
  assert.equal(claude.name, "claude-primary");
  assert.equal(claude.providerID, "omniroute");
  assert.equal(claude.api.id, "openai-compatible");
  assert.equal(claude.api.url, "https://or.example.com/v1");
  assert.equal(claude.api.npm, "@ai-sdk/openai-compatible");
  // capabilities: toolcall (one word), reasoning OR thinking, attachment = vision
  assert.equal(claude.capabilities.toolcall, true);
  assert.equal(claude.capabilities.reasoning, true);
  assert.equal(claude.capabilities.attachment, true);
  assert.equal(claude.capabilities.temperature, true);
  // modalities mapped from arrays
  assert.equal(claude.capabilities.input.text, true);
  assert.equal(claude.capabilities.input.image, true);
  assert.equal(claude.capabilities.input.audio, false);
  assert.equal(claude.capabilities.output.text, true);
  assert.equal(claude.capabilities.output.image, false);
  // cost is zeroed (OmniRoute /v1/models has no pricing)
  assert.deepEqual(claude.cost, { input: 0, output: 0, cache: { read: 0, write: 0 } });
  // limits
  assert.equal(claude.limit.context, 200000);
  assert.equal(claude.limit.output, 64000);
  assert.equal(claude.status, "active");
});

test("mapRawModelToModelV2: thinking-only model still surfaces reasoning=true", () => {
  const m = mapRawModelToModelV2(
    {
      id: "thinking-only",
      capabilities: { thinking: true, reasoning: false },
      context_length: 100000,
      max_output_tokens: 8192,
    },
    { providerId: "omniroute", baseURL: "https://or.example.com/v1" }
  );
  assert.equal(m.capabilities.reasoning, true);
});

test("mapRawModelToModelV2: missing capabilities defaults to all-false (except temperature)", () => {
  const m = mapRawModelToModelV2(
    { id: "minimal" },
    { providerId: "omniroute", baseURL: "https://or.example.com/v1" }
  );
  assert.equal(m.capabilities.temperature, true);
  assert.equal(m.capabilities.reasoning, false);
  assert.equal(m.capabilities.attachment, false);
  assert.equal(m.capabilities.toolcall, false);
  // default modalities = text only
  assert.equal(m.capabilities.input.text, true);
  assert.equal(m.capabilities.output.text, true);
  // missing context / output tokens → 0 fallback (ModelV2.limit.{context,output} required)
  assert.equal(m.limit.context, 0);
  assert.equal(m.limit.output, 0);
});

test("models: caches result for second call within TTL (fetcher called once)", async () => {
  const fetcher = stubFetcher(FIXTURE);
  let nowMs = 1_000_000;
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1", modelCacheTtl: 60_000 },
    { fetcher, now: () => nowMs, combosFetcher: async () => [] }
  );

  const a = await hook.models!({} as never, { auth: apiAuth("sk-z") as never });
  nowMs += 30_000; // half the TTL
  const b = await hook.models!({} as never, { auth: apiAuth("sk-z") as never });
  assert.equal(fetcher.callCount(), 1, "second call within TTL must hit the cache");
  assert.equal(Object.keys(a).length, 3);
  assert.equal(Object.keys(b).length, 3);
});

test("models: refetches after TTL expires", async () => {
  const fetcher = stubFetcher(FIXTURE);
  let nowMs = 1_000_000;
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1", modelCacheTtl: 60_000 },
    { fetcher, now: () => nowMs, combosFetcher: async () => [] }
  );

  await hook.models!({} as never, { auth: apiAuth("sk-z") as never });
  nowMs += 60_001; // just past the TTL
  await hook.models!({} as never, { auth: apiAuth("sk-z") as never });
  assert.equal(fetcher.callCount(), 2, "call past TTL must refetch");
});

test("models: caches per (baseURL, apiKey) tuple (different keys → independent fetches)", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1", modelCacheTtl: 300_000 },
    { fetcher, combosFetcher: async () => [] }
  );

  await hook.models!({} as never, { auth: apiAuth("sk-A") as never });
  await hook.models!({} as never, { auth: apiAuth("sk-B") as never });
  await hook.models!({} as never, { auth: apiAuth("sk-A") as never }); // cached
  await hook.models!({} as never, { auth: apiAuth("sk-B") as never }); // cached
  assert.equal(fetcher.callCount(), 2, "one fetch per distinct apiKey, then cache hits");
});

test("models: caches per (baseURL, apiKey) tuple (different baseURL → independent fetches)", async () => {
  const fetcher = stubFetcher(FIXTURE);
  const hook = createOmniRouteProviderHook(
    { modelCacheTtl: 300_000 }, // no opts.baseURL → falls back to auth.baseURL
    { fetcher, combosFetcher: async () => [] }
  );

  await hook.models!({} as never, { auth: apiAuth("sk-same", "https://prod.example/v1") as never });
  await hook.models!({} as never, {
    auth: apiAuth("sk-same", "https://preprod.example/v1") as never,
  });
  await hook.models!({} as never, { auth: apiAuth("sk-same", "https://prod.example/v1") as never }); // cached
  assert.equal(fetcher.callCount(), 2, "distinct baseURLs share apiKey but not cache");
});
