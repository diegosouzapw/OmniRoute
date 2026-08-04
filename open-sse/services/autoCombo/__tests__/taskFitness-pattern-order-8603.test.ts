/**
 * TDD regression for #8603: the static fitness table was matched with
 * `String.includes` over declaration order, so a SHORTER pattern declared earlier
 * shadowed a model's own, more specific row.
 *
 * `FITNESS_TABLE.coding` declares `"gpt-4o": 0.9` before `"gpt-4o-mini": 0.8`, so
 * `"gpt-4o-mini".includes("gpt-4o")` hit first and an explicitly cheap model
 * inherited the flagship's task fitness. Its own row was unreachable.
 *
 * The fix matches longest-pattern-first, so the most specific row always wins
 * regardless of how the table happens to be authored.
 *
 * Blast radius: `taskFit` is weight 0.08 in DEFAULT_WEIGHTS and 0.37 in the
 * `quality-first` mode pack. The static table is layer 4 of the 5-layer resolution
 * chain, so this surfaces for models with no arena_elo / models.dev coverage — the
 * long tail of the provider catalog.
 */
import { describe, it, expect } from "vitest";
import { getStaticFitnessTableScore } from "../taskFitness";

describe("#8603 static fitness table matches longest pattern first", () => {
  it("scores gpt-4o-mini from its own row, not gpt-4o's", () => {
    // Before the fix this returned 0.9 (the flagship's score).
    expect(getStaticFitnessTableScore("gpt-4o-mini", "coding")).toBe(0.8);
  });

  it("scores deepseek-v3.2 from its own row, not deepseek-v3's", () => {
    // Before the fix this returned 0.85.
    expect(getStaticFitnessTableScore("deepseek-v3.2", "coding")).toBe(0.86);
  });

  it("keeps the flagship rows intact", () => {
    expect(getStaticFitnessTableScore("gpt-4o", "coding")).toBe(0.9);
    expect(getStaticFitnessTableScore("deepseek-v3", "coding")).toBe(0.85);
  });

  it("still resolves rows that were already correct", () => {
    expect(getStaticFitnessTableScore("gemini-2.5-flash", "coding")).toBe(0.82);
    expect(getStaticFitnessTableScore("o4-mini", "coding")).toBe(0.88);
    expect(getStaticFitnessTableScore("gpt-4-turbo", "coding")).toBe(0.88);
  });

  it("resolves provider-prefixed and suffixed ids to the most specific row", () => {
    // Real ids carry prefixes/suffixes; the longest matching pattern must still win.
    expect(getStaticFitnessTableScore("openai/gpt-4o-mini-2024-07-18", "coding")).toBe(0.8);
  });

  it("falls back to the default table for an unknown task type", () => {
    // "claude-sonnet" is absent from a nonexistent table but present in `default`.
    expect(getStaticFitnessTableScore("claude-sonnet", "no-such-task")).toBe(0.85);
  });

  it("returns null when nothing matches", () => {
    expect(getStaticFitnessTableScore("totally-unknown-model", "coding")).toBeNull();
  });
});
