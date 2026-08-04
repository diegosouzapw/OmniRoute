/**
 * TDD security tests: CCR cross-tenant IDOR + bounded memory + scoped feedback.
 * Run: node --import tsx/esm --test tests/unit/compression/ccr-cross-tenant.test.ts
 *
 * RED  → GREEN: these tests define the security contract and must drive the fix.
 *
 * Security assertions:
 *   1. Cross-tenant IDOR blocked: principal B cannot retrieve a block stored by A.
 *   2. Anonymous principal cannot retrieve a block stored by a named principal.
 *   3. Memory bound: store never exceeds MAX_CCR_ENTRIES (FIFO eviction).
 *   4. Scoped feedback: A's retrievals do NOT flip B's shouldSkipCompression.
 *   5. handleCcrRetrieve end-to-end: cross-tenant retrieve returns not-found error.
 */

import crypto from "node:crypto";
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  storeBlock,
  retrieveBlock,
  recordRetrieval,
  shouldSkipCompression,
  resetCcrStore,
  handleCcrRetrieve,
  ccrEngine,
  MAX_CCR_ENTRIES,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

// ─── helpers ──────────────────────────────────────────────────────────────────

function makeText(seed: string, length: number = 700): string {
  return seed.repeat(Math.ceil(length / seed.length)).slice(0, length);
}

const TEXT_A = makeText("content for principal A — confidential data");
const TEXT_B = makeText("content for principal B — different tenant");

