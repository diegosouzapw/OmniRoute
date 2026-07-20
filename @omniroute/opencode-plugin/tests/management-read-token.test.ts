import test from "node:test";
import assert from "node:assert/strict";

import {
  createOmniRouteAuthHook,
  createOmniRouteConfigHook,
  createOmniRouteProviderHook,
  parseOmniRoutePluginOptions,
  type OmniRouteCompressionMetaFetcher,
  type OmniRouteEnrichmentFetcher,
  type OmniRouteProvidersFetcher,
  type OmniRouteRawModelEntry,
} from "../src/index.js";

const BASE_URL = "https://or.example.com/v1";
const API_KEY = "sk-inference-only";
const MANAGEMENT_READ_TOKEN = "sk-management-read-only";

const RAW_MODELS: OmniRouteRawModelEntry[] = [
  {
    id: "openai/gpt-test",
    context_length: 16_000,
    max_output_tokens: 4_000,
    capabilities: {
      tool_calling: true,
      reasoning: false,
      vision: false,
      thinking: false,
      temperature: true,
    },
    input_modalities: ["text"],
    output_modalities: ["text"],
  },
];

function apiAuth(key: string) {
  return { type: "api" as const, key };
}

test("options: managementReadToken is accepted and preserved", () => {
  const parsed = parseOmniRoutePluginOptions({ managementReadToken: MANAGEMENT_READ_TOKEN });
  assert.equal(parsed.managementReadToken, MANAGEMENT_READ_TOKEN);
});

test("provider hook: management GET fetchers use managementReadToken while /v1 uses apiKey", async () => {
  const calls: Array<[string, string]> = [];
  const enrichmentFetcher: OmniRouteEnrichmentFetcher = async (_baseURL, token) => {
    calls.push(["pricing", token]);
    return new Map();
  };
  const compressionMetaFetcher: OmniRouteCompressionMetaFetcher = async (_baseURL, token) => {
    calls.push(["context", token]);
    return [];
  };
  const providersFetcher: OmniRouteProvidersFetcher = async (_baseURL, token) => {
    calls.push(["providers", token]);
    return [];
  };

  const hook = createOmniRouteProviderHook(
    {
      baseURL: BASE_URL,
      managementReadToken: MANAGEMENT_READ_TOKEN,
      features: { compressionMetadata: true, usableOnly: true },
    },
    {
      fetcher: async (_baseURL, token) => {
        calls.push(["models", token]);
        return RAW_MODELS;
      },
      combosFetcher: async (_baseURL, token) => {
        calls.push(["combos", token]);
        return [];
      },
      autoCombosFetcher: async (_baseURL, token) => {
        calls.push(["auto-combos", token]);
        return [];
      },
      enrichmentFetcher,
      compressionMetaFetcher,
      providersFetcher,
    }
  );

  await hook.models!({} as never, { auth: apiAuth(API_KEY) as never });

  assert.deepEqual(calls, [
    ["models", API_KEY],
    ["combos", MANAGEMENT_READ_TOKEN],
    ["auto-combos", MANAGEMENT_READ_TOKEN],
    ["pricing", MANAGEMENT_READ_TOKEN],
    ["context", MANAGEMENT_READ_TOKEN],
    ["providers", MANAGEMENT_READ_TOKEN],
  ]);
});

test("provider hook: absent managementReadToken preserves apiKey fallback", async () => {
  const calls: Array<[string, string]> = [];
  const hook = createOmniRouteProviderHook(
    { baseURL: BASE_URL, features: { enrichment: false, autoCombos: false } },
    {
      fetcher: async (_baseURL, token) => {
        calls.push(["models", token]);
        return RAW_MODELS;
      },
      combosFetcher: async (_baseURL, token) => {
        calls.push(["combos", token]);
        return [];
      },
    }
  );

  await hook.models!({} as never, { auth: apiAuth(API_KEY) as never });

  assert.deepEqual(calls, [
    ["models", API_KEY],
    ["combos", API_KEY],
  ]);
});

test("config hook: managementReadToken stays out of provider inference and MCP config", async () => {
  const calls: Array<[string, string]> = [];
  const hook = createOmniRouteConfigHook(
    {
      baseURL: BASE_URL,
      managementReadToken: MANAGEMENT_READ_TOKEN,
      features: { enrichment: false, autoCombos: false, diskCache: false, mcpAutoEmit: true },
    },
    {
      readAuthJson: async () => ({
        "opencode-omniroute": { type: "api" as const, key: API_KEY },
      }),
      fetcher: async (_baseURL, token) => {
        calls.push(["models", token]);
        return RAW_MODELS;
      },
      combosFetcher: async (_baseURL, token) => {
        calls.push(["combos", token]);
        return [];
      },
      logger: { warn: () => {} },
    }
  );
  const input: { provider?: Record<string, any>; mcp?: Record<string, any> } = {};

  await hook(input as never);

  assert.deepEqual(calls, [
    ["models", API_KEY],
    ["combos", MANAGEMENT_READ_TOKEN],
  ]);
  assert.equal(input.provider?.["opencode-omniroute"]?.options?.apiKey, API_KEY);
  assert.equal(
    input.mcp?.["opencode-omniroute"]?.headers?.Authorization,
    `Bearer ${API_KEY}`,
    "mcpAutoEmit remains independent of managementReadToken"
  );
});

test("auth fetch: /v1 keeps apiKey and neither token leaks cross-origin", async () => {
  const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ input, init });
    return new Response("ok");
  }) as typeof fetch;

  try {
    const hook = createOmniRouteAuthHook({
      baseURL: BASE_URL,
      managementReadToken: MANAGEMENT_READ_TOKEN,
    });
    const loaded = await hook.loader!(async () => apiAuth(API_KEY) as never, {} as never);
    const interceptedFetch = (loaded as { fetch: typeof fetch }).fetch;

    await interceptedFetch(`${BASE_URL}/chat/completions`, { method: "POST", body: "{}" });
    await interceptedFetch("https://third-party.example/v1/chat/completions", {
      method: "POST",
      body: "{}",
    });

    const sameOriginHeaders = new Headers(calls[0]?.init?.headers);
    const crossOriginHeaders = new Headers(calls[1]?.init?.headers);
    assert.equal(sameOriginHeaders.get("Authorization"), `Bearer ${API_KEY}`);
    assert.equal(crossOriginHeaders.get("Authorization"), null);
    assert.equal(
      calls.some(({ init }) =>
        [...new Headers(init?.headers).values()].some((value) =>
          value.includes(MANAGEMENT_READ_TOKEN)
        )
      ),
      false,
      "managementReadToken must never enter inference fetch headers"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
