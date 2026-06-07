import { describe, it, expect } from "vitest";
import {
  MCP_TOOLS,
  MCP_TOOL_MAP,
  setRoutingStrategyInput,
  setRoutingStrategyTool,
} from "../schemas/tools.ts";

describe("omniroute_set_routing_strategy MCP tool schema", () => {
  it("should be registered in MCP_TOOLS", () => {
    const tool = MCP_TOOLS.find((t) => t.name === "omniroute_set_routing_strategy");
    expect(tool).toBeDefined();
    expect(tool?.phase).toBe(2);
  });

  it("should be available in MCP_TOOL_MAP", () => {
    expect(MCP_TOOL_MAP["omniroute_set_routing_strategy"]).toBeDefined();
  });

  it("should require write:combos scope", () => {
    expect(setRoutingStrategyTool.scopes).toContain("write:combos");
  });

  it("should validate a standard strategy payload", () => {
    const result = setRoutingStrategyInput.safeParse({
      comboId: "my-combo",
      strategy: "cost-optimized",
    });
    expect(result.success).toBe(true);
  });

  it("should validate auto strategy with autoRoutingStrategy", () => {
    const result = setRoutingStrategyInput.safeParse({
      comboId: "my-combo",
      strategy: "auto",
      autoRoutingStrategy: "latency",
    });
    expect(result.success).toBe(true);
  });

  it("should validate SLA-aware auto strategy", () => {
    const result = setRoutingStrategyInput.safeParse({
      comboId: "my-combo",
      strategy: "auto",
      autoRoutingStrategy: "sla-aware",
    });
    expect(result.success).toBe(true);
  });

  it("should validate SLA auto strategy alias", () => {
    const result = setRoutingStrategyInput.safeParse({
      comboId: "my-combo",
      strategy: "auto",
      autoRoutingStrategy: "sla",
    });
    expect(result.success).toBe(true);
  });

  it("should reject unknown strategy", () => {
    const result = setRoutingStrategyInput.safeParse({
      comboId: "my-combo",
      strategy: "unknown-strategy",
    });
    expect(result.success).toBe(false);
  });
});
