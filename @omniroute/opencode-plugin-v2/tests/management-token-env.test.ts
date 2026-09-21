import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import plugin from "../src/index.js";
import { publishCatalog } from "../src/catalog.js";
import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";

const MODELS_URL = "https://gw.example.com/v1/models";
const COMBOS_URL = "https://gw.example.com/api/combos";
const PRICING_MODELS_URL = "https://gw.example.com/api/pricing/models";

const MGMT_ENV_VAR = "OMNIROUTE_MANAGEMENT_API_KEY";
const INFERENCE_ENV_VAR = "OMNIROUTE_API_KEY";

function okJson(body: unknown) {
  return { ok: true, status: 200, statusText: "OK", json: async () => body };
}

interface Harness {
  seen: Map<string, string>;
  warns: string[];
  restore: () => void;
}

function installHarness(combos: unknown[]): Harness {
  const seen = new Map<string, string>();
  const warns: string[] = [];
  const origFetch = globalThis.fetch;
  const origWarn = console.warn;
  const origLog = console.log;
  const origError = console.error;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  console.log = () => {};
  console.error = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  globalThis.fetch = (async (url: unknown, init?: { headers?: Record<string, string> }) => {
    const href = String(url);
    seen.set(href, String(init?.headers?.Authorization ?? ""));
    if (href.includes("/api/combos/auto")) return okJson({ combos: [] });
    if (href.includes("/api/pricing/models")) {
      return okJson({
        providers: {
          demo: {
            id: "demo",
            name: "Demo",
            models: [{ id: "team-combo", name: "Team Combo" }],
          },
        },
      });
    }
    if (href.includes("/api/pricing")) return okJson({});
    if (href.includes("/api/free-tier/summary")) return okJson({ perModel: [] });
    if (href.includes("/api/combos")) return okJson({ combos });
    return okJson({ data: [{ id: "m1" }] });
  }) as typeof fetch;
  return {
    seen,
    warns,
    restore() {
      globalThis.fetch = origFetch;
      console.warn = origWarn;
      console.log = origLog;
      console.error = origError;
    },
  };
}

async function withIsolatedEnv<T>(
  mgmt: string | undefined,
  inference: string | undefined,
  fn: () => Promise<T>
): Promise<T> {
  const prevMgmt = process.env[MGMT_ENV_VAR];
  const prevInference = process.env[INFERENCE_ENV_VAR];
  // Like tests/management-token.test.ts:176-180: a fresh OPENCODE_DATA_DIR
  // per case keeps the real disk snapshot out of the run, so a filtered 'it'
  // never gets a warm snapshot served without fetch.
  const prevDataDir = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-mgmt-env-"));
  if (mgmt === undefined) delete process.env[MGMT_ENV_VAR];
  else process.env[MGMT_ENV_VAR] = mgmt;
  if (inference === undefined) delete process.env[INFERENCE_ENV_VAR];
  else process.env[INFERENCE_ENV_VAR] = inference;
  try {
    return await fn();
  } finally {
    if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = prevDataDir;
    if (prevMgmt === undefined) delete process.env[MGMT_ENV_VAR];
    else process.env[MGMT_ENV_VAR] = prevMgmt;
    if (prevInference === undefined) delete process.env[INFERENCE_ENV_VAR];
    else process.env[INFERENCE_ENV_VAR] = prevInference;
  }
}

function setupHarness(options: Record<string, unknown>) {
  const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
  const ctx = {
    options,
    catalog: {
      transform: (cb: (draft: unknown) => Promise<void>) => {
        catalogCallbacks.push(cb);
        return Promise.resolve({ dispose: async () => {} });
      },
    },
    integration: {
      transform: () => Promise.resolve({ dispose: async () => {} }),
    },
  };
  return { catalogCallbacks, ctx };
}

function stubDraft() {
  const published = new Map<string, Record<string, unknown>>();
  const draft = {
    provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
    model: {
      update: (pid: string, mid: string, fn: (m: Record<string, unknown>) => void) => {
        const key = pid + "/" + mid;
        let entry = published.get(key);
        if (entry === undefined) {
          entry = { id: mid, providerID: pid };
          published.set(key, entry);
        }
        fn(entry);
      },
    },
  };
  return { draft, published };
}

function fallbackWarns(warns: string[]): string[] {
  return warns.filter((w) => w.includes("managementReadToken"));
}

async function runSetup(ctx: unknown): Promise<void> {
  await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
}

