import { describe, it, expect } from "vitest";
import { syncPricingInput, syncPricingTool, MCP_TOOLS, MCP_TOOL_MAP } from "../schemas/tools.ts";

describe("omniroute_sync_pricing MCP tool schema", () => {
  it("should be registered in MCP_TOOLS", () => {
    const tool = MCP_TOOLS.find((t) => t.name === "omniroute_sync_pricing");
    expect(tool).toBeDefined();
    expect(tool?.phase).toBe(2);
  });

  it("should be in MCP_TOOL_MAP", () => {
    expect(MCP_TOOL_MAP["omniroute_sync_pricing"]).toBeDefined();
  });

  it("should require pricing:write scope", () => {
    expect(syncPricingTool.scopes).toContain("pricing:write");
  });

  it("should have full audit level", () => {
    expect(syncPricingTool.auditLevel).toBe("full");
  });

  it("should validate empty input (all fields optional)", () => {
    const result = syncPricingInput.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should validate input with sources array", () => {
    const result = syncPricingInput.safeParse({ sources: ["litellm"] });
    expect(result.success).toBe(true);
  });

  it("should validate input with dryRun", () => {
    const result = syncPricingInput.safeParse({ dryRun: true });
    expect(result.success).toBe(true);
  });

  it("should validate full input", () => {
    const result = syncPricingInput.safeParse({
      sources: ["litellm"],
      dryRun: false,
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid sources type", () => {
    const result = syncPricingInput.safeParse({ sources: "litellm" });
    expect(result.success).toBe(false);
  });

  it("should reject invalid dryRun type", () => {
    const result = syncPricingInput.safeParse({ dryRun: "yes" });
    expect(result.success).toBe(false);
  });

  it("should point to correct source endpoint", () => {
    expect(syncPricingTool.sourceEndpoints).toContain("/api/pricing/sync");
  });
});
