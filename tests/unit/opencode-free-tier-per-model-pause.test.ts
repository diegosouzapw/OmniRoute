/**
 * A free-tier pause covers one provider + model pair: refusing model A must
 * not block sibling model B on the same provider, in selection or in the
 * auto-combo candidate filter.
 *
 * A refusal recorded without a model keeps the previous behaviour and covers
 * the whole provider.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  noteOpencodeFreeTierSkip,
  isOpencodeFreeTierSkipped,
  getOpencodeFreeTierSkipRemainingMs,
  clearOpencodeFreeTierSkips,
} = await import("../../open-sse/services/opencodeFreeTierSkip.ts");
const { filterResilienceBlockedCandidates } =
  await import("../../open-sse/services/autoCombo/resilienceCandidateFilter.ts");
const { pauseCooldownIfPaused } = await import("../../src/sse/services/noAuthModelCooldown.ts");

const PROVIDER = "opencode";
const MODEL_A = "nemotron-3.5-lightning-free";
const MODEL_B = "muse-spark-1.3-contributor-free";
const TTL_MS = 60_000;

test.after(() => {
  clearOpencodeFreeTierSkips();
});

test.beforeEach(() => {
  clearOpencodeFreeTierSkips();
});

test("a refusal on one model leaves a sibling model on the same provider served", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, MODEL_B), false);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 10, MODEL_B), null);
});

test("a refused model stays paused until its pause expires", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, MODEL_A), true);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 10, MODEL_A), TTL_MS - 10);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + TTL_MS, MODEL_A), false);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + TTL_MS, MODEL_A), null);
});

test("the auto-combo filter drops only the refused model candidate", () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), TTL_MS, MODEL_A);
  const pool = [
    { provider: PROVIDER, connectionId: "noauth", model: MODEL_A },
    { provider: PROVIDER, connectionId: "noauth", model: MODEL_B },
  ];
  const filtered = filterResilienceBlockedCandidates(pool, new Map());
  assert.deepEqual(
    filtered.map((candidate) => candidate.model),
    [MODEL_B],
    "only the refused model candidate is dropped while its pause is active"
  );
});

test("the free-fast pool serves the sibling model after a single refusal", () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), TTL_MS, MODEL_A);
  const pool = [
    { provider: PROVIDER, connectionId: "noauth", model: MODEL_A },
    { provider: PROVIDER, connectionId: "noauth", model: MODEL_B },
  ];
  const filtered = filterResilienceBlockedCandidates(pool, new Map());
  assert.ok(
    filtered.some((candidate) => candidate.model === MODEL_B),
    "the sibling model stays eligible after a refusal on another model"
  );
  assert.ok(
    !filtered.some((candidate) => candidate.model === MODEL_A),
    "the refused model stays out of the pool while its pause is active"
  );
});

test("the no-auth pause envelope fires for the refused model only", () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), TTL_MS, MODEL_A);
  assert.ok(pauseCooldownIfPaused(PROVIDER, "noauth", MODEL_A), "refused model answers a cooldown");
  assert.equal(
    pauseCooldownIfPaused(PROVIDER, "noauth", MODEL_B),
    null,
    "sibling model is not covered by the pause"
  );
});

test("a provider-wide pause still covers every model", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, MODEL_A), true);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, MODEL_B), true);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10), true);
});

test("a read without a model sees a model-scoped pause", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10), true);
  assert.ok(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 10) !== null);
});

test("a model-scoped pause expires and hands the model back", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 50, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 51, MODEL_A), false);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 51, MODEL_A), null);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 51), false);
});

test("a foreign provider records nothing, with or without a model", () => {
  noteOpencodeFreeTierSkip("groq", 1_000_000, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped("groq", 1_000_010, MODEL_A), false);
  assert.equal(getOpencodeFreeTierSkipRemainingMs("groq", 1_000_010, MODEL_A), null);
});

test("an unknown model is served", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, "some-model-never-paused"), false);
});

test("model matching ignores case and surrounding whitespace", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, `  ${MODEL_A.toUpperCase()}  `), true);
});

test("a blank or non-string model behaves like no model", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, MODEL_A);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, "   "), true);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, 42 as unknown as string), true);
});

test("the entry count stays bounded under many model pauses", () => {
  const now = 1_000_000;
  const totalWrites = 600;
  for (let i = 0; i < totalWrites; i += 1) {
    noteOpencodeFreeTierSkip(PROVIDER, now, TTL_MS, `model-${i}`);
  }
  assert.equal(
    isOpencodeFreeTierSkipped(PROVIDER, now + 10, "model-0"),
    false,
    "the oldest entry is evicted once the bound is reached"
  );
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 10, `model-${totalWrites - 1}`), true);
});

test("expired entries are purged before live ones are evicted", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 10, "expired-model");
  for (let i = 0; i < 600; i += 1) {
    noteOpencodeFreeTierSkip(PROVIDER, now + 20, TTL_MS, `live-model-${i}`);
  }
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 30, "expired-model"), false);
  assert.equal(isOpencodeFreeTierSkipped(PROVIDER, now + 30, "live-model-599"), true);
});
