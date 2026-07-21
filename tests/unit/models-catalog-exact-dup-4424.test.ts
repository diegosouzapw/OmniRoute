import test from "node:test";
import assert from "node:assert/strict";

// #4424 follow-up — `/v1/models` must not emit the same id twice (OpenAI clients key
// by id and break on exact-duplicate ids). The reporter observed `codex/gpt-5.5`,
// `veo-free/seedance`, `veo-free/veo` each listed twice. A final dedupe keyed by the
// model's listing identity `(id, type, subtype)` collapses true exact dupes (keep-first)
// while preserving the ONE intentional same-id case: audio models that list both a
// transcription and a speech entry under the same id (distinguished by `subtype`).

import { dedupeExactCatalogIds } from "../../src/app/api/v1/models/catalogDedupe.ts";

test("collapses an exact-duplicate id to a single entry (keep first)", () => {
  const input = [
    { id: "codex/gpt-5.5", owned_by: "codex", root: "gpt-5.5", context_length: 200000 },
    { id: "codex/gpt-5.5", owned_by: "codex", root: "gpt-5.5", context_length: 200000 },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "codex/gpt-5.5");
  assert.equal(out[0].context_length, 200000);
});

test("collapses the reporter's two distinct duplicated ids to two unique entries", () => {
  const input = [
    { id: "veo-free/seedance", owned_by: "veo-free", root: "seedance", type: "video" },
    { id: "veo-free/veo", owned_by: "veo-free", root: "veo", type: "video" },
    { id: "veo-free/seedance", owned_by: "veo-free", root: "seedance", type: "video" },
    { id: "veo-free/veo", owned_by: "veo-free", root: "veo", type: "video" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 2);
  assert.deepEqual(
    out.map((m) => m.id),
    ["veo-free/seedance", "veo-free/veo"]
  );
});

test("merges complementary metadata when the same id is emitted as generic and typed listings", () => {
  const out = dedupeExactCatalogIds([
    {
      id: "veo-free/veo",
      owned_by: "veoaifree-web",
      root: "veo",
      context_length: 128000,
      capabilities: { tool_calling: true },
      permission: [],
    },
    {
      id: "veo-free/veo",
      owned_by: "veoaifree-web",
      type: "video",
      capabilities: { reasoning: true },
    },
  ]);

  assert.equal(out.length, 1);
  assert.deepEqual(out[0], {
    id: "veo-free/veo",
    owned_by: "veoaifree-web",
    root: "veo",
    type: "video",
    context_length: 128000,
    capabilities: { tool_calling: true, reasoning: true },
    permission: [],
  });
});

test("merges public metadata without copying account-specific routing fields", () => {
  const out = dedupeExactCatalogIds([
    {
      id: "shared/model",
      owned_by: "provider",
      root: "model",
      connection_id: "account-a",
      context_length: 100000,
    },
    {
      id: "shared/model",
      owned_by: "provider",
      root: "model",
      connection_id: "account-b",
      max_output_tokens: 16000,
    },
  ]);

  assert.equal(out.length, 1);
  assert.equal(out[0].connection_id, "account-a");
  assert.equal(out[0].context_length, 100000);
  assert.equal(out[0].max_output_tokens, 16000);
});

test("preserves intentional same-id audio variants (transcription vs speech)", () => {
  const input = [
    { id: "prov/whisper", owned_by: "prov", root: "whisper", type: "audio", subtype: "transcription" },
    { id: "prov/whisper", owned_by: "prov", root: "whisper", type: "audio", subtype: "speech" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 2);
  assert.deepEqual(
    out.map((m) => m.subtype).sort(),
    ["speech", "transcription"]
  );
});

test("keeps distinct ids untouched", () => {
  const input = [
    { id: "a/m1", type: "chat" },
    { id: "b/m2", type: "chat" },
    { id: "c/m3", type: "chat" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 3);
});

test("keeps the FIRST occurrence's conflicting metadata while filling missing fields", () => {
  const input = [
    { id: "x/dup", name: "First", capabilities: { vision: true } },
    { id: "x/dup", name: "Second" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, "First");
  assert.deepEqual(out[0].capabilities, { vision: true });
});

test("preserves genuinely distinct non-chat surfaces for the same id", () => {
  const input = [
    { id: "p/m", type: "embedding" },
    { id: "p/m", type: "rerank" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 2);
});

test("preserves relative order of kept entries", () => {
  const input = [
    { id: "first/a", type: "chat" },
    { id: "dup/x", type: "chat" },
    { id: "second/b", type: "chat" },
    { id: "dup/x", type: "chat" },
    { id: "third/c", type: "chat" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.deepEqual(
    out.map((m) => m.id),
    ["first/a", "dup/x", "second/b", "third/c"]
  );
});

test("empty and single-element inputs pass through", () => {
  assert.deepEqual(dedupeExactCatalogIds([]), []);
  const one = [{ id: "only/one" }];
  assert.equal(dedupeExactCatalogIds(one).length, 1);
});

test("entries missing an id are passed through unchanged (never grouped)", () => {
  const input = [{ foo: 1 } as { id?: string }, { foo: 2 } as { id?: string }];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 2);
});
