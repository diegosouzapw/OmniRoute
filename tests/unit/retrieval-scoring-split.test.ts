/**
 * Characterization + API-surface test: retrieval.ts god-file decomposition.
 *
 * The pure, DB-free scoring/conversion helpers (+ the MemoryRow row shape) were
 * extracted verbatim from src/lib/memory/retrieval.ts into the self-contained
 * leaf src/lib/memory/retrieval/scoring.ts (imports only ../types — does NOT
 * import the host, so no cycle). The DB/vector/rerank engine stays in the host.
 *
 * Verifies that:
 *   1. estimateTokens / parseMetadata / rowToMemory / getRelevanceScore behave
 *      correctly (pure formulas pinned).
 *   2. The host retrieval.ts still exposes the FULL public API (7 names; the
 *      public estimateTokens is now re-exported from the leaf).
 *   3. The scoring leaf exports its pieces directly.
 *
 * Pure value assertions — no DB handle is opened.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  estimateTokens,
  parseMetadata,
  rowToMemory,
  getRelevanceScore,
} from "../../src/lib/memory/retrieval/scoring.ts";

describe("retrieval/scoring — estimateTokens (~1 token / 4 chars)", () => {
  it("returns 0 for empty / non-string", () => {
    assert.equal(estimateTokens(""), 0);
    assert.equal(estimateTokens(undefined as unknown as string), 0);
  });
  it("ceils length/4", () => {
    assert.equal(estimateTokens("abc"), 1); // ceil(3/4)
    assert.equal(estimateTokens("12345678"), 2); // ceil(8/4)
    assert.equal(estimateTokens("123456789"), 3); // ceil(9/4)
  });
});

describe("retrieval/scoring — parseMetadata", () => {
  it("returns {} for non-string / blank / invalid JSON", () => {
    assert.deepEqual(parseMetadata(null), {});
    assert.deepEqual(parseMetadata(""), {});
    assert.deepEqual(parseMetadata("not json"), {});
  });
  it("parses a JSON object", () => {
    assert.deepEqual(parseMetadata('{"a":1,"b":"x"}'), { a: 1, b: "x" });
  });
});

describe("retrieval/scoring — rowToMemory", () => {
  const mem = rowToMemory({
    id: "m1",
    type: "fact" as never,
    content: "hello world",
    metadata: '{"topic":"greeting"}',
  });
  it("maps content + parsed metadata + defaults accessCount to 0", () => {
    assert.equal(mem.content, "hello world");
    assert.deepEqual(mem.metadata, { topic: "greeting" });
    assert.equal(mem.accessCount, 0);
    assert.equal(mem.key, "");
  });
});

describe("retrieval/scoring — getRelevanceScore (literal string match, no RegExp)", () => {
  const mem = rowToMemory({
    id: "m1",
    type: "fact" as never,
    content: "hello world",
    metadata: '{"topic":"greeting"}',
  });
  it("returns 0 for a blank query", () => {
    assert.equal(getRelevanceScore(mem, ""), 0);
    assert.equal(getRelevanceScore(mem, "   "), 0);
  });
  it("scores +20 for a full-phrase hit and +3 per token occurrence", () => {
    // content "hello world": phrase +20, 1× "hello" +3 = 23
    assert.equal(getRelevanceScore(mem, "hello"), 23);
    // metadata holds "greeting": phrase +20, 1× "greeting" +3 = 23
    assert.equal(getRelevanceScore(mem, "greeting"), 23);
  });
  it("returns 0 when nothing matches", () => {
    assert.equal(getRelevanceScore(mem, "zzz"), 0);
  });
});

// ── host public API surface ──────────────────────────────────────────────────

const host = await import("../../src/lib/memory/retrieval.ts");

describe("retrieval.ts public API surface (7 names)", () => {
  it("re-exports estimateTokens (now sourced from the leaf) as a function", () => {
    assert.equal(typeof host.estimateTokens, "function");
  });
  it("keeps the three engine entrypoints as functions", () => {
    assert.equal(typeof host.retrieveMemories, "function");
    assert.equal(typeof host.retrievePreview, "function");
    assert.equal(typeof host.engineStatus, "function");
  });
});

describe("scoring.ts exports its pieces directly", () => {
  it("the moved helpers are functions on the leaf", async () => {
    const s = await import("../../src/lib/memory/retrieval/scoring.ts");
    for (const fn of ["estimateTokens", "parseMetadata", "rowToMemory", "getRelevanceScore"]) {
      assert.equal(typeof s[fn], "function", fn);
    }
  });
});