describe("plugin-v2 management token environment source", () => {
  it("uses the managementReadToken option for /api/* while models keep apiKey", async () => {
    await withIsolatedEnv(undefined, undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
          managementReadToken: "mgmt-option-token",
        });
        await runSetup(ctx);
        assert.deepEqual(fallbackWarns(h.warns), []);
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer mgmt-option-token");
        assert.equal(h.seen.get(MODELS_URL), "Bearer chat-key");
      } finally {
        h.restore();
      }
    });
  });

  it("reads the management token from the environment when the option is absent", async () => {
    await withIsolatedEnv("mgmt-env-token", undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
        });
        await runSetup(ctx);
        assert.deepEqual(fallbackWarns(h.warns), []);
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer mgmt-env-token");
        assert.equal(h.seen.get(MODELS_URL), "Bearer chat-key");
      } finally {
        h.restore();
      }
    });
  });

  it("prefers the option over the environment", async () => {
    await withIsolatedEnv("mgmt-env-token", undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
          managementReadToken: "mgmt-option-token",
        });
        await runSetup(ctx);
        assert.deepEqual(fallbackWarns(h.warns), []);
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer mgmt-option-token");
      } finally {
        h.restore();
      }
    });
  });

  it("falls back to the inference key with a single early warning when neither is set", async () => {
    await withIsolatedEnv(undefined, undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
        });
        await runSetup(ctx);
        const atSetup = fallbackWarns(h.warns);
        assert.equal(
          atSetup.length,
          1,
          `expected exactly one early fallback warning, got: ${JSON.stringify(h.warns)}`
        );
        assert.match(atSetup[0] ?? "", /managementReadToken/);
        assert.match(atSetup[0] ?? "", new RegExp(MGMT_ENV_VAR));
        assert.ok(!(atSetup[0] ?? "").includes("chat-key"), "warning must not leak the key");
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer chat-key");
        assert.equal(
          fallbackWarns(h.warns).length,
          1,
          "the fallback warning stays a single setup-time notice"
        );
      } finally {
        h.restore();
      }
    });
  });

  it("treats an empty option as absent so the environment wins", async () => {
    await withIsolatedEnv("mgmt-env-token", undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
          managementReadToken: "",
        });
        await runSetup(ctx);
        assert.deepEqual(fallbackWarns(h.warns), []);
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer mgmt-env-token");
      } finally {
        h.restore();
      }
    });
  });

  it("treats an empty environment value as absent so the option wins", async () => {
    await withIsolatedEnv("", undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
          managementReadToken: "mgmt-option-token",
        });
        await runSetup(ctx);
        assert.deepEqual(fallbackWarns(h.warns), []);
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer mgmt-option-token");
      } finally {
        h.restore();
      }
    });
  });

  it("falls back with a warning when both the option and the environment are empty", async () => {
    await withIsolatedEnv("", undefined, async () => {
      const h = installHarness([]);
      try {
        const { catalogCallbacks, ctx } = setupHarness({
          baseURL: "https://gw.example.com",
          providerId: "omniroute",
          apiKey: "chat-key",
          managementReadToken: "",
        });
        await runSetup(ctx);
        assert.equal(fallbackWarns(h.warns).length, 1);
        const { draft } = stubDraft();
        await catalogCallbacks[0](draft);
        assert.equal(h.seen.get(COMBOS_URL), "Bearer chat-key");
      } finally {
        h.restore();
      }
    });
  });

  it("enriches the catalog from the environment token alone", async () => {
    const providers = new Map<string, ProviderV2Info>();
    const models = new Map<string, ModelV2Info>();
    const draft = {
      provider: {
        list: () => [],
        get: (id: string) => providers.get(id) as never,
        update: (id: string, fn: (p: ProviderV2Info) => void) => {
          const p = (providers.get(id) ?? { id }) as ProviderV2Info;
          fn(p);
          providers.set(id, p);
        },
        remove: () => {},
      },
      model: {
        get: () => undefined,
        update: (pid: string, mid: string, fn: (m: ModelV2Info) => void) => {
          const k = pid + "/" + mid;
          const m = (models.get(k) ?? { id: mid, providerID: pid }) as ModelV2Info;
          fn(m);
          models.set(k, m);
        },
        remove: () => {},
        default: { get: () => undefined, set: () => {} },
      },
    } as unknown as CatalogDraft;
    let seenCombos = "";
    let seenPricing = "";
    const res = await withIsolatedEnv("mgmt-env-token", undefined, async () =>
      publishCatalog(
        draft,
        {
          providerId: "omniroute",
          baseURL: "https://gw.example.com",
          apiKey: "chat-key",
          managementReadToken: process.env[MGMT_ENV_VAR],
          timeoutMs: 1000,
          modelCacheTtlMs: 300000,
          usableOnly: false,
        },
        {
          fetcher: async () => [{ id: "m1" }],
          combosFetcher: async (_base, token) => {
            seenCombos = token;
            return [{ id: "team-combo", models: [{ kind: "model", model: "m1" }] }];
          },
          enrichmentFetcher: async (_base, token) => {
            seenPricing = token;
            // The process env is the source under test: the resolver output
            // flows in through the option above, so report success only when
            // the flow under test actually carried it.
            if (token !== "mgmt-env-token") return new Map();
            return new Map([["team-combo", { name: "Team Combo" }]]);
          },
        }
      )
    );
    assert.deepEqual(res, { models: 1, combos: 1, autoCombos: 0 });
    assert.equal(seenCombos, "mgmt-env-token");
    assert.equal(seenPricing, "mgmt-env-token");
    const entry = models.get("omniroute/team-combo");
    assert.ok(entry, "expected the combo entry in the published catalog");
    assert.equal(entry?.name, "Team Combo");
  });
});
