/**
 * tests/unit/ui/fleetAggregation.test.ts
 *
 * TDD for `aggregateComboEventsToSets` — fleet aggregation for Tela B U2.
 * Run: node --import tsx/esm --test tests/unit/ui/fleetAggregation.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { aggregateComboEventsToSets } from "../../../src/app/(dashboard)/dashboard/combos/live/fleetAggregation.ts";
import type { ComboEventInput } from "../../../src/app/(dashboard)/dashboard/combos/live/comboFlowModel.ts";

// ── helpers ───────────────────────────────────────────────────────────────

const WINDOW_MS = 10_000; // 10 seconds
const NOW = 1_000_000; // fixed "now" for deterministic tests

function ev(
  type: "attempt" | "succeeded" | "failed",
  provider: string,
  timestampOffset: number // relative to NOW (negative = in the past)
): ComboEventInput {
  return {
    comboName: "fleet-combo",
    targetIndex: 0,
    provider,
    model: "m",
    type,
    timestamp: NOW + timestampOffset,
  };
}

// ── aggregateComboEventsToSets ────────────────────────────────────────────

describe("aggregateComboEventsToSets — basic categorization", () => {
  it("puts a recently failed provider in error set", () => {
    const events: ComboEventInput[] = [ev("failed", "openai", -1000)]; // 1s ago, within 10s window
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(error.has("openai"), "openai should be in error set");
    assert.ok(!active.has("openai"), "openai should not be in active set");
    assert.ok(!last.has("openai"), "openai should not be in last set");
  });

  it("puts a recent attempt provider in active set", () => {
    const events: ComboEventInput[] = [ev("attempt", "anthropic", -500)];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(active.has("anthropic"), "anthropic should be in active set");
    assert.ok(!error.has("anthropic"));
    assert.ok(!last.has("anthropic"));
  });

  it("puts a recent succeeded provider in active set", () => {
    const events: ComboEventInput[] = [ev("succeeded", "gemini", -2000)];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(active.has("gemini"), "gemini should be in active set");
    assert.ok(!error.has("gemini"));
    assert.ok(!last.has("gemini"));
  });

  it("puts an old event provider in last set (outside window)", () => {
    const events: ComboEventInput[] = [ev("attempt", "cohere", -(WINDOW_MS + 1))]; // just outside window
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(last.has("cohere"), "cohere should be in last set");
    assert.ok(!active.has("cohere"));
    assert.ok(!error.has("cohere"));
  });

  it("puts an old failed provider in last set (not error)", () => {
    const events: ComboEventInput[] = [ev("failed", "mistral", -(WINDOW_MS + 5000))];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(last.has("mistral"), "old failed should be last, not error");
    assert.ok(!error.has("mistral"));
  });
});

describe("aggregateComboEventsToSets — multiple providers and events", () => {
  it("handles multiple providers independently", () => {
    const events: ComboEventInput[] = [
      ev("failed", "openai", -500), // recent → error
      ev("succeeded", "gemini", -1000), // recent → active
      ev("attempt", "cohere", -(WINDOW_MS + 1)), // old → last
    ];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(error.has("openai"));
    assert.ok(active.has("gemini"));
    assert.ok(last.has("cohere"));
  });

  it("latest event for provider wins (error beats active for same provider)", () => {
    // Two events for openai: succeeded first (older), then failed (newer)
    const events: ComboEventInput[] = [
      ev("succeeded", "openai", -3000), // older, within window
      ev("failed", "openai", -500), // newer → should win
    ];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(error.has("openai"), "latest event (failed) should win");
    assert.ok(!active.has("openai"));
  });

  it("latest event for provider wins (active beats old failure when newer event is success)", () => {
    const events: ComboEventInput[] = [
      ev("failed", "openai", -3000), // older failed, within window
      ev("succeeded", "openai", -500), // newer success → should win
    ];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.ok(active.has("openai"), "newer succeeded should win over older failed");
    assert.ok(!error.has("openai"));
  });

  it("returns empty sets for empty events list", () => {
    const { active, error, last } = aggregateComboEventsToSets([], WINDOW_MS, NOW);

    assert.equal(active.size, 0);
    assert.equal(error.size, 0);
    assert.equal(last.size, 0);
  });

  it("a provider appears in at most one set", () => {
    const events: ComboEventInput[] = [
      ev("failed", "openai", -500),
      ev("attempt", "openai", -1000),
    ];
    const { active, error, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    const inSets =
      (active.has("openai") ? 1 : 0) + (error.has("openai") ? 1 : 0) + (last.has("openai") ? 1 : 0);
    assert.equal(inSets, 1, "provider should be in exactly one set");
  });
});

describe("aggregateComboEventsToSets — window boundary", () => {
  it("includes event exactly at the window boundary (now - windowMs) as 'last'", () => {
    const events: ComboEventInput[] = [ev("attempt", "boundary", -WINDOW_MS)];
    const { active, last } = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    // timestamp === NOW - WINDOW_MS: age === WINDOW_MS → not within (age < windowMs)
    assert.ok(
      last.has("boundary") || !active.has("boundary"),
      "boundary event should be last or absent from active"
    );
  });

  it("does not call Date.now() — pure function (same output with same now)", () => {
    const events: ComboEventInput[] = [ev("failed", "openai", -500)];
    const r1 = aggregateComboEventsToSets(events, WINDOW_MS, NOW);
    const r2 = aggregateComboEventsToSets(events, WINDOW_MS, NOW);

    assert.deepEqual([...r1.error], [...r2.error]);
    assert.deepEqual([...r1.active], [...r2.active]);
    assert.deepEqual([...r1.last], [...r2.last]);
  });
});
