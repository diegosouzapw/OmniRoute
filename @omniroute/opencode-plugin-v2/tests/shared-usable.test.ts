import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  defaultOmniRouteProvidersFetcher,
  isUsableCombo,
  isUsableRawModelId,
  usableProviderAliasSet,
} from "../src/shared/usable.js";
import type { OmniRouteEnrichmentMap } from "../src/shared/enrich.js";

function entry(
  alias: string,
  canonical: string
): [string, { providerAlias: string; providerCanonical: string }] {
  return [`${alias}/model-x`, { providerAlias: alias, providerCanonical: canonical }];
}

function enrichmentOf(...pairs: Array<[string, string]>): OmniRouteEnrichmentMap {
  return new Map(pairs.map(([alias, canonical]) => entry(alias, canonical)));
}

function stubFetch(handler: (url: unknown) => unknown): typeof fetch {
  return (async (url: unknown) => handler(url)) as unknown as typeof fetch;
}

describe("defaultOmniRouteProvidersFetcher envelopes", () => {
  it("reads the { connections: [...] } envelope", async () => {
    const origFetch = globalThis.fetch;
    const seen: string[] = [];
    globalThis.fetch = stubFetch((url) => {
      seen.push(String(url));
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({
          connections: [{ id: "c1", provider: "claude", isActive: true, testStatus: "active" }],
        }),
      };
    });
    try {
      const out = await defaultOmniRouteProvidersFetcher("https://gw.example.com/v1/", "k");
      assert.equal(seen[0], "https://gw.example.com/api/providers");
      assert.deepEqual(
        out.map((c) => c.provider),
        ["claude"]
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("reads a bare array envelope", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(() => ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => [{ id: "c1", provider: "gemini", isActive: true, testStatus: "active" }],
    }));
    try {
      const out = await defaultOmniRouteProvidersFetcher("https://gw.example.com", "k");
      assert.deepEqual(
        out.map((c) => c.provider),
        ["gemini"]
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("reads the { data: [...] } envelope", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(() => ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => ({
        data: [{ id: "c1", provider: "kiro", isActive: true, testStatus: "active" }],
      }),
    }));
    try {
      const out = await defaultOmniRouteProvidersFetcher("https://gw.example.com", "k");
      assert.deepEqual(
        out.map((c) => c.provider),
        ["kiro"]
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("throws on non-2xx so the caller keeps last-known instead of unfiltering", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(() => ({
      ok: false,
      status: 500,
      statusText: "Error",
      json: async () => ({}),
    }));
    try {
      await assert.rejects(
        defaultOmniRouteProvidersFetcher("https://gw.example.com", "k"),
        /HTTP 500/
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("throws on network failure so the caller keeps last-known", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(() => {
      throw new Error("down");
    });
    try {
      await assert.rejects(defaultOmniRouteProvidersFetcher("https://gw.example.com", "k"), /down/);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("soft-fails to [] without baseURL or apiKey", async () => {
    assert.deepEqual(await defaultOmniRouteProvidersFetcher("", "k"), []);
    assert.deepEqual(await defaultOmniRouteProvidersFetcher("https://gw.example.com", ""), []);
  });
});

describe("usableProviderAliasSet", () => {
  it("maps usable canonicals to aliases via enrichment", () => {
    const usable = usableProviderAliasSet(
      [{ id: "c1", provider: "claude", isActive: true, testStatus: "active" }],
      enrichmentOf(["cc", "claude"])
    );
    assert.ok(usable.aliases.has("cc"));
    assert.ok(usable.aliases.has("claude"));
    assert.ok(usable.canonicals.has("claude"));
    assert.ok(usable.knownAliases.has("cc"));
  });

  it("ignores inactive or unhealthy connections", () => {
    const usable = usableProviderAliasSet(
      [
        { id: "c1", provider: "claude", isActive: false, testStatus: "active" },
        { id: "c2", provider: "gemini", isActive: true, testStatus: "error" },
      ],
      enrichmentOf(["cc", "claude"], ["gm", "gemini"])
    );
    assert.equal(usable.aliases.size, 0);
    assert.equal(usable.canonicals.size, 0);
    assert.ok(usable.knownAliases.has("cc"));
    assert.ok(usable.knownAliases.has("gm"));
  });

  it("treats a missing toggle as no opinion, not disabled", () => {
    // Older gateways predate the `isActive` field: reading its absence as a
    // veto would hide every model behind a filter the operator never asked
    // to tighten. Only an explicit `false` disables.
    const usable = usableProviderAliasSet(
      [{ id: "c1", provider: "claude", testStatus: "active" }],
      enrichmentOf(["cc", "claude"])
    );
    assert.ok(usable.aliases.has("cc"));
    assert.ok(usable.canonicals.has("claude"));
  });
});

describe("isUsableRawModelId subtract-filter", () => {
  const usable = usableProviderAliasSet(
    [{ id: "c1", provider: "claude", isActive: true, testStatus: "active" }],
    enrichmentOf(["cc", "claude"], ["dead", "legacy"])
  );

  it("keeps ids with a usable alias prefix", () => {
    assert.equal(isUsableRawModelId("cc/claude-opus-4-7", usable), true);
  });

  it("keeps ids with a usable canonical prefix", () => {
    assert.equal(isUsableRawModelId("claude/sonnet-4", usable), true);
  });

  it("keeps ids with an unknown prefix", () => {
    assert.equal(isUsableRawModelId("agentrouter/mystery", usable), true);
  });

  it("drops ids with a known-but-not-provisioned prefix", () => {
    assert.equal(isUsableRawModelId("dead/legacy-model", usable), false);
  });

  it("keeps ids without a prefix", () => {
    assert.equal(isUsableRawModelId("bare-model", usable), true);
  });
});

describe("isUsableCombo", () => {
  const usable = usableProviderAliasSet(
    [{ id: "c1", provider: "claude", isActive: true, testStatus: "active" }],
    enrichmentOf(["cc", "claude"], ["dead", "legacy"])
  );

  it("keeps a combo with one usable member", () => {
    assert.equal(
      isUsableCombo(
        {
          id: "c",
          models: [
            { kind: "model", model: "dead/legacy" },
            { kind: "model", model: "cc/x" },
          ],
        },
        usable
      ),
      true
    );
  });

  it("drops a combo whose members are all known-but-not-provisioned", () => {
    assert.equal(
      isUsableCombo(
        {
          id: "c",
          models: [
            { kind: "model", model: "dead/a" },
            { kind: "model", model: "dead/b" },
          ],
        },
        usable
      ),
      false
    );
  });

  it("keeps a combo with an unknown-prefix member", () => {
    assert.equal(
      isUsableCombo({ id: "c", models: [{ kind: "model", model: "agentrouter/mystery" }] }, usable),
      true
    );
  });

  it("keeps combos with no resolvable members", () => {
    assert.equal(isUsableCombo({ id: "c", models: [] }, usable), true);
    assert.equal(isUsableCombo({ id: "c" }, usable), true);
    assert.equal(
      isUsableCombo({ id: "c", models: [{ kind: "combo-ref", comboName: "nested" }] }, usable),
      true
    );
  });
});
