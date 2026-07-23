// #7530 — in-product guidance for Prompt Compression engines.
//
// Regression guard for the richer `guidance` metadata on every engineCatalog.ts entry
// (tradeoffs, lossy flag, cache impact) and the derived "safe default" helper. This is
// the TDD-required test (Hard Rule #18): it FAILED before the `guidance` field existed
// (every `engineMeta(id).guidance` was `undefined`) and passes now that every catalog
// entry carries complete guidance.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ENGINE_IDS,
  engineMeta,
  isSafeDefault,
  type CacheImpact,
} from "@omniroute/open-sse/services/compression/engineCatalog.ts";

const VALID_CACHE_IMPACTS: CacheImpact[] = ["none", "low", "moderate", "high"];

test("every engine in the catalog has a complete guidance entry", () => {
  for (const id of ENGINE_IDS) {
    const meta = engineMeta(id);
    assert.ok(meta.guidance, `${id} is missing a guidance entry`);
    assert.equal(typeof meta.guidance.tradeoffs, "string", `${id} guidance.tradeoffs must be a string`);
    assert.ok(
      meta.guidance.tradeoffs.length >= 20,
      `${id} guidance.tradeoffs reads as a placeholder (too short): "${meta.guidance.tradeoffs}"`
    );
    assert.equal(typeof meta.guidance.lossy, "boolean", `${id} guidance.lossy must be a boolean`);
    assert.ok(
      VALID_CACHE_IMPACTS.includes(meta.guidance.cacheImpact),
      `${id} guidance.cacheImpact "${meta.guidance.cacheImpact}" is not one of ${VALID_CACHE_IMPACTS.join(", ")}`
    );
  }
});

test("isSafeDefault is derived from guidance.lossy (no duplicated flag)", () => {
  for (const id of ENGINE_IDS) {
    assert.equal(isSafeDefault(id), !engineMeta(id).guidance.lossy, `${id} safe-default mismatch`);
  }
});

test("lossless structural engines are flagged as safe defaults", () => {
  for (const id of ["session-dedup", "ccr", "lite", "headroom"]) {
    assert.equal(isSafeDefault(id), true, `${id} should be a safe default (lossless)`);
    assert.equal(engineMeta(id).guidance.lossy, false, `${id} should be marked non-lossy`);
  }
});

test("lossy semantic-condensation engines are NOT flagged as safe defaults", () => {
  for (const id of ["rtk", "relevance", "caveman", "aggressive", "llmlingua", "ultra", "omniglyph"]) {
    assert.equal(isSafeDefault(id), false, `${id} should NOT be a safe default (lossy)`);
    assert.equal(engineMeta(id).guidance.lossy, true, `${id} should be marked lossy`);
  }
});
