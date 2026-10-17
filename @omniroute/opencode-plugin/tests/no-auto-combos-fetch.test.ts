/**
 * The v1 plugin never fetches `/api/combos/auto` on catalog refresh.
 *
 * The gateway already serves the `auto/*` entries through `/v1/models` with
 * server-computed limits and modalities; a second fetch of the retired
 * endpoint only maintained a conflicting copy of the same entries. These
 * tests pin the removal across every refresh path (force-sync, provider
 * hook, config hook): no request may target the retired endpoint, served
 * `auto/*` entries are published as-is, the `features.autoCombos` key stays
 * accepted but has no effect, a legacy disk snapshot carrying the retired
 * field loads without error and is never republished, and startup
 * diagnostics never mention the retired source.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Config } from "@opencode-ai/plugin";

import {
  buildStaticProviderEntry,
  createOmniRouteConfigHook,
  createOmniRouteProviderHook,
  forceSyncOmniRouteModels,
  resolveOmniRoutePluginOptions,
  _resetInflightRefresh,
} from "../src/index.js";
import type {
  OmniRouteFetchCache,
  OmniRouteRawModelEntry,
  OmniRouteStaticProviderEntry,
} from "../src/index.js";

test.beforeEach(() => {
  _resetInflightRefresh();
});

/** Pass DI deps through without static typing so this file compiles both
 *  before and after the retired fetcher leaves the deps contract. */
function looseDeps(deps: Record<string, unknown>): never {
  return deps as never;
}

const SERVED_AUTO: OmniRouteRawModelEntry = {
  id: "auto/coding",
  capabilities: {
    tool_calling: true,
    reasoning: true,
    vision: false,
    thinking: false,
    temperature: true,
  },
  context_length: 500_000,
  max_output_tokens: 32_000,
  input_modalities: ["text"],
  output_modalities: ["text"],
};

const PLAIN_MODEL: OmniRouteRawModelEntry = {
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
  input_modalities: ["text", "image"],
  output_modalities: ["text"],
};

function stubAuth() {
  return async () => ({
    "opencode-omniroute": {
      type: "api",
      key: "sk-test",
      baseURL: "https://or.example.com/v1",
    },
  });
}

/** Runs `run` with the global fetch instrumented; returns every requested URL. */
async function captureFetchUrls(run: () => Promise<void>): Promise<string[]> {
  const urls: string[] = [];
  const originalFetch = globalThis.fetch;
  (globalThis as { fetch: unknown }).fetch = (async (input: unknown) => {
    urls.push(String(typeof input === "string" ? input : (input as URL).toString()));
    throw new Error("network disabled in test");
  }) as typeof fetch;
  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
  return urls;
}

function retiredUrls(urls: string[]): string[] {
  return urls.filter((url) => url.includes("/api/combos/auto"));
}

function countingStub<T>(payload: T): ((...args: never[]) => Promise<T>) & {
  callCount: () => number;
} {
  let n = 0;
  const f = async (..._args: never[]) => {
    n++;
    return payload;
  };
  return Object.assign(f, { callCount: () => n });
}

test("force-sync never calls the retired fetcher and never requests its URL", async () => {
  const cache: OmniRouteFetchCache = new Map();
  const resolved = resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    baseURL: "https://omniroute.example/v1",
    autoSyncIntervalMs: 0,
    features: { diskCache: false },
  });
  const retiredFetcher = countingStub([]);
  const urls = await captureFetchUrls(async () => {
    await forceSyncOmniRouteModels({
      resolved,
      cache,
      readAuthJson: stubAuth() as never,
      fetcher: async () => [PLAIN_MODEL],
      combosFetcher: async () => [],
      autoCombosFetcher: retiredFetcher,
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => [],
      providersFetcher: async () => [],
    } as never).catch(() => undefined);
  });
  assert.equal(retiredFetcher.callCount(), 0, "retired fetcher must never run on force-sync");
  assert.deepEqual(retiredUrls(urls), [], "no request may target the retired endpoint");
});

test("provider hook never calls the retired fetcher and never requests its URL", async () => {
  const retiredFetcher = countingStub([]);
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1" },
    looseDeps({
      fetcher: async () => [PLAIN_MODEL],
      combosFetcher: async () => [],
      autoCombosFetcher: retiredFetcher,
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => [],
      providersFetcher: async () => [],
    })
  );
  const urls = await captureFetchUrls(async () => {
    await hook.models!({} as never, { auth: { type: "api", key: "sk-x" } as never });
  });
  assert.equal(retiredFetcher.callCount(), 0, "retired fetcher must never run in provider hook");
  assert.deepEqual(retiredUrls(urls), [], "no request may target the retired endpoint");
});

test("config hook never calls the retired fetcher and never requests its URL", async () => {
  const retiredFetcher = countingStub([]);
  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", features: { diskCache: false } },
    looseDeps({
      readAuthJson: stubAuth(),
      fetcher: async () => [PLAIN_MODEL],
      combosFetcher: async () => [],
      autoCombosFetcher: retiredFetcher,
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => [],
      providersFetcher: async () => [],
      logger: { warn: () => {} },
    })
  );
  const urls = await captureFetchUrls(async () => {
    await hook({ provider: {} } as unknown as Config);
  });
  assert.equal(retiredFetcher.callCount(), 0, "retired fetcher must never run in config hook");
  assert.deepEqual(retiredUrls(urls), [], "no request may target the retired endpoint");
});

