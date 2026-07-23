import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  ccrEngine,
  effectiveMinChars,
  resolveRetrievalRampFactor,
  recordRetrieval,
  storeBlock,
  resetCcrStore,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

// T08/H8 — graduated retrieval feedback. Frequently-retrieved CCR blocks resist compression
// progressively (effective minChars ramps up), and at/above the threshold are never compressed.

const BASE = 600;
const P = "p1";

beforeEach(() => resetCcrStore());

function retrieve(hash: string, n: number) {
  for (let i = 0; i < n; i++) recordRetrieval(hash, P);
}

describe("effectiveMinChars (H8 ramp)", () => {
  it("never-retrieved block keeps the base minimum", () => {
    assert.equal(effectiveMinChars(BASE, "h", P, 2), BASE);
  });

  it("ramps linearly with retrieval count below the threshold (factor 2)", () => {
    retrieve("h", 1);
    assert.equal(effectiveMinChars(BASE, "h", P, 2), BASE * 2); // 1200
    retrieve("h", 1); // count = 2
    assert.equal(effectiveMinChars(BASE, "h", P, 2), BASE * 3); // 1800
  });

  it("returns Infinity at/above the retrieval threshold (subsumes the binary cliff)", () => {
    retrieve("h", 3);
    assert.equal(effectiveMinChars(BASE, "h", P, 2), Number.POSITIVE_INFINITY);
  });

  it("rampFactor <= 1 disables the ramp (binary: base until the cliff)", () => {
    retrieve("h", 2);
    assert.equal(effectiveMinChars(BASE, "h", P, 1), BASE);
    retrieve("h", 1); // count = 3 → cliff still applies
    assert.equal(effectiveMinChars(BASE, "h", P, 1), Number.POSITIVE_INFINITY);
  });

  it("isolates retrieval feedback per (principal, hash)", () => {
    retrieve("h", 2);
    // different hash → unaffected
    assert.equal(effectiveMinChars(BASE, "other", P, 2), BASE);
  });
});

describe("resolveRetrievalRampFactor (env)", () => {
  it("defaults to 2 with no env", () => {
    assert.equal(resolveRetrievalRampFactor({} as NodeJS.ProcessEnv), 2);
  });
  it("reads a valid env value", () => {
    assert.equal(
      resolveRetrievalRampFactor({
        COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR: "3",
      } as NodeJS.ProcessEnv),
      3
    );
  });
  it("falls back to the default on an invalid value", () => {
    assert.equal(
      resolveRetrievalRampFactor({
        COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR: "0",
      } as NodeJS.ProcessEnv),
      2
    );
  });
});

describe("ccrEngine.apply — retrieval-aware compression (H8)", () => {
  const block = (len: number) => "x".repeat(len);
  const run = (content: string, retrievalRampFactor = 2) =>
    ccrEngine.apply(
      { messages: [{ role: "user", content }] },
      { stepConfig: { minChars: BASE, retrievalRampFactor }, principalId: P }
    );

  it("compresses a large never-retrieved block normally", () => {
    const out = run(block(1000));
    assert.equal(out.compressed, true);
  });

  it("a block retrieved twice (effMin 1800) is skipped at 1000 chars but compressed at 2000", () => {
    const hash = storeBlock(block(1000), P); // hash of the 1000-char block
    retrieve(hash, 2); // count 2 → effMin = base*3 = 1800
    assert.equal(run(block(1000)).compressed, false, "1000 < 1800 → skipped by the ramp");

    // a distinct, larger block that has NOT been retrieved still compresses
    assert.equal(run(block(2000)).compressed, true);
  });

  it("a block retrieved >= threshold is never compressed", () => {
    const hash = storeBlock(block(5000), P);
    retrieve(hash, 3);
    assert.equal(run(block(5000)).compressed, false, "retrieved 3x → excluded (Infinity)");
  });

  it("rampFactor 1 keeps the legacy binary behavior (retrieved-twice still compresses)", () => {
    const hash = storeBlock(block(1000), P);
    retrieve(hash, 2);
    assert.equal(
      run(block(1000), 1).compressed,
      true,
      "no ramp → still compressed below threshold"
    );
    retrieve(hash, 1); // count 3
    assert.equal(run(block(1000), 1).compressed, false, "cliff still applies at the threshold");
  });
});
