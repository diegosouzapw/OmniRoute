/**
 * TDD regression for #11489: auto-combo task fitness scored every catalog id by
 * exact string match, while dispatch already resolves `<model>-<effort>` ids back
 * to a base model. A variant like `gpt-5.6-sol-xhigh` missed every DB layer and
 * landed on the wildcard 0.5, while its base model was scored properly.
 *
 * `resolveScoresAs` is the shared, catalog-anchored resolver the fitness chain
 * consults on a miss. It resolves in three tiers and NEVER guesses:
 *   1. an explicit `scoresAs` declared on the registry entry (one hop only),
 *   2. a trailing reasoning-effort suffix stripped by an EXISTING splitter,
 *   3. a trailing `-free` tier marker,
 * and tiers 2–3 only accept a base that is itself a routable catalog id — which
 * is what keeps `qwen3.7-max` (where `-max` is the model, not an effort) and
 * `grok-4.6-fast-high` (whose stripped base is not in the catalog) unresolved.
 */
import { describe, it, expect } from "vitest";
import { resolveScoresAs } from "../scoresAs";
import { findRegistryModelById } from "../../../config/providerModels";

describe("#11489 resolveScoresAs", () => {
  it("strips a reasoning-effort suffix when the base is a catalog id", () => {
    expect(resolveScoresAs("gpt-5.6-sol-xhigh")).toEqual({
      base: "gpt-5.6-sol",
      via: "effort-suffix",
    });
  });

  it("follows a vendor alias that points FORWARD (gpt-5.6 is an alias of gpt-5.6-sol)", () => {
    // No suffix-stripper can produce this direction; it is registry data.
    expect(resolveScoresAs("gpt-5.6")).toEqual({ base: "gpt-5.6-sol", via: "explicit" });
  });

  it("leaves sibling models unresolved (gpt-5.6-luna is its own model)", () => {
    const result = resolveScoresAs("gpt-5.6-luna");
    expect(result.via).toBeNull();
    expect(result.base).toBe("gpt-5.6-luna");
    expect(result.base).not.toBe("gpt-5.6");
    expect(result.base).not.toBe("gpt-5.6-sol");
  });

  it("rejects an effort-stripped base that is not itself a catalog id", () => {
    // `grok-4.6-fast-high` strips to `grok-4.6-fast`, a ghost id on today's
    // catalog. Asserted against the catalog rather than hardcoded so the test
    // stays true if a provider ever ships the base as a routable id.
    const result = resolveScoresAs("grok-4.6-fast-high");
    if (findRegistryModelById("grok-4.6-fast")) {
      expect(result).toEqual({ base: "grok-4.6-fast", via: "effort-suffix" });
    } else {
      expect(result).toEqual({ base: "grok-4.6-fast-high", via: null });
    }
  });

  it("does not treat a trailing '-max' that is part of the model name as an effort", () => {
    // `qwen3.7-max` IS the model; `qwen3.7` does not exist.
    expect(resolveScoresAs("qwen3.7-max")).toEqual({ base: "qwen3.7-max", via: null });
  });

  it("never collapses a model onto its family", () => {
    expect(resolveScoresAs("claude-sonnet-5")).toEqual({ base: "claude-sonnet-5", via: null });
  });

  it("resolves curated Cursor Claude variants to their canonical ids", () => {
    expect(resolveScoresAs("claude-fable-5-1-thinking-high")).toEqual({
      base: "claude-fable-5-1",
      via: "explicit",
    });
    expect(resolveScoresAs("claude-4.6-sonnet-medium")).toEqual({
      base: "claude-sonnet-4-6",
      via: "explicit",
    });
  });

  it("strips a '-free' tier marker when the paid base is a catalog id", () => {
    expect(findRegistryModelById("mimo-v2.5")).toBeTruthy();
    expect(resolveScoresAs("mimo-v2.5-free")).toEqual({ base: "mimo-v2.5", via: "free-suffix" });
  });

  it("leaves a '-free' id unresolved when no paid base exists in the catalog", () => {
    expect(findRegistryModelById("ox-alpha")).toBeFalsy();
    expect(resolveScoresAs("ox-alpha-free")).toEqual({ base: "ox-alpha-free", via: null });
  });

  it("returns the id unchanged for junk input", () => {
    expect(resolveScoresAs("totally-unknown-model")).toEqual({
      base: "totally-unknown-model",
      via: null,
    });
    expect(resolveScoresAs("")).toEqual({ base: "", via: null });
  });
});