test("served auto entries are published as-is with server limits", async () => {
  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", features: { diskCache: false } },
    looseDeps({
      readAuthJson: stubAuth(),
      fetcher: async () => [PLAIN_MODEL, SERVED_AUTO],
      combosFetcher: async () => [],
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => [],
      providersFetcher: async () => [],
      logger: { warn: () => {} },
    })
  );
  const input = { provider: {} } as unknown as Config;
  await hook(input);
  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider[
    "opencode-omniroute"
  ];
  assert.ok(entry, "provider entry published");
  const served = entry.models["auto/coding"];
  assert.ok(served, "served auto entry published under its own id");
  assert.equal(served.limit?.context, 500_000, "server context limit kept, not synthesized");
  assert.equal(served.limit?.output, 32_000, "server output limit kept, not synthesized");

  const dynamic = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1" },
    looseDeps({
      fetcher: async () => [SERVED_AUTO],
      combosFetcher: async () => [],
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => [],
      providersFetcher: async () => [],
    })
  );
  const out = await dynamic.models!({} as never, {
    auth: { type: "api", key: "sk-x" } as never,
  });
  const dynamicAuto = out["auto/coding"] as { limit?: { context?: number; output?: number } };
  assert.ok(dynamicAuto, "served auto entry published on the dynamic path");
  assert.equal(dynamicAuto.limit?.context, 500_000);
  assert.equal(dynamicAuto.limit?.output, 32_000);
});

test("features.autoCombos stays accepted but changes nothing", async () => {
  async function catalogWith(autoCombos: boolean): Promise<Record<string, unknown>> {
    const hook = createOmniRouteConfigHook(
      { providerId: "omniroute", features: { autoCombos, diskCache: false } },
      looseDeps({
        readAuthJson: stubAuth(),
        fetcher: async () => [PLAIN_MODEL, SERVED_AUTO],
        combosFetcher: async () => [],
        enrichmentFetcher: async () => new Map(),
        compressionMetaFetcher: async () => [],
        providersFetcher: async () => [],
        logger: { warn: () => {} },
      })
    );
    const input = { provider: {} } as unknown as Config;
    await hook(input);
    const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider[
      "opencode-omniroute"
    ];
    return entry.models as Record<string, unknown>;
  }
  const on = await catalogWith(true);
  const off = await catalogWith(false);
  assert.deepEqual(
    Object.keys(on).sort(),
    Object.keys(off).sort(),
    "the flag no longer changes the catalog"
  );
});

test("legacy snapshot carrying the retired field loads without error and is never republished", async () => {
  const legacySnapshot = {
    rawModels: [PLAIN_MODEL],
    rawCombos: [],
    rawAutoCombos: [
      { id: "auto/coding", name: "Auto Coding", variant: "coding", candidateCount: 5 },
    ],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
  };
  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute" },
    looseDeps({
      readAuthJson: stubAuth(),
      fetcher: async () => [PLAIN_MODEL],
      combosFetcher: async () => [],
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => [],
      providersFetcher: async () => [],
      diskSnapshotReader: async () => legacySnapshot,
      diskSnapshotWriter: async () => {},
      logger: { warn: () => {} },
    })
  );
  const input = { provider: {} } as unknown as Config;
  await hook(input);
  await new Promise((r) => setTimeout(r, 100));
  const entry = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider[
    "opencode-omniroute"
  ];
  assert.ok(entry, "provider entry published from legacy snapshot without error");
  assert.equal(
    entry.models["auto/coding"],
    undefined,
    "retired snapshot field is ignored, never republished"
  );
  assert.ok(entry.models["claude-sonnet-4-6"], "live catalog still published");
});

test("startup diagnostics never mention the retired source", async () => {
  const previous = process.env.OPENCODE_DATA_DIR;
  const dir = await mkdtemp(join(tmpdir(), "omniroute-no-auto-diag-"));
  await mkdir(join(dir, "plugins"), { recursive: true });
  process.env.OPENCODE_DATA_DIR = dir;
  try {
    const hook = createOmniRouteConfigHook(
      {
        providerId: "omniroute",
        features: { diskCache: false, startupDebug: true, autoCombos: true },
      },
      looseDeps({
        readAuthJson: stubAuth(),
        fetcher: async () => [PLAIN_MODEL, SERVED_AUTO],
        combosFetcher: async () => [],
        enrichmentFetcher: async () => new Map(),
        compressionMetaFetcher: async () => [],
        providersFetcher: async () => [],
        logger: { warn: () => {} },
      })
    );
    await hook({ provider: {} } as unknown as Config);
    const body = await readFile(join(dir, "plugins", "omniroute-startup-diagnostics.log"), "utf8");
    assert.equal(
      body.includes("autoCombos"),
      false,
      "diagnostics must not present the retired flag as effective"
    );
    assert.equal(body.includes("auto combos:"), false, "diagnostics must not list retired entries");
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("retired symbols are gone from the module surface", async () => {
  const surface = (await import("../src/index.js")) as unknown as Record<string, unknown>;
  for (const name of ["defaultOmniRouteAutoCombosFetcher", "mapAutoComboToStaticEntry"]) {
    assert.equal(surface[name], undefined, `${name} must be removed from the module surface`);
  }
});

test("raw entries are published under their own ids", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  const block = buildStaticProviderEntry(
    [{ id: "auto/coding" }],
    [],
    resolved,
    "https://or.example.com/v1",
    "sk-test"
  );
  assert.ok(
    (block as OmniRouteStaticProviderEntry).models["auto/coding"],
    "a raw entry served by the gateway is published under its own id"
  );
});