function contentHash(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

// ─── cross-tenant IDOR isolation ─────────────────────────────────────────────

describe("ccr security: cross-tenant IDOR isolation", () => {
  beforeEach(() => resetCcrStore());

  it("[HIGH] principal B cannot retrieve a block stored by principal A", () => {
    const hash = storeBlock(TEXT_A, "principalA");

    // Same principal can retrieve
    const resultA = retrieveBlock(hash, "principalA");
    assert.equal(resultA, TEXT_A, "principal A must be able to retrieve its own block");

    // Different principal is blocked — THE CORE SECURITY ASSERTION
    const resultB = retrieveBlock(hash, "principalB");
    assert.equal(
      resultB,
      null,
      "[HIGH IDOR] principal B must NOT be able to retrieve principal A's block"
    );
  });

  it("[HIGH] anonymous principal cannot retrieve a block stored by a named principal", () => {
    const hash = storeBlock(TEXT_A, "principalA");

    const resultAnon = retrieveBlock(hash, undefined);
    assert.equal(
      resultAnon,
      null,
      "[HIGH IDOR] anonymous principal must NOT retrieve a named principal's block"
    );
  });

  it("named principal cannot retrieve a block stored by anonymous", () => {
    const hash = storeBlock(TEXT_B, undefined);

    const resultA = retrieveBlock(hash, "principalA");
    assert.equal(resultA, null, "principal A must NOT retrieve an anonymous block");

    // The anonymous store owner can retrieve
    const resultAnon = retrieveBlock(hash, undefined);
    assert.equal(resultAnon, TEXT_B, "anonymous can retrieve its own block");
  });

  it("principal with no stored block cannot retrieve via another principal's hash", () => {
    // Store TEXT_A only under principalA — principalB never stores anything.
    const hashA = storeBlock(TEXT_A, "principalA");

    // principalA can retrieve their own block
    assert.equal(retrieveBlock(hashA, "principalA"), TEXT_A, "A can retrieve its own block");

    // principalB never stored anything — cannot retrieve even with the correct hash
    assert.equal(
      retrieveBlock(hashA, "principalB"),
      null,
      "[HIGH IDOR] B (never stored) cannot retrieve A's block by reusing A's hash"
    );

    // anonymous similarly cannot
    assert.equal(
      retrieveBlock(hashA, undefined),
      null,
      "[HIGH IDOR] anonymous cannot retrieve A's block"
    );
  });
});

// ─── handleCcrRetrieve end-to-end isolation ───────────────────────────────────

describe("ccr security: handleCcrRetrieve end-to-end isolation", () => {
  beforeEach(() => resetCcrStore());

  it("handleCcrRetrieve with correct callerId returns content", () => {
    const hash = storeBlock(TEXT_A, "callerA");
    const result = handleCcrRetrieve({ hash }, "callerA");
    assert.ok("content" in result, "same-caller retrieve must return content");
    assert.equal((result as { content: string }).content, TEXT_A);
  });

  it("[HIGH] handleCcrRetrieve with wrong callerId returns not-found error", () => {
    const hash = storeBlock(TEXT_A, "callerA");
    const result = handleCcrRetrieve({ hash }, "callerB");
    assert.ok(
      "error" in result,
      "[HIGH IDOR] cross-tenant retrieve via handleCcrRetrieve must return error, not content"
    );
    assert.ok(!("content" in result), "[HIGH IDOR] cross-tenant retrieve must NOT return content");
  });

  it("handleCcrRetrieve without callerId cannot access named-principal block", () => {
    const hash = storeBlock(TEXT_A, "callerA");
    const result = handleCcrRetrieve({ hash }, undefined);
    assert.ok("error" in result, "anonymous retrieve of named-principal block must return error");
  });

  it("handleCcrRetrieve returns error for completely unknown hash", () => {
    const result = handleCcrRetrieve({ hash: "000000000000000000000000" }, "anyPrincipal");
    assert.ok("error" in result, "unknown hash must return error");
    assert.ok(typeof (result as { error: string }).error === "string");
  });

  it("handleCcrRetrieve returns error for missing hash parameter", () => {
    // @ts-expect-error — intentional wrong call to verify guard
    const result = handleCcrRetrieve({}, "caller");
    assert.ok("error" in result, "missing hash must return error");
  });
});

// ─── scoped retrieval feedback ────────────────────────────────────────────────

describe("ccr security: [MEDIUM] scoped retrieval feedback (shouldSkipCompression)", () => {
  beforeEach(() => resetCcrStore());

  it("A's retrievals do NOT flip B's shouldSkipCompression", () => {
    const hash = storeBlock(TEXT_A, "principalA");
    storeBlock(TEXT_A, "principalB"); // same content stored under B

    // Record retrievals for A above the threshold (default 3)
    recordRetrieval(hash, "principalA");
    recordRetrieval(hash, "principalA");
    recordRetrieval(hash, "principalA");

    // A's compression should be skipped
    assert.equal(
      shouldSkipCompression(hash, "principalA"),
      true,
      "A's compression should be skipped after threshold retrievals"
    );

    // B's compression must NOT be affected
    assert.equal(
      shouldSkipCompression(hash, "principalB"),
      false,
      "[MEDIUM] A's retrievals must NOT flip B's shouldSkipCompression"
    );
  });

  it("shouldSkipCompression returns false for a principal with no retrievals", () => {
    const hash = storeBlock(TEXT_A, "principalA");
    assert.equal(shouldSkipCompression(hash, "principalA"), false);
    assert.equal(shouldSkipCompression(hash, "principalB"), false);
    assert.equal(shouldSkipCompression(hash, undefined), false);
  });
});

// ─── bounded memory (LRU eviction) ───────────────────────────────────────────

describe("ccr security: [MEDIUM] bounded memory (LRU eviction)", () => {
  beforeEach(() => resetCcrStore());

  it("MAX_CCR_ENTRIES is exported and positive", () => {
    assert.ok(typeof MAX_CCR_ENTRIES === "number", "MAX_CCR_ENTRIES must be a number");
    assert.ok(MAX_CCR_ENTRIES > 0, "MAX_CCR_ENTRIES must be positive");
  });

  it("LRU eviction: least-recently-used entry is evicted when cap is reached", () => {
    const principal = "evictionTest";

    // Fill to exactly cap with unique blocks
    const firstText = `eviction block 0 ${"y".repeat(30)}`;
    const firstHash = storeBlock(firstText, principal);

    for (let i = 1; i < MAX_CCR_ENTRIES; i++) {
      storeBlock(`eviction block ${i} ${"y".repeat(30)}`, principal);
    }

    const secondText = `eviction block 1 ${"y".repeat(30)}`;
    const secondHash = contentHash(secondText);

    // Touch the first block so the second one becomes least recently used.
    assert.equal(
      retrieveBlock(firstHash, principal),
      firstText,
      "first block must be present at exactly-cap state"
    );

    // Insert one more unique block — should evict the first (oldest) entry
    storeBlock(`eviction overflow block ${"z".repeat(50)}`, principal);

    // The untouched second block should now be gone; the recently used first remains.
    assert.equal(
      retrieveBlock(secondHash, principal),
      null,
      "[MEDIUM] LRU eviction: least-recently-used block must be evicted when cap is reached"
    );
    assert.equal(retrieveBlock(firstHash, principal), firstText);
  });

  it("store does not grow unboundedly beyond MAX_CCR_ENTRIES distinct principals", () => {
    // Insert MAX+5 distinct (principal, content) pairs and verify the overall store
    // did not go unbounded by checking that the first inserted block is evicted.
    const firstText = `overflow test block 0 ${"a".repeat(40)}`;
    const firstPrincipal = "overflow-p-0";
    const firstHash = storeBlock(firstText, firstPrincipal);

    for (let i = 1; i < MAX_CCR_ENTRIES + 5; i++) {
      storeBlock(`overflow test block ${i} ${"a".repeat(40)}`, `overflow-p-${i}`);
    }

    // The first inserted store-key should have been evicted by FIFO
    assert.equal(
      retrieveBlock(firstHash, firstPrincipal),
      null,
      "[MEDIUM] unbounded-growth prevented: first inserted entry must be evicted after MAX+5 inserts"
    );
  });
});

// ─── engine-level scoping: apply() threads principalId end-to-end ─────────────

describe("ccr security: [HIGH] ccrEngine.apply scopes the stored block to the principal", () => {
  beforeEach(() => resetCcrStore());

  const bigBlock = makeText("a large block that CCR would normally compress ", 5000);
  const makeBody = () => ({ messages: [{ role: "user", content: bigBlock }] });

  it("apply with a principalId stores the block retrievable ONLY by that principal", () => {
    const result = ccrEngine.apply(makeBody(), {
      principalId: "principalA",
      stepConfig: { minChars: 100 },
    });
    assert.equal(result.compressed, true, "CCR compresses the large block");
    const hash = contentHash(bigBlock);
    assert.equal(retrieveBlock(hash, "principalA"), bigBlock, "owner principal A can retrieve");
    assert.equal(
      retrieveBlock(hash, "principalB"),
      null,
      "[HIGH IDOR] principal B must NOT retrieve principal A's apply()-stored block"
    );
  });
});
