/**
 * T-07 config-hook backward-compat shim tests.
 *
 * Covers `createOmniRouteConfigHook(opts, deps)`:
 *   - happy path: valid auth.json → mutates input.provider[id] with the
 *     stripped per-model shape (mirroring `@omniroute/opencode-provider`).
 *   - no-op paths: missing auth.json, malformed JSON, missing apiKey,
 *     missing baseURL, existing input.provider[id] (manual override).
 *   - fail-open: /v1/models error → stub `models: {}`; /api/combos error →
 *     models-only static catalog.
 *   - baseURL resolution: opts.baseURL → auth.json.baseURL fallback.
 *   - multi-instance: two plugins with different providerIds publish to
 *     their own keys without collision.
 *   - cache sharing: provider hook + config hook on the same Map dedupe
 *     fetcher invocations.
 *   - sibling-shape parity: emitted entries carry only
 *     `{name, attachment?, reasoning?, temperature?, tool_call?, limit?}`
 *     — never the rich ModelV2 nested capabilities tree.
 *
 * Mocking strategy mirrors `provider.test.ts` and `combos.test.ts`: every
 * dependency (`readAuthJson`, `fetcher`, `combosFetcher`, `now`, `cache`,
 * `logger`) is dependency-injected at hook construction. No global
 * `fs/promises` or `fetch` monkey-patch needed.
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { Config } from "@opencode-ai/plugin";

import {
  buildStaticProviderEntry,
  createOmniRouteConfigHook,
  createOmniRouteProviderHook,
  OmniRoutePlugin,
  resolveOmniRoutePluginOptions,
  type OmniRouteCombosFetcher,
  type OmniRouteEnrichmentEntry,
  type OmniRouteEnrichmentFetcher,
  type OmniRouteEnrichmentMap,
  type OmniRouteFetchCache,
  type OmniRouteModelsFetcher,
  type OmniRouteProviderConnection,
  type OmniRouteProvidersFetcher,
  type OmniRouteRawCombo,
  type OmniRouteRawModelEntry,
  type OmniRouteReadAuthJson,
  type OmniRouteStaticProviderEntry,
} from "../src/index.js";

// ────────────────────────────────────────────────────────────────────────────
// Fixtures
// ────────────────────────────────────────────────────────────────────────────

const MODEL_CLAUDE: OmniRouteRawModelEntry = {
  id: "claude-sonnet-4-6",
  capabilities: {
    tool_calling: true,
    reasoning: true,
    vision: true,
    thinking: false,
    temperature: true,
  },
  context_length: 200_000,
  max_output_tokens: 64_000,
  max_input_tokens: 180_000,
  input_modalities: ["text", "image"],
  output_modalities: ["text"],
};

const MODEL_GEMINI: OmniRouteRawModelEntry = {
  id: "gemini-3-flash",
  capabilities: { tool_calling: true, reasoning: false, vision: true, thinking: false },
  context_length: 1_000_000,
  max_output_tokens: 8_192,
  input_modalities: ["text", "image"],
  output_modalities: ["text"],
};

const COMBO_CLAUDE_TIER: OmniRouteRawCombo = {
  id: "combo-claude-tier",
  name: "Claude Tier",
  models: [
    { id: "s1", kind: "model", model: "claude-sonnet-4-6", weight: 100 },
    { id: "s2", kind: "model", model: "gemini-3-flash", weight: 50 },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// Helpers (DI stubs — mirrors patterns in provider.test.ts / combos.test.ts)
// ────────────────────────────────────────────────────────────────────────────

function stubReadAuthJson(
  value: Record<string, unknown> | undefined | null
): OmniRouteReadAuthJson & { callCount: () => number } {
  let n = 0;
  const f: OmniRouteReadAuthJson = async () => {
    n++;
    return value as never;
  };
  return Object.assign(f, { callCount: () => n });
}

function throwingReadAuthJson(): OmniRouteReadAuthJson & { callCount: () => number } {
  let n = 0;
  const f: OmniRouteReadAuthJson = async () => {
    n++;
    throw new Error("EACCES");
  };
  return Object.assign(f, { callCount: () => n });
}

function stubModelsFetcher(
  payload: OmniRouteRawModelEntry[]
): OmniRouteModelsFetcher & { callCount: () => number; callsBy: () => Array<[string, string]> } {
  let n = 0;
  const calls: Array<[string, string]> = [];
  const f: OmniRouteModelsFetcher = async (baseURL, apiKey) => {
    n++;
    calls.push([baseURL, apiKey]);
    return payload;
  };
  return Object.assign(f, { callCount: () => n, callsBy: () => calls });
}

function stubCombosFetcher(
  payload: OmniRouteRawCombo[]
): OmniRouteCombosFetcher & { callCount: () => number; callsBy: () => Array<[string, string]> } {
  let n = 0;
  const calls: Array<[string, string]> = [];
  const f: OmniRouteCombosFetcher = async (baseURL, apiKey) => {
    n++;
    calls.push([baseURL, apiKey]);
    return payload;
  };
  return Object.assign(f, { callCount: () => n, callsBy: () => calls });
}

function throwingModelsFetcher(): OmniRouteModelsFetcher & { callCount: () => number } {
  let n = 0;
  const f: OmniRouteModelsFetcher = async () => {
    n++;
    throw new Error("ECONNREFUSED");
  };
  return Object.assign(f, { callCount: () => n });
}

function throwingCombosFetcher(): OmniRouteCombosFetcher & { callCount: () => number } {
  let n = 0;
  const f: OmniRouteCombosFetcher = async () => {
    n++;
    throw new Error("403 Forbidden");
  };
  return Object.assign(f, { callCount: () => n });
}

function stubEnrichmentFetcher(payload: OmniRouteEnrichmentMap): OmniRouteEnrichmentFetcher & {
  callCount: () => number;
  callsBy: () => Array<[string, string]>;
} {
  let n = 0;
  const calls: Array<[string, string]> = [];
  const f: OmniRouteEnrichmentFetcher = async (baseURL, apiKey) => {
    n++;
    calls.push([baseURL, apiKey]);
    return payload;
  };
  return Object.assign(f, { callCount: () => n, callsBy: () => calls });
}

function throwingEnrichmentFetcher(): OmniRouteEnrichmentFetcher & { callCount: () => number } {
  let n = 0;
  const f: OmniRouteEnrichmentFetcher = async () => {
    n++;
    throw new Error("ETIMEDOUT");
  };
  return Object.assign(f, { callCount: () => n });
}

interface WarnCapture {
  warn: (...args: unknown[]) => void;
  entries: unknown[][];
}

function captureWarn(): WarnCapture {
  const entries: unknown[][] = [];
  return {
    warn: (...args: unknown[]) => {
      entries.push(args);
    },
    entries,
  };
}

function makeInput(initialProvider: Record<string, unknown> = {}): Config {
  // Config = Omit<SDKConfig, "plugin"> & {plugin?: ...}. We only touch the
  // `provider` slot, so a partial cast is acceptable for these tests.
  return { provider: initialProvider } as unknown as Config;
}

// ────────────────────────────────────────────────────────────────────────────
// 1. Happy path — valid auth.json + apiKey + baseURL → mutates input.provider
// ────────────────────────────────────────────────────────────────────────────

test("config: with valid auth.json + apiKey + baseURL → mutates input.provider[id] with stripped models block", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test-1", baseURL: "https://or.example.com/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE, MODEL_GEMINI]);
  const combosFetcher = stubCombosFetcher([COMBO_CLAUDE_TIER]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const provider = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider;
  const entry = provider.omniroute;
  assert.ok(entry, "input.provider.omniroute set");
  assert.equal(entry.npm, "@ai-sdk/openai-compatible");
  assert.equal(entry.name, "OmniRoute");
  assert.equal(entry.options.baseURL, "https://or.example.com/v1");
  assert.equal(entry.options.apiKey, "sk-test-1");

  // Stripped per-model shape: name + cap flags + modalities + (optional)
  // cost. OC's SDK static schema accepts only `limit.{context,output}` —
  // `limit.input` is NOT in the SDK shape and gets dropped silently.
  const claude = entry.models["claude-sonnet-4-6"];
  assert.ok(claude, "claude model surfaced");
  assert.equal(claude.name, "claude-sonnet-4-6");
  assert.equal(claude.attachment, true);
  assert.equal(claude.reasoning, true);
  assert.equal(claude.temperature, true);
  assert.equal(claude.tool_call, true);
  assert.equal(claude.limit?.context, 200_000);
  assert.equal(claude.limit?.output, 64_000);
  assert.equal(
    (claude.limit as Record<string, unknown>).input,
    undefined,
    "limit.input is NOT in OC's SDK schema — must not emit"
  );
  // Modalities — without this field OC defaults `input.image: false`
  // even when `attachment: true`, blocking clipboard paste in the TUI.
  assert.deepEqual(claude.modalities?.input, ["text", "image"]);
  assert.deepEqual(claude.modalities?.output, ["text"]);

  // Combo surfaces under bare key + LCD'd
  // (gemini's reasoning=false → combo reasoning=false).
  const combo = entry.models["claude-tier"];
  assert.ok(combo, "combo surfaced under bare key");
  assert.equal(combo.name, "Claude Tier");
  assert.equal(combo.reasoning, false, "LCD: any member reasoning=false → combo reasoning=false");
  assert.equal(combo.tool_call, true);
  assert.equal(combo.limit?.context, 200_000, "LCD: min(200_000, 1_000_000)");
});

// ────────────────────────────────────────────────────────────────────────────
// 2. Missing auth.json → no-op, no throw, no mutation
// ────────────────────────────────────────────────────────────────────────────

test("config: missing auth.json file → no-op, no throw, no input mutation", async () => {
  const readAuthJson = stubReadAuthJson(undefined);
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.deepEqual((input as { provider: Record<string, unknown> }).provider, {});
  assert.equal(fetcher.callCount(), 0, "no fetch on missing auth.json");
  assert.equal(combosFetcher.callCount(), 0, "no combos fetch on missing auth.json");
  // One breadcrumb — the missing-apiKey path.
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("no apiKey")),
    "breadcrumb emitted"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 3. Malformed auth.json → no-op + warn once
// ────────────────────────────────────────────────────────────────────────────

test("config: malformed auth.json → no-op + warn once", async () => {
  // stubReadAuthJson returns `null` to signal malformed JSON (matches
  // defaultReadAuthJson's contract).
  const readAuthJson = stubReadAuthJson(null);
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.deepEqual((input as { provider: Record<string, unknown> }).provider, {});
  assert.equal(fetcher.callCount(), 0);
  // First warn = "failed to parse"; second warn = "no apiKey".
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("failed to parse")),
    "parse-failure breadcrumb emitted"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 4. Existing input.provider[id] → no overwrite (respect manual override)
// ────────────────────────────────────────────────────────────────────────────

test("config: existing input.provider[id] → no overwrite (respect manual override)", async () => {
  const manual = {
    npm: "@ai-sdk/openai-compatible",
    name: "Manual OmniRoute",
    options: { baseURL: "http://manual/v1", apiKey: "manual-key" },
    models: { "manual-model": { name: "manual-model" } },
  };
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput({ omniroute: manual });
  await hook(input);

  const provider = (input as { provider: Record<string, unknown> }).provider;
  assert.equal(provider.omniroute, manual, "manual override preserved by reference");
  assert.equal(fetcher.callCount(), 0, "no fetch — short-circuited before I/O");
  assert.equal(readAuthJson.callCount(), 0, "no auth.json read either");
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("already set")),
    "override breadcrumb emitted"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 5. fetchers throw → warn + emit stub entry with `models: {}`
// ────────────────────────────────────────────────────────────────────────────

test("config: fetchers throw → warn + emit stub entry with models: {}", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = throwingModelsFetcher();
  const combosFetcher = throwingCombosFetcher();
  const logger = captureWarn();

  // Opt-out of disk-cache fallback for this test — we want to assert the
  // pure stub path, not the disk-cache-recovery path (covered by its own
  // test below).
  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", features: { diskCache: false } },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry, "stub provider entry published even when fetchers fail");
  assert.equal(entry.npm, "@ai-sdk/openai-compatible");
  assert.deepEqual(entry.models, {}, "models stub is empty object");
  assert.equal(entry.options.baseURL, "https://or.example/v1");
  assert.equal(entry.options.apiKey, "sk-test");
  // Both warns fired.
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("/v1/models fetch failed")),
    "models-fetch breadcrumb emitted"
  );
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("/api/combos fetch failed")),
    "combos-fetch breadcrumb emitted"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 6. Combos fetcher throws → models-only catalog (no combos in models block)
// ────────────────────────────────────────────────────────────────────────────

test("config: combos fetcher throws → emit models-only catalog (no combos in models block)", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE, MODEL_GEMINI]);
  const combosFetcher = throwingCombosFetcher();
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry);
  const ids = Object.keys(entry.models).sort();
  assert.deepEqual(ids, ["claude-sonnet-4-6", "gemini-3-flash"]);
  assert.equal(entry.models["combo-claude-tier"], undefined, "no combo entry");
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("/api/combos fetch failed")),
    "combos-fetch breadcrumb emitted"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 7. baseURL from auth.json takes precedence when opts.baseURL absent
// ────────────────────────────────────────────────────────────────────────────

test("config: baseURL from auth.json takes precedence when opts.baseURL absent", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://creds.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" }, // NO opts.baseURL
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.equal(fetcher.callsBy()[0][0], "https://creds.example/v1");
  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entry.options.baseURL, "https://creds.example/v1");
});

test("config: opts.baseURL wins over auth.json's stored baseURL", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://creds.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://opts.example/v1" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.equal(fetcher.callsBy()[0][0], "https://opts.example/v1");
  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entry.options.baseURL, "https://opts.example/v1");
});

test("config: no baseURL resolvable (no opts, no auth.json baseURL) → no-op", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test" }, // NO baseURL on the credential
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" }, // NO opts.baseURL
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.deepEqual((input as { provider: Record<string, unknown> }).provider, {});
  assert.equal(fetcher.callCount(), 0);
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("no baseURL")),
    "no-baseURL breadcrumb emitted"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 8. Multi-instance: two plugins with different providerIds publish to
//    their own keys without collision.
// ────────────────────────────────────────────────────────────────────────────

test("config: multi-instance — two plugins with different providerIds publish to their own keys without collision", async () => {
  const readAuthJson = stubReadAuthJson({
    "omniroute-prod": {
      type: "api",
      key: "sk-prod",
      baseURL: "https://prod.example/v1",
    },
    "omniroute-preprod": {
      type: "api",
      key: "sk-preprod",
      baseURL: "https://preprod.example/v1",
    },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hookA = createOmniRouteConfigHook(
    { providerId: "omniroute-prod" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const hookB = createOmniRouteConfigHook(
    { providerId: "omniroute-preprod" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );

  const input = makeInput();
  await hookA(input);
  await hookB(input);

  const provider = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider;
  assert.ok(provider["omniroute-prod"], "prod block present");
  assert.ok(provider["omniroute-preprod"], "preprod block present");
  assert.equal(provider["omniroute-prod"].options.apiKey, "sk-prod");
  assert.equal(provider["omniroute-preprod"].options.apiKey, "sk-preprod");
  assert.equal(provider["omniroute-prod"].options.baseURL, "https://prod.example/v1");
  assert.equal(provider["omniroute-preprod"].options.baseURL, "https://preprod.example/v1");
  assert.notEqual(
    provider["omniroute-prod"],
    provider["omniroute-preprod"],
    "blocks are distinct references"
  );
});

// ────────────────────────────────────────────────────────────────────────────
// 9. Cache sharing: provider hook + config hook on the same Map dedupe
//    fetcher invocations.
// ────────────────────────────────────────────────────────────────────────────

test("config + provider share cache: second call uses cached fetch result (single fetch per TTL)", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-shared", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([COMBO_CLAUDE_TIER]);
  const sharedCache: OmniRouteFetchCache = new Map();
  const logger = captureWarn();

  const configHook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", modelCacheTtl: 60_000 },
    { readAuthJson, fetcher, combosFetcher, cache: sharedCache, logger }
  );
  const providerHook = createOmniRouteProviderHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", modelCacheTtl: 60_000 },
    { fetcher, combosFetcher, cache: sharedCache }
  );

  // Simulate OC ≥1.14.49 cold start: config fires first, populates cache,
  // then provider.models() reuses the cached raw results.
  const input = makeInput();
  await configHook(input);
  assert.equal(fetcher.callCount(), 1, "config fired the only models fetch");
  assert.equal(combosFetcher.callCount(), 1, "config fired the only combos fetch");

  // provider hook then runs — should hit the shared cache, NOT refetch.
  const apiAuth = { type: "api", key: "sk-shared" };
  await providerHook.models!({} as never, { auth: apiAuth as never });
  assert.equal(fetcher.callCount(), 1, "provider reused cached models");
  assert.equal(combosFetcher.callCount(), 1, "provider reused cached combos");
});

test("provider → config order also dedupes (cache populated by provider, consumed by config)", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-reverse", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const sharedCache: OmniRouteFetchCache = new Map();
  const logger = captureWarn();

  const configHook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", modelCacheTtl: 60_000 },
    { readAuthJson, fetcher, combosFetcher, cache: sharedCache, logger }
  );
  const providerHook = createOmniRouteProviderHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", modelCacheTtl: 60_000 },
    { fetcher, combosFetcher, cache: sharedCache }
  );

  await providerHook.models!({} as never, {
    auth: { type: "api", key: "sk-reverse" } as never,
  });
  assert.equal(fetcher.callCount(), 1);

  const input = makeInput();
  await configHook(input);
  assert.equal(fetcher.callCount(), 1, "config reused cached models");
});

// ────────────────────────────────────────────────────────────────────────────
// 10. Stripped models shape matches sibling provider spec
//     (`{name, attachment, reasoning, tool_call, temperature, limit?}`).
// ────────────────────────────────────────────────────────────────────────────

test("buildStaticProviderEntry: stripped per-model shape matches sibling @omniroute/opencode-provider", () => {
  const resolved = resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    displayName: "OmniRoute",
  });
  const block = buildStaticProviderEntry(
    [MODEL_CLAUDE, MODEL_GEMINI],
    [],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );

  // Top-level provider entry shape — ONLY these four keys.
  assert.deepEqual(Object.keys(block).sort(), ["models", "name", "npm", "options"]);
  assert.equal(block.npm, "@ai-sdk/openai-compatible");
  assert.equal(block.name, "OmniRoute");
  assert.deepEqual(Object.keys(block.options).sort(), ["apiKey", "baseURL"]);

  // Per-model entry shape — the keys OC's SDK static schema accepts
  // (see @opencode-ai/sdk types.gen.d.ts). NO nested capabilities tree,
  // NO providerID/api fields from ModelV2 (those belong on the dynamic
  // hook path).
  const allowedKeys = new Set([
    "name",
    "release_date",
    "attachment",
    "reasoning",
    "temperature",
    "tool_call",
    "cost",
    "limit",
    "modalities",
    "providerID",
  ]);
  for (const [id, entry] of Object.entries(block.models)) {
    for (const key of Object.keys(entry)) {
      assert.ok(allowedKeys.has(key), `${id}.${key} is not in the SDK static shape`);
    }
    // capabilities (ModelV2-only) must NOT leak — that's the dynamic-
    // hook nested shape, not the static SDK schema.
    assert.equal(
      (entry as Record<string, unknown>).capabilities,
      undefined,
      `${id} must not carry nested capabilities tree`
    );
  }

  // Sanity: claude entry has all expected stripped fields.
  const claude = block.models["claude-sonnet-4-6"];
  assert.equal(typeof claude.name, "string");
  assert.equal(typeof claude.attachment, "boolean");
  assert.equal(typeof claude.reasoning, "boolean");
  assert.equal(typeof claude.temperature, "boolean");
  assert.equal(typeof claude.tool_call, "boolean");
  assert.equal(typeof claude.limit?.context, "number");
});

test("buildStaticProviderEntry: empty fetch results → stub block with models: {}", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const block = buildStaticProviderEntry([], [], resolved, "https://or.example/v1", "sk-test");
  assert.deepEqual(block.models, {});
  assert.equal(block.options.apiKey, "sk-test");
});

test("buildStaticProviderEntry: hidden combos are excluded", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const block = buildStaticProviderEntry(
    [MODEL_CLAUDE],
    [{ ...COMBO_CLAUDE_TIER, isHidden: true }],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );
  assert.equal(block.models["combo-claude-tier"], undefined);
  assert.ok(block.models["claude-sonnet-4-6"]);
});

// ────────────────────────────────────────────────────────────────────────────
// Schema parity (modalities / cost / release_date / limit cleanup)
// ────────────────────────────────────────────────────────────────────────────

test("buildStaticProviderEntry: emits modalities.input from raw.input_modalities", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const block = buildStaticProviderEntry(
    [MODEL_CLAUDE, MODEL_GEMINI],
    [],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );
  const claude = block.models["claude-sonnet-4-6"];
  assert.deepEqual(claude.modalities?.input, ["text", "image"]);
  assert.deepEqual(claude.modalities?.output, ["text"]);
});

test("buildStaticProviderEntry: never emits limit.input (OC SDK rejects it)", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const block = buildStaticProviderEntry(
    [MODEL_CLAUDE],
    [],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );
  const claude = block.models["claude-sonnet-4-6"];
  assert.equal((claude.limit as Record<string, unknown>).input, undefined);
  assert.equal(typeof claude.limit?.context, "number");
  assert.equal(typeof claude.limit?.output, "number");
});

test("buildStaticProviderEntry: emits cost when enrichment carries pricing", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const enrichment = new Map([
    [
      "claude-sonnet-4-6",
      {
        name: "Claude Sonnet 4.6",
        providerAlias: "cc",
        providerCanonical: "claude",
        providerDisplayName: "Claude",
        pricing: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
      },
    ],
  ]);
  const block = buildStaticProviderEntry(
    [MODEL_CLAUDE],
    [],
    resolved,
    "https://or.example/v1",
    "sk-test",
    enrichment
  );
  const claude = block.models["claude-sonnet-4-6"];
  assert.equal(claude.cost?.input, 3);
  assert.equal(claude.cost?.output, 15);
  assert.equal(claude.cost?.cache_read, 0.3);
  assert.equal(claude.cost?.cache_write, 3.75);
});

test("buildStaticProviderEntry: emits release_date when raw carries it; omits when null", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const withDate: OmniRouteRawModelEntry = {
    ...MODEL_CLAUDE,
    id: "claude-with-date",
    release_date: "2026-02-19",
  };
  const block = buildStaticProviderEntry(
    [withDate, MODEL_GEMINI],
    [],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );
  assert.equal(block.models["claude-with-date"].release_date, "2026-02-19");
  assert.equal(block.models["gemini-3-flash"].release_date, undefined);
});

test("buildStaticProviderEntry: combo modalities = intersection of members (LCD)", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const TEXT_ONLY: OmniRouteRawModelEntry = {
    id: "text-only",
    capabilities: { tool_calling: true, reasoning: false, vision: false, thinking: false },
    context_length: 100_000,
    max_output_tokens: 4_096,
    input_modalities: ["text"],
    output_modalities: ["text"],
  };
  const block = buildStaticProviderEntry(
    [MODEL_CLAUDE, TEXT_ONLY],
    [
      {
        id: "combo-mixed",
        name: "Mixed Tier",
        models: [
          { id: "s1", kind: "model", model: "claude-sonnet-4-6", weight: 100 },
          { id: "s2", kind: "model", model: "text-only", weight: 50 },
        ],
      },
    ],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );
  const combo = block.models["mixed-tier"];
  assert.ok(combo, "combo emitted under slug key");
  // claude has text+image, text-only has text → intersection drops image.
  assert.deepEqual(combo.modalities?.input, ["text"]);
  assert.deepEqual(combo.modalities?.output, ["text"]);
});

// ────────────────────────────────────────────────────────────────────────────
// Integration: OmniRoutePlugin factory now exposes config hook
// ────────────────────────────────────────────────────────────────────────────

test("OmniRoutePlugin factory exposes config hook alongside auth + provider", async () => {
  const hooks = await OmniRoutePlugin({} as never, { providerId: "omniroute" });
  assert.equal(typeof hooks.config, "function", "config hook present");
  assert.ok(hooks.auth, "auth hook present");
  assert.ok(hooks.provider, "provider hook present");
});

// ────────────────────────────────────────────────────────────────────────────
// Edge cases / robustness
// ────────────────────────────────────────────────────────────────────────────

test("config: auth.json entry of wrong type (oauth) → no-op", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "oauth", refresh: "r", access: "a", expires: 0 },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.deepEqual((input as { provider: Record<string, unknown> }).provider, {});
  assert.equal(fetcher.callCount(), 0);
});

test("config: readAuthJson throws → treat as missing file (silent fallback)", async () => {
  const readAuthJson = throwingReadAuthJson();
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  assert.deepEqual((input as { provider: Record<string, unknown> }).provider, {});
  assert.equal(readAuthJson.callCount(), 1);
  assert.equal(fetcher.callCount(), 0);
});

test("config: initialises input.provider when undefined", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, logger }
  );
  // input with NO provider field at all
  const input = {} as Config;
  await hook(input);
  const provider = (input as { provider?: Record<string, unknown> }).provider;
  assert.ok(provider, "provider bag initialised");
  assert.ok(provider!.omniroute);
});

// ────────────────────────────────────────────────────────────────────────────
// Enrichment overlay — eager fetch on config-hook so OC ≤1.15.5 TUI sees
// human display names instead of raw provider/model ids.
// ────────────────────────────────────────────────────────────────────────────

test("config: enrichment fetched + name overlaid on raw-model entries", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE, MODEL_GEMINI]);
  const combosFetcher = stubCombosFetcher([COMBO_CLAUDE_TIER]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6" }],
      ["gemini-3-flash", { name: "Gemini 3 Flash" }],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry);
  assert.equal(entry.models["claude-sonnet-4-6"].name, "Claude Sonnet 4.6");
  assert.equal(entry.models["gemini-3-flash"].name, "Gemini 3 Flash");
  // Combo names still come from /api/combos — enrichment overlay does NOT touch combos.
  assert.equal(entry.models["claude-tier"].name, "Claude Tier");
  assert.equal(enrichmentFetcher.callCount(), 1);
});

test("config: features.enrichment=false skips enrichment fetch + keeps raw-id names", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6" }],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", features: { enrichment: false } },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry);
  assert.equal(enrichmentFetcher.callCount(), 0, "enrichment fetch suppressed by feature flag");
  assert.equal(entry.models["claude-sonnet-4-6"].name, "claude-sonnet-4-6", "raw id retained");
});

test("config: enrichment fetcher throws → soft-fail (warn + raw-id static catalog)", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const enrichmentFetcher = throwingEnrichmentFetcher();
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry, "static block still published on enrichment failure");
  assert.equal(entry.models["claude-sonnet-4-6"].name, "claude-sonnet-4-6", "raw id retained");
  assert.equal(enrichmentFetcher.callCount(), 1);
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("/api/pricing/models fetch failed")),
    "enrichment-fetch breadcrumb emitted"
  );
});

function stubProvidersFetcher(payload: OmniRouteProviderConnection[]): OmniRouteProvidersFetcher & {
  callCount: () => number;
} {
  let n = 0;
  const f: OmniRouteProvidersFetcher = async () => {
    n++;
    return payload;
  };
  return Object.assign(f, { callCount: () => n });
}

function throwingProvidersFetcher(): OmniRouteProvidersFetcher & { callCount: () => number } {
  let n = 0;
  const f: OmniRouteProvidersFetcher = async () => {
    n++;
    throw new Error("ETIMEDOUT");
  };
  return Object.assign(f, { callCount: () => n });
}

const MODEL_CC_OPUS: OmniRouteRawModelEntry = {
  id: "cc/claude-opus-4-7",
  capabilities: { tool_calling: true, reasoning: true, temperature: true },
  context_length: 200_000,
};
const MODEL_NV_LLAMA: OmniRouteRawModelEntry = {
  id: "nvidia/llama-3-70b",
  capabilities: { tool_calling: true, temperature: true },
  context_length: 128_000,
};

test("config: usableOnly=false → no filter (existing behavior)", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CC_OPUS, MODEL_NV_LLAMA]);
  const combosFetcher = stubCombosFetcher([]);
  const providersFetcher = stubProvidersFetcher([
    { id: "c1", provider: "claude", isActive: true, testStatus: "active" },
  ]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["cc/claude-opus-4-7", { name: "Claude Opus 4.7" }],
      ["nvidia/llama-3-70b", { name: "Llama 3 70B" }],
    ])
  );

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1" },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, providersFetcher }
  );

  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry.models["cc/claude-opus-4-7"], "claude kept");
  assert.ok(entry.models["nvidia/llama-3-70b"], "nvidia kept (filter off)");
  assert.equal(providersFetcher.callCount(), 0, "providers fetch not called when feature off");
});

test("config: usableOnly=true → drops models for non-usable providers, keeps usable + unknown", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([
    MODEL_CC_OPUS,
    MODEL_NV_LLAMA,
    // Unknown prefix not in pricing-models nor connections — must pass through.
    {
      id: "agentrouter/synthetic-1",
      capabilities: { temperature: true },
      context_length: 100_000,
    },
  ]);
  const combosFetcher = stubCombosFetcher([]);
  const providersFetcher = stubProvidersFetcher([
    // Claude is usable.
    { id: "c1", provider: "claude", isActive: true, testStatus: "active" },
    // Nvidia provisioned but errored → not usable.
    { id: "c2", provider: "nvidia", isActive: true, testStatus: "error" },
  ]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      [
        "cc/claude-opus-4-7",
        { name: "Claude Opus 4.7", providerAlias: "cc", providerCanonical: "claude" },
      ],
      [
        "nvidia/llama-3-70b",
        { name: "Llama 3 70B", providerAlias: "nvidia", providerCanonical: "nvidia" },
      ],
    ])
  );

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", features: { usableOnly: true } },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, providersFetcher }
  );

  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry.models["cc/claude-opus-4-7"], "claude kept (active)");
  assert.equal(entry.models["nvidia/llama-3-70b"], undefined, "nvidia dropped (error status)");
  assert.ok(entry.models["agentrouter/synthetic-1"], "unknown prefix kept (subtract-filter)");
  assert.equal(providersFetcher.callCount(), 1);
});

test("config: usableOnly=true + providers fetch fails → soft-fail keeps everything", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CC_OPUS, MODEL_NV_LLAMA]);
  const combosFetcher = stubCombosFetcher([]);
  const providersFetcher = throwingProvidersFetcher();
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["cc/claude-opus-4-7", { name: "Claude Opus 4.7" }],
      ["nvidia/llama-3-70b", { name: "Llama 3 70B" }],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", features: { usableOnly: true } },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, providersFetcher, logger }
  );

  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry.models["cc/claude-opus-4-7"]);
  assert.ok(entry.models["nvidia/llama-3-70b"], "soft-fail keeps both");
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("/api/providers fetch failed")),
    "providers-fetch breadcrumb emitted"
  );
});

test("config: diskCache hydrates stale snapshot when /v1/models throws", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = throwingModelsFetcher();
  const combosFetcher = stubCombosFetcher([]);
  const logger = captureWarn();

  // Disk reader returns a stale snapshot — emulates the last-known-good
  // catalog written on a healthy refresh.
  const diskSnapshotReader: typeof import("../src/index.js").defaultDiskSnapshotReader =
    async () => ({
      rawModels: [MODEL_CLAUDE],
      rawCombos: [],
      rawEnrichment: new Map([["claude-sonnet-4-6", { name: "Claude Sonnet 4.6 (cached)" }]]),
      rawCompressionCombos: [],
      rawConnections: [],
    });
  let writes = 0;
  const diskSnapshotWriter: typeof import("../src/index.js").defaultDiskSnapshotWriter =
    async () => {
      writes++;
    };

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", features: { diskCache: true } },
    {
      readAuthJson,
      fetcher,
      combosFetcher,
      diskSnapshotReader,
      diskSnapshotWriter,
      logger,
    }
  );

  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry.models["claude-sonnet-4-6"], "stale snapshot hydrated into static block");
  assert.equal(
    entry.models["claude-sonnet-4-6"].name,
    "Claude Sonnet 4.6 (cached)",
    "stale enrichment also reused"
  );
  assert.equal(writes, 0, "disk write skipped when live fetch failed");
  assert.ok(
    logger.entries.some((e) => String(e[0]).includes("using stale disk cache")),
    "disk-cache hydration breadcrumb emitted"
  );
});

test("config: cached rawEnrichment from earlier provider hook is reused (no refetch)", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-shared", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6" }],
    ])
  );
  const sharedCache: OmniRouteFetchCache = new Map();
  const logger = captureWarn();

  const providerHook = createOmniRouteProviderHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", modelCacheTtl: 60_000 },
    { fetcher, combosFetcher, enrichmentFetcher, cache: sharedCache }
  );
  const configHook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example/v1", modelCacheTtl: 60_000 },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, cache: sharedCache, logger }
  );

  // Provider hook fires first (e.g. eager cache warm-up), populates rawEnrichment.
  await providerHook.models!({} as never, {
    auth: { type: "api", key: "sk-shared" } as never,
  });
  assert.equal(enrichmentFetcher.callCount(), 1);

  // Config hook then fires — must reuse cached enrichment, not refetch.
  const input = makeInput();
  await configHook(input);
  assert.equal(enrichmentFetcher.callCount(), 1, "config reused cached enrichment");

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entry.models["claude-sonnet-4-6"].name, "Claude Sonnet 4.6");
});

// ─────────────────────────────────────────────────────────────────────
// Provider-tag suffix (Option E) — append upstream provider label to
// enriched model names so the picker can differentiate `cc/claude-opus-4-7`
// (Anthropic) from `kr/claude-opus-4-7` (Kiro) etc.
// ─────────────────────────────────────────────────────────────────────

test("config: providerTag (default-on) prepends '<provider> - ' to enriched raw-model names", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE, MODEL_GEMINI]);
  const combosFetcher = stubCombosFetcher([COMBO_CLAUDE_TIER]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      [
        "claude-sonnet-4-6",
        {
          name: "Claude Sonnet 4.6",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
        },
      ],
      [
        "gemini-3-flash",
        {
          name: "Gemini 3 Flash",
          providerAlias: "gemini-cli",
          providerCanonical: "gemini-cli",
          providerDisplayName: "Gemini-cli",
        },
      ],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.ok(entry);
  assert.equal(entry.models["claude-sonnet-4-6"].name, "Claude - Claude Sonnet 4.6");
  assert.equal(entry.models["gemini-3-flash"].name, "Gemini-cli - Gemini 3 Flash");
  // Combos stay untouched — `Combo: ` prefix already conveys multi-upstream.
  assert.equal(entry.models["claude-tier"].name, "Claude Tier");
});

test("config: providerTag=false suppresses the suffix", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6", providerDisplayName: "Claude" }],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", features: { providerTag: false } },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(
    entry.models["claude-sonnet-4-6"].name,
    "Claude Sonnet 4.6",
    "enriched name kept, provider tag suppressed"
  );
});

test("config: providerTag falls back to UPPER(alias) when providerDisplayName missing", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  // Enrichment has the friendly name but NO providerDisplayName — e.g.
  // a slot OmniRoute hasn't curated a human label for yet. We still
  // have the alias though, so the prefix uses UPPER(alias) = "CC".
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6", providerAlias: "cc" }],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entry.models["claude-sonnet-4-6"].name, "CC - Claude Sonnet 4.6");
});

test("config: providerTag skipped entirely when neither providerDisplayName nor providerAlias set", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  // No metadata at all — defensive case, e.g. legacy enrichment payload.
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6" }],
    ])
  );
  const logger = captureWarn();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, logger }
  );
  const input = makeInput();
  await hook(input);

  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entry.models["claude-sonnet-4-6"].name, "Claude Sonnet 4.6");
});

test("config: providerTag is idempotent — second hook call doesn't double-suffix", async () => {
  const readAuthJson = stubReadAuthJson({
    omniroute: { type: "api", key: "sk-test", baseURL: "https://or.example/v1" },
  });
  const fetcher = stubModelsFetcher([MODEL_CLAUDE]);
  const combosFetcher = stubCombosFetcher([]);
  const enrichmentFetcher = stubEnrichmentFetcher(
    new Map<string, OmniRouteEnrichmentEntry>([
      ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6", providerDisplayName: "Claude" }],
    ])
  );
  const logger = captureWarn();
  const sharedCache = new Map();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", modelCacheTtl: 60_000 },
    { readAuthJson, fetcher, combosFetcher, enrichmentFetcher, cache: sharedCache, logger }
  );

  const inputA = makeInput();
  await hook(inputA);
  const entryA = (inputA as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entryA.models["claude-sonnet-4-6"].name, "Claude - Claude Sonnet 4.6");

  // Second invocation (cache hit) — name must still be single-suffixed.
  const inputB = makeInput();
  await hook(inputB);
  const entryB = (inputB as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider
    .omniroute;
  assert.equal(entryB.models["claude-sonnet-4-6"].name, "Claude - Claude Sonnet 4.6");
});

// ────────────────────────────────────────────────────────────────────────────
// T-NN: nested combo-ref resolution in the static catalog
// (mirrors the dynamic-catalog fix in combos.test.ts)
// ────────────────────────────────────────────────────────────────────────────

test("buildStaticProviderEntry: nested combo-ref context is the bottleneck across the graph", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const rawModels: OmniRouteRawModelEntry[] = [
    {
      id: "raw-big",
      context_length: 200_000,
      max_output_tokens: 64_000,
      capabilities: { tool_calling: true, reasoning: true, vision: false, temperature: true },
      input_modalities: ["text"],
      output_modalities: ["text"],
    },
    {
      id: "raw-tiny",
      context_length: 8_000,
      max_output_tokens: 4_000,
      capabilities: { tool_calling: false, reasoning: false, vision: false, temperature: true },
      input_modalities: ["text"],
      output_modalities: ["text"],
    },
  ];
  const rawCombos: OmniRouteRawCombo[] = [
    {
      id: "tiny-combo",
      name: "TinyCombo",
      models: [{ id: "m1", kind: "model", model: "raw-tiny", weight: 100 }],
    },
    {
      id: "parent",
      name: "Parent",
      models: [
        { id: "p1", kind: "model", model: "raw-big", weight: 50 },
        { id: "p2", kind: "combo-ref", comboName: "TinyCombo", weight: 50 },
      ],
    },
  ];
  const block = buildStaticProviderEntry(
    rawModels,
    rawCombos,
    resolved,
    "https://or.example/v1",
    "sk-test"
  );
  // Pre-fix: Parent would advertise 200_000 (only raw-big counted).
  // Post-fix: Parent should advertise 8_000 (TinyCombo bottleneck).
  const parent = block.models["parent"];
  assert.ok(parent, "Parent combo must be in the static catalog");
  assert.equal(parent.limit?.context, 8_000);
});
