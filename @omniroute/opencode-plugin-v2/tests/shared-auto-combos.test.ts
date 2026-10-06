import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  defaultOmniRouteAutoCombosFetcher,
  mapAutoComboToModelV2,
} from "../src/shared/auto-combos.js";

// A fetch stub that hangs until the caller aborts: proves the AbortController
// wiring fires. Rejects with an AbortError like undici does on abort.
function hangingFetch(): typeof fetch {
  return ((url: unknown, init?: { signal?: AbortSignal }) => {
    return new Promise((_resolve, reject) => {
      const signal = init?.signal;
      if (signal?.aborted) {
        reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
        return;
      }
      signal?.addEventListener("abort", () => {
        reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
      });
    }) as Promise<Response>;
  }) as unknown as typeof fetch;
}

function stubFetch(res: { status: number; statusText?: string; body?: unknown }): typeof fetch {
  return (async () => ({
    ok: res.status >= 200 && res.status < 300,
    status: res.status,
    statusText: res.statusText ?? (res.status === 404 ? "Not Found" : "Error"),
    json: async () => res.body,
  })) as unknown as typeof fetch;
}

function silenceWarn(): { warns: string[]; restore: () => void } {
  const warns: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  return {
    warns,
    restore() {
      console.warn = origWarn;
    },
  };
}

describe("defaultOmniRouteAutoCombosFetcher", () => {
  it("404 returns [] with a warn (old gateway without the endpoint stays fail-open)", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ status: 404 });
    const guard = silenceWarn();
    try {
      const res = await defaultOmniRouteAutoCombosFetcher("https://gw.example.com", "k", 5000);
      assert.deepEqual(res, []);
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
    assert.ok(
      guard.warns.some((w) => w.includes("/api/combos/auto") && w.includes("404")),
      `expected a 404 warn, got: ${JSON.stringify(guard.warns)}`
    );
  });

  it("500 throws (with warn + token-hint report) so the caller keeps last-known", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ status: 500, statusText: "Internal Server Error" });
    const guard = silenceWarn();
    const reported: string[] = [];
    try {
      await assert.rejects(
        defaultOmniRouteAutoCombosFetcher("https://gw.example.com", "k", 5000, undefined, (e, r) =>
          reported.push(`${e} ${r}`)
        ),
        /HTTP 500/
      );
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
    assert.ok(
      guard.warns.some((w) => w.includes("/api/combos/auto") && w.includes("500")),
      `expected a 500 warn, got: ${JSON.stringify(guard.warns)}`
    );
    assert.ok(
      reported.some((r) => r.includes("/api/combos/auto")),
      `expected a per-endpoint report, got: ${JSON.stringify(reported)}`
    );
  });

  it("a network throw rejects instead of resolving empty", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = hangingFetch();
    const guard = silenceWarn();
    try {
      await assert.rejects(
        defaultOmniRouteAutoCombosFetcher("https://gw.example.com", "k", 20),
        /abort|aborted/i
      );
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
    assert.ok(
      guard.warns.some((w) => w.includes("/api/combos/auto")),
      `expected an abort warn, got: ${JSON.stringify(guard.warns)}`
    );
  });

  it("accepts the {combos:[...]} envelope and filters entries without a string id", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({
      status: 200,
      body: { combos: [{ id: "auto/coding", name: "Auto Coding" }, { name: "no-id" }] },
    });
    const guard = silenceWarn();
    try {
      const res = await defaultOmniRouteAutoCombosFetcher("https://gw.example.com", "k", 5000);
      assert.deepEqual(res, [{ id: "auto/coding", name: "Auto Coding" }]);
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
  });
});

describe("mapAutoComboToModelV2", () => {
  it("falls back to 128k context / 8k output when the server omits limits (never 0)", () => {
    const m = mapAutoComboToModelV2(
      { id: "auto/coding", name: "Auto Coding", variant: "coding" },
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(m.id, "auto/coding");
    assert.equal(m.limit.context, 128_000);
    assert.equal(m.limit.output, 8_192);
    assert.equal(m.capabilities.toolcall, true);
    assert.equal(m.capabilities.reasoning, true);
  });

  it("uses server limits when positive, falls back when zero or negative", () => {
    const served = mapAutoComboToModelV2(
      { id: "auto", name: "Auto", context_length: 200000, max_output_tokens: 16000 },
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(served.limit.context, 200000);
    assert.equal(served.limit.output, 16000);
    const zeroed = mapAutoComboToModelV2(
      { id: "auto", name: "Auto", context_length: 0, max_output_tokens: -1 },
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(zeroed.limit.context, 128_000);
    assert.equal(zeroed.limit.output, 8_192);
  });

  it("defaults the model id to the auto variant key (auto, auto/coding)", () => {
    const def = mapAutoComboToModelV2({ id: "whatever" }, "omniroute", "https://gw.example.com");
    assert.equal(def.id, "auto");
    const coding = mapAutoComboToModelV2(
      { id: "auto/coding", variant: "coding" },
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(coding.id, "auto/coding");
  });

  it("stamps the openai-compatible api block by default", () => {
    const m = mapAutoComboToModelV2(
      { id: "auto", candidateCount: 3 },
      "omniroute",
      "https://gw.example.com"
    );
    assert.deepEqual(m.api, {
      id: "openai-compatible",
      url: "https://gw.example.com/v1",
      npm: "@ai-sdk/openai-compatible",
    });
  });

  it("routes an allowlisted auto id to anthropic (same rule as models)", () => {
    const m = mapAutoComboToModelV2(
      { id: "auto/coding", variant: "coding" },
      "omniroute",
      "https://gw.example.com",
      { allowAnthropic: true, anthropicModels: ["auto/coding"] }
    );
    assert.deepEqual(m.api, {
      id: "anthropic",
      url: "https://gw.example.com",
      npm: "@ai-sdk/anthropic",
    });
  });
});
