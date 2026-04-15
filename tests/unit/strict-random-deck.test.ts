import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Env vars BEFORE dynamic imports ──────────────────────────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-strict-random-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "strict-random-test-secret";

const { fisherYatesShuffle, getNextFromDeck } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── fisherYatesShuffle ──────────────────────────────────────────────────────

test("fisherYatesShuffle: returns array with same elements", () => {
  const input = ["a", "b", "c", "d", "e"];
  const result = fisherYatesShuffle(input);
  assert.equal(result.length, input.length);
  for (const item of input) {
    assert.ok(result.includes(item), `Missing item: ${item}`);
  }
});

test("fisherYatesShuffle: does not mutate original array", () => {
  const input = Object.freeze(["a", "b", "c"]);
  const result = fisherYatesShuffle(input);
  assert.deepStrictEqual([...input], ["a", "b", "c"]);
  assert.equal(result.length, 3);
});

test("fisherYatesShuffle: single element returns same element", () => {
  const result = fisherYatesShuffle(["only"]);
  assert.deepStrictEqual(result, ["only"]);
});

test("fisherYatesShuffle: empty array returns empty array", () => {
  const result = fisherYatesShuffle([]);
  assert.deepStrictEqual(result, []);
});

// ─── getNextFromDeck ─────────────────────────────────────────────────────────

test("getNextFromDeck: uses all connections before repeating", () => {
  const provider = "test-full-cycle";
  const ids = ["c1", "c2", "c3", "c4"];

  const seen = new Set();
  for (let i = 0; i < ids.length; i++) {
    const id = getNextFromDeck(provider, ids);
    assert.ok(!seen.has(id), `Duplicate before full cycle: ${id} at step ${i}`);
    seen.add(id);
  }
  assert.equal(seen.size, ids.length, "Should have used every connection exactly once");
});

test("getNextFromDeck: reshuffles after exhausting deck", () => {
  const provider = "test-reshuffle";
  const ids = ["c1", "c2", "c3"];

  // Exhaust first cycle
  for (let i = 0; i < ids.length; i++) {
    getNextFromDeck(provider, ids);
  }

  // Next call should start a new cycle (reshuffle)
  const firstOfNewCycle = getNextFromDeck(provider, ids);
  assert.ok(ids.includes(firstOfNewCycle), "New cycle should return a valid connection");

  // Complete the new cycle
  const newCycleSeen = new Set([firstOfNewCycle]);
  for (let i = 1; i < ids.length; i++) {
    const id = getNextFromDeck(provider, ids);
    assert.ok(!newCycleSeen.has(id), `Duplicate in new cycle: ${id}`);
    newCycleSeen.add(id);
  }
  assert.equal(newCycleSeen.size, ids.length, "New cycle should use all connections");
});

test("getNextFromDeck: last of previous cycle is not first of next cycle", () => {
  const provider = "test-no-repeat-boundary";
  const ids = ["c1", "c2", "c3", "c4", "c5"];

  // Run multiple full cycles and check the boundary condition
  let violations = 0;
  const totalCycles = 50;

  for (let cycle = 0; cycle < totalCycles; cycle++) {
    let lastId = "";
    for (let i = 0; i < ids.length; i++) {
      lastId = getNextFromDeck(provider, ids);
    }
    // First of next cycle
    const firstOfNext = getNextFromDeck(provider, ids);
    if (firstOfNext === lastId) violations++;

    // Consume rest of cycle
    for (let i = 1; i < ids.length; i++) {
      getNextFromDeck(provider, ids);
    }
  }

  assert.equal(
    violations,
    0,
    `Last of cycle matched first of next cycle ${violations}/${totalCycles} times`
  );
});

test("getNextFromDeck: connection list change resets deck", () => {
  const provider = "test-reset-on-change";
  const originalIds = ["c1", "c2", "c3", "c4"];

  // Use 2 from original deck
  getNextFromDeck(provider, originalIds);
  getNextFromDeck(provider, originalIds);

  // Now change the connection list (simulates quota exhaustion removing a connection)
  const newIds = ["c1", "c2", "c3"]; // c4 removed
  const seen = new Set();
  for (let i = 0; i < newIds.length; i++) {
    const id = getNextFromDeck(provider, newIds);
    assert.ok(newIds.includes(id), `Got invalid id ${id} after reset`);
    assert.ok(!seen.has(id), `Duplicate after reset: ${id}`);
    seen.add(id);
  }
  assert.equal(seen.size, newIds.length, "Should use all new connections after reset");
});

test("getNextFromDeck: single connection always returns that connection", () => {
  const provider = "test-single";
  const ids = ["only-one"];

  for (let i = 0; i < 10; i++) {
    const id = getNextFromDeck(provider, ids);
    assert.equal(id, "only-one");
  }
});

test("getNextFromDeck: empty array returns empty string", () => {
  const provider = "test-empty";
  const id = getNextFromDeck(provider, []);
  assert.equal(id, "");
});

test("getNextFromDeck: different providers have independent decks", () => {
  const idsA = ["a1", "a2", "a3"];
  const idsB = ["b1", "b2"];

  const firstA = getNextFromDeck("providerA", idsA);
  const firstB = getNextFromDeck("providerB", idsB);

  assert.ok(idsA.includes(firstA));
  assert.ok(idsB.includes(firstB));

  // Exhaust providerB deck
  getNextFromDeck("providerB", idsB);

  // providerA should still have remaining items from its deck
  const secondA = getNextFromDeck("providerA", idsA);
  assert.ok(idsA.includes(secondA));
  assert.notEqual(firstA, secondA, "providerA deck should advance independently");
});
