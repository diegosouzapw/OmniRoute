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

test("keeps the FIRST occurrence's metadata, drops the later dupe", () => {
  const input = [
    { id: "x/dup", name: "First", capabilities: { vision: true } },
    { id: "x/dup", name: "Second" },
  ];
  const out = dedupeExactCatalogIds(input);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, "First");
  assert.deepEqual(out[0].capabilities, { vision: true });
});

test("a dup that differs only by type is NOT collapsed (distinct listing identity)", () => {
  const input = [
    { id: "p/m", type: "chat" },
    { id: "p/m", type: "embedding" },
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
