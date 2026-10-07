/**
 * #14313: after a free-tier refusal on the synthetic noauth connection, auto-combo
 * and credential selection must pause that path for a short TTL instead of
 * re-picking it on every subsequent request until the operator notices.
 *
 * Key is always the noauth connection: keyed OpenCode connections keep their own
 * account selection and must not be dropped by this skip.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { noteOpencodeFreeTierSkip, isOpencodeFreeTierSkipped, clearOpencodeFreeTierSkips } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");
const { filterResilienceBlockedCandidates } =
  await import("../../open-sse/services/autoCombo/resilienceCandidateFilter.ts");

test.after(() => {
  clearOpencodeFreeTierSkips();
});

test.beforeEach(() => {
  clearOpencodeFreeTierSkips();
});

test("a free-tier skip blocks the noauth auto-combo candidate for its TTL", () => {
  noteOpencodeFreeTierSkip("opencode");
  assert.equal(isOpencodeFreeTierSkipped("opencode"), true);

  const pool = [
    { provider: "opencode", connectionId: "noauth", model: "big-pickle" },
    { provider: "opencode", connectionId: "conn-keyed", model: "big-pickle" },
  ];
  const filtered = filterResilienceBlockedCandidates(pool, new Map());
  assert.deepEqual(
    filtered.map((c) => c.connectionId),
    ["conn-keyed"],
    "only the noauth candidate is dropped while the skip is active"
  );
});

test("the skip expires after the TTL so the path becomes eligible again", () => {
  const now = 1_000_000;
  const ttlMs = 50;
  noteOpencodeFreeTierSkip("opencode", now, ttlMs);
  assert.equal(isOpencodeFreeTierSkipped("opencode", now + 10), true);
  assert.equal(isOpencodeFreeTierSkipped("opencode", now + ttlMs), false);
  assert.equal(isOpencodeFreeTierSkipped("opencode", now + ttlMs + 1), false);
});

test("the skip is keyed by provider — a foreign provider is never skipped", () => {
  noteOpencodeFreeTierSkip("opencode");
  assert.equal(isOpencodeFreeTierSkipped("groq"), false);
  assert.equal(isOpencodeFreeTierSkipped("openai"), false);
});

test("note ignores non-opencode providers (no skip recorded)", () => {
  noteOpencodeFreeTierSkip("groq");
  assert.equal(isOpencodeFreeTierSkipped("groq"), false);
});

test("with no skip, the noauth candidate stays in the pool (unchanged)", () => {
  const pool = [{ provider: "opencode", connectionId: "noauth", model: "big-pickle" }];
  assert.equal(filterResilienceBlockedCandidates(pool, new Map()), pool);
});

test("clear resets every active skip", () => {
  noteOpencodeFreeTierSkip("opencode");
  clearOpencodeFreeTierSkips();
  assert.equal(isOpencodeFreeTierSkipped("opencode"), false);
});
