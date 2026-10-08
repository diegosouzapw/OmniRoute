/**
 * #15675 — `auto/claude-*` must restrict the candidate pool to the matching Claude family.
 * It used to map to a flat weight-pack variant, so the pool was unfiltered and a
 * non-Claude model (cheaperinference/aion-3.0) could win on score.
 */
import { describe, it, expect } from "vitest";
import { resolveBuiltinAutoSpec } from "../../../open-sse/services/autoCombo/builtinCatalog";
import {
  buildFamilyCandidateFilter,
  type ModelFamily,
} from "../../../open-sse/services/autoCombo/modelFamily";

const AION = { provider: "cheaperinference", model: "aion-3.0" };

describe("auto/claude-* aliases pin the model family (#15675)", () => {
  for (const [id, suffix, keep, drop] of [
    ["auto/claude-opus", "claude-opus", "claude-opus-4-8", "claude-sonnet-4-6"],
    ["auto/claude-sonnet", "claude-sonnet", "claude-sonnet-4-6", "claude-opus-4-8"],
    ["auto/claude-haiku", "claude-haiku", "claude-haiku-4-5", "claude-opus-4-8"],
  ] as const) {
    it(`${id} spec carries a family filter that drops aion-3.0`, () => {
      const spec = resolveBuiltinAutoSpec(id, suffix) as { family?: ModelFamily };
      expect(spec.family, `spec was ${JSON.stringify(spec)}`).toBeTruthy();
      const filter = buildFamilyCandidateFilter(spec.family as ModelFamily);
      expect(filter(AION)).toBe(false);
      expect(filter({ provider: "anthropic", model: keep })).toBe(true);
      expect(filter({ provider: "anthropic", model: drop })).toBe(false);
      expect(filter({ provider: "bedrock", model: `us.anthropic.${keep}-v1:0` })).toBe(true);
      expect(filter({ provider: "cc", model: `cc/${keep}` })).toBe(true);
    });
  }
});
