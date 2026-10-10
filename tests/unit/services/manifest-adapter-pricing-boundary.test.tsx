import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateRoutingHints } from "../../../open-sse/services/manifestAdapter";
import {
  classifyTier,
  clearTierCache,
  setTierConfig,
  setTierPricingSnapshot,
} from "../../../open-sse/services/tierResolver";
import { DEFAULT_TIER_CONFIG } from "../../../open-sse/services/tierConfig";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo";

const { getPricingForModel } = vi.hoisted(() => ({
  getPricingForModel: vi.fn(
    async (_provider: string, _model: string): Promise<{ input: number; output: number } | null> =>
      null
  ),
}));
vi.mock("@/lib/db/settings", () => ({ getPricingForModel }));

const target: ResolvedComboTarget = {
  kind: "model",
  stepId: "pricing-boundary",
  executionKey: "openai/gpt-4o",
  modelStr: "gpt-4o",
  provider: "openai",
  providerId: null,
  connectionId: null,
  weight: 1,
  label: null,
};

beforeEach(() => {
  getPricingForModel.mockReset();
  getPricingForModel.mockResolvedValue(null);
  setTierConfig(DEFAULT_TIER_CONFIG);
  clearTierCache();
  setTierPricingSnapshot(null);
});

describe("manifest routing through the pricing storage boundary", () => {
  it("uses a zero DB price rather than the premium catalog price", async () => {
    getPricingForModel.mockResolvedValue({ input: 0, output: 0 });
    const hints = await generateRoutingHints([target], { messages: [{ content: "Hello" }] });
    expect(getPricingForModel).toHaveBeenCalledExactlyOnceWith("openai", "gpt-4o");
    expect(hints.tierAssignments.get("openai::gpt-4o")).toMatchObject({
      tier: "free",
      costPer1MInput: 0,
      costPer1MOutput: 0,
    });
    expect(hints.eligibleTargets).toEqual([target]);
  });

  it("retains catalog routing when the storage request fails", async () => {
    const catalog = classifyTier("openai", "gpt-4o");
    getPricingForModel.mockRejectedValue(new Error("controlled storage failure"));
    const hints = await generateRoutingHints([target], { messages: [{ content: "Hello" }] });
    expect(getPricingForModel).toHaveBeenCalledExactlyOnceWith("openai", "gpt-4o");
    expect(hints.tierAssignments.get("openai::gpt-4o")).toEqual(catalog);
    expect(hints.eligibleTargets).toEqual([target]);
  });

  it("preserves explicit routing policy without consulting pricing storage", async () => {
    setTierConfig({ providerOverrides: [{ provider: "openai", tier: "cheap" }] });
    const hints = await generateRoutingHints([target], { messages: [{ content: "Hello" }] });
    expect(getPricingForModel).not.toHaveBeenCalled();
    expect(hints.tierAssignments.get("openai::gpt-4o")?.tier).toBe("cheap");
  });
});
