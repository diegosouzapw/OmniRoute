import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { dedupeExactCatalogIds } from "../../src/app/api/v1/models/catalogDedupe.ts";

describe("dedupeExactCatalogIds (#4424 / #8015)", () => {
  it("drops exact same-surface duplicates and keeps the first row", () => {
    const models = [
      { id: "codex/gpt-5.5", owned_by: "codex", root: "gpt-5.5", context_length: 200000 },
      { id: "codex/gpt-5.5", owned_by: "codex", root: "gpt-5.5", context_length: 100000 },
    ];
    const out = dedupeExactCatalogIds(models);
    assert.equal(out.length, 1);
    assert.equal(out[0]?.context_length, 200000);
  });

  it("drops generic chat siblings when a typed specialty row exists for the same id", () => {
    const models = [
      {
        id: "openai/whisper-1",
        owned_by: "openai",
        context_length: 128000,
        capabilities: { tool_calling: true, reasoning: true },
      },
      {
        id: "openai/whisper-1",
        owned_by: "openai",
        type: "audio",
        subtype: "transcription",
      },
      {
        id: "veo-free/veo",
        owned_by: "veo-free",
        context_length: 128000,
        capabilities: { tool_calling: true, reasoning: true },
      },
      {
        id: "veo-free/veo",
        owned_by: "veo-free",
        type: "video",
      },
      {
        id: "openai/omni-moderation-latest",
        owned_by: "openai",
        context_length: 128000,
      },
      {
        id: "openai/omni-moderation-latest",
        owned_by: "openai",
        type: "moderation",
      },
    ];
    const out = dedupeExactCatalogIds(models);
    assert.deepEqual(
      out.map((m) => [m.id, m.type, m.subtype]),
      [
        ["openai/whisper-1", "audio", "transcription"],
        ["veo-free/veo", "video", undefined],
        ["openai/omni-moderation-latest", "moderation", undefined],
      ]
    );
  });

  it("preserves intentional audio transcription + speech surfaces under the same id", () => {
    const models = [
      { id: "openai/gpt-4o-mini-tts", type: "audio", subtype: "transcription" },
      { id: "openai/gpt-4o-mini-tts", type: "audio", subtype: "speech" },
      // generic sibling must still be dropped
      { id: "openai/gpt-4o-mini-tts", context_length: 128000 },
    ];
    const out = dedupeExactCatalogIds(models);
    assert.equal(out.length, 2);
    assert.deepEqual(
      out.map((m) => m.subtype),
      ["transcription", "speech"]
    );
  });

  it("does not collapse distinct public ids or account-looking fields on kept rows", () => {
    const models = [
      { id: "a/one", account_id: "acct-1", type: "video" },
      { id: "a/two", account_id: "acct-2", type: "video" },
      { id: "a/one", account_id: "acct-9", type: "video" },
    ];
    const out = dedupeExactCatalogIds(models);
    assert.equal(out.length, 2);
    assert.equal(out[0]?.account_id, "acct-1");
    assert.equal(out[1]?.id, "a/two");
  });

  it("passes through empty/single-element arrays and id-less rows", () => {
    assert.deepEqual(dedupeExactCatalogIds([]), []);
    const one = [{ id: "only" }];
    assert.equal(dedupeExactCatalogIds(one), one);
    const mixed = [{ name: "no-id" }, { id: "x" }, { id: "x" }];
    const out = dedupeExactCatalogIds(mixed);
    assert.equal(out.length, 2);
    assert.equal((out[0] as { name?: string }).name, "no-id");
  });

  it("preserves the relative order of kept entries across distinct ids", () => {
    const models = [
      { id: "p/e", owned_by: "p" },
      { id: "p/d", owned_by: "p" },
      { id: "p/c", owned_by: "p" },
      { id: "p/b", owned_by: "p" },
      { id: "p/a", owned_by: "p" },
    ];
    const out = dedupeExactCatalogIds(models);
    assert.equal(out.length, 5);
    assert.deepEqual(
      out.map((m) => m.id),
      ["p/e", "p/d", "p/c", "p/b", "p/a"]
    );
  });

  it("never groups two distinct id-less entries together", () => {
    const models = [
      { name: "alpha", type: "video" },
      { name: "beta", type: "audio" },
    ];
    const out = dedupeExactCatalogIds(models);
    assert.equal(out.length, 2);
    assert.deepEqual(
      out.map((m) => (m as { name?: string }).name),
      ["alpha", "beta"]
    );
  });
});
