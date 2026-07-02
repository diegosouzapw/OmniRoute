import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveEmbeddingSource } from "../../src/lib/memory/embedding/index";
const embeddingPublicApi = await import("../../src/lib/memory/embedding/index");
import type { MemorySettingsExtended } from "../../src/shared/schemas/memory";

function makeSettings(overrides: Partial<MemorySettingsExtended> = {}): MemorySettingsExtended {
  return {
    embeddingSource: "auto",
    embeddingProviderModel: null,
    transformersEnabled: false,
    staticEnabled: false,
    rerankEnabled: false,
    rerankProviderModel: null,
    vectorStore: "auto",
    ...overrides,
  };
}

describe("resolveEmbeddingSource", () => {
  it("public surface excludes unused cache invalidation wrapper", () => {
    assert.equal("invalidateEmbeddingCache" in embeddingPublicApi, false);
  });

  it("auto + no key + no static + no transformers => source null", () => {
    const res = resolveEmbeddingSource(makeSettings({ embeddingSource: "auto" }));
    assert.strictEqual(res.source, null);
    // The reason must indicate the lack of any source — not just be non-empty.
    assert.ok(
      res.reason.toLowerCase().includes("no embedding source"),
      `expected reason to mention "no embedding source", got: ${res.reason}`
    );
  });

  it("auto + embeddingProviderModel set to openai/... => source remote", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "auto",
        embeddingProviderModel: "openai/text-embedding-3-small",
      })
    );
    assert.strictEqual(res.source, "remote");
    assert.strictEqual(res.model, "openai/text-embedding-3-small");
  });

  it("auto + no model + staticEnabled=true => source static", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "auto",
        embeddingProviderModel: null,
        staticEnabled: true,
      })
    );
    assert.strictEqual(res.source, "static");
    assert.ok(res.model !== null);
  });

  it("auto + no model + staticEnabled=false + transformersEnabled=true => source transformers", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "auto",
        embeddingProviderModel: null,
        staticEnabled: false,
        transformersEnabled: true,
      })
    );
    assert.strictEqual(res.source, "transformers");
  });

  it("explicit 'remote' + no model => source null with no_key reason", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "remote",
        embeddingProviderModel: null,
      })
    );
    assert.strictEqual(res.source, null);
    // The reason must reference the missing key, not just be non-empty.
    assert.ok(
      res.reason.includes("no_key") || res.reason.includes("configured"),
      `expected reason to mention "no_key" or "configured", got: ${res.reason}`
    );
  });

  it("explicit 'remote' + model set => source remote (no fallback)", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "remote",
        embeddingProviderModel: "openai/text-embedding-3-small",
      })
    );
    assert.strictEqual(res.source, "remote");
    assert.strictEqual(res.model, "openai/text-embedding-3-small");
  });

  it("explicit 'static' + staticEnabled=true => source static", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "static",
        staticEnabled: true,
      })
    );
    assert.strictEqual(res.source, "static");
  });

  it("explicit 'static' + staticEnabled=false => source null", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "static",
        staticEnabled: false,
      })
    );
    assert.strictEqual(res.source, null);
  });

  it("explicit 'transformers' + transformersEnabled=true => source transformers", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "transformers",
        transformersEnabled: true,
      })
    );
    assert.strictEqual(res.source, "transformers");
  });

  it("explicit 'transformers' + transformersEnabled=false => source null", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "transformers",
        transformersEnabled: false,
      })
    );
    assert.strictEqual(res.source, null);
  });

  it("signature is deterministic for same inputs", () => {
    const settings = makeSettings({
      embeddingSource: "auto",
      staticEnabled: true,
    });
    const res1 = resolveEmbeddingSource(settings);
    const res2 = resolveEmbeddingSource(settings);
    assert.strictEqual(res1.signature, res2.signature);
  });

  it("signature contains source:model:dim components", () => {
    const res = resolveEmbeddingSource(
      makeSettings({
        embeddingSource: "static",
        staticEnabled: true,
      })
    );
    assert.ok(
      res.signature.includes("static"),
      `signature should contain 'static': ${res.signature}`
    );
    assert.ok(res.signature.includes(":"), "signature should contain colons");
  });

  it("signature for null source is null:null:null", () => {
    const res = resolveEmbeddingSource(makeSettings({ embeddingSource: "auto" }));
    assert.strictEqual(res.signature, "null:null:null");
  });

  it("reason field is non-empty string", () => {
    const res = resolveEmbeddingSource(makeSettings({ embeddingSource: "auto" }));
    assert.ok(typeof res.reason === "string");
    assert.ok(res.reason.length > 0);
  });
});
