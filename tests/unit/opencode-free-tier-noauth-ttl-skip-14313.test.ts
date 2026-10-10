/**
 * #14313: after a free-tier refusal on the synthetic noauth connection, auto-combo
 * and credential selection must pause that path for a short TTL instead of
 * re-picking it on every subsequent request until the operator notices.
 *
 * 2026-10-08: the pause is keyed per provider+MODEL — the refusal belongs to one
 * model's request shape (big-pickle serves the same request fine while a
 * -contributor-free model is refused). A provider-keyed skip emptied the whole
 * noauth pool for the TTL ("No target … supports tool calling" / the misleading
 * "No active credentials for provider: opencode" on siblings).
 *
 * Contract (open-sse/services/opencodeFreeTierSkip.ts): a note WITH a model
 * pauses only that model; a note WITHOUT one keeps a provider-wide pause
 * (fail-closed for callers that cannot name a model). Production call sites
 * always name the model (chatCore / resilienceCandidateFilter / auth.ts).
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

const REFUSED_MODEL = "muse-spark-1.3-contributor-free";
const SIBLING_MODEL = "big-pickle";

test.after(() => {
  clearOpencodeFreeTierSkips();
});

test.beforeEach(() => {
  clearOpencodeFreeTierSkips();
});

test("a free-tier skip blocks ONLY the refused model's noauth candidate for its TTL", () => {
  noteOpencodeFreeTierSkip("opencode", undefined, undefined, REFUSED_MODEL);
  assert.equal(isOpencodeFreeTierSkipped("opencode", undefined, REFUSED_MODEL), true);

  const pool = [
    { provider: "opencode", connectionId: "noauth", model: REFUSED_MODEL },
    { provider: "opencode", connectionId: "noauth", model: SIBLING_MODEL },
    { provider: "opencode", connectionId: "conn-keyed", model: REFUSED_MODEL },
    { provider: "opencode", connectionId: "noauth", model: "other-free-model" },
  ];
  const filtered = filterResilienceBlockedCandidates(pool, new Map());
  assert.deepEqual(
    filtered.map((c) => `${c.connectionId}/${c.model}`),
    [`noauth/${SIBLING_MODEL}`, `conn-keyed/${REFUSED_MODEL}`, "noauth/other-free-model"],
    "only the refused model's noauth candidate is dropped — siblings and keyed connections survive"
  );
});

test("the skip expires after the TTL so the path becomes eligible again", () => {
  const now = 1_000_000;
  const ttlMs = 50;
  noteOpencodeFreeTierSkip("opencode", now, ttlMs, REFUSED_MODEL);
  assert.equal(isOpencodeFreeTierSkipped("opencode", now + 10, REFUSED_MODEL), true);
  assert.equal(isOpencodeFreeTierSkipped("opencode", now + ttlMs, REFUSED_MODEL), false);
  assert.equal(isOpencodeFreeTierSkipped("opencode", now + ttlMs + 1, REFUSED_MODEL), false);
});

test("the skip is keyed by provider+model — a sibling model or foreign provider is never skipped", () => {
  noteOpencodeFreeTierSkip("opencode", undefined, undefined, REFUSED_MODEL);
  assert.equal(isOpencodeFreeTierSkipped("opencode", undefined, SIBLING_MODEL), false);
  assert.equal(isOpencodeFreeTierSkipped("opencode", undefined, "muse-spark-1.2"), false);
  assert.equal(isOpencodeFreeTierSkipped("groq", undefined, REFUSED_MODEL), false);
  assert.equal(isOpencodeFreeTierSkipped("openai", undefined, REFUSED_MODEL), false);
});

test("note ignores non-opencode providers (no skip recorded)", () => {
  noteOpencodeFreeTierSkip("groq", undefined, undefined, REFUSED_MODEL);
  assert.equal(isOpencodeFreeTierSkipped("groq", undefined, REFUSED_MODEL), false);
});

test("note without a model records a provider-wide pause (fail-closed)", () => {
  noteOpencodeFreeTierSkip("opencode", undefined);
  assert.equal(isOpencodeFreeTierSkipped("opencode", undefined, "anything"), true);
  const pool = [{ provider: "opencode", connectionId: "noauth", model: SIBLING_MODEL }];
  assert.deepEqual(
    filterResilienceBlockedCandidates(pool, new Map()).map((c) => `${c.connectionId}/${c.model}`),
    [],
    "a provider-wide pause drops every noauth candidate until it expires"
  );
});

test("with no skip, the noauth candidate stays in the pool (unchanged)", () => {
  const pool = [{ provider: "opencode", connectionId: "noauth", model: SIBLING_MODEL }];
  assert.equal(filterResilienceBlockedCandidates(pool, new Map()), pool);
});

test("clear resets every active skip", () => {
  noteOpencodeFreeTierSkip("opencode", undefined, undefined, REFUSED_MODEL);
  clearOpencodeFreeTierSkips();
  assert.equal(isOpencodeFreeTierSkipped("opencode", undefined, REFUSED_MODEL), false);
});
