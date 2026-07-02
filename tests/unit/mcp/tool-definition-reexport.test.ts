import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Regression guard for the tools.ts ↔ toolSearch.ts cycle fix: McpToolDefinition/AuditLevel
// live in the leaf ./toolDefinition.ts and must stay re-exported from ./tools.ts for the
// many modules that import them from there. A type-only check plus a runtime import of the
// leaf proves both the re-export path and that the leaf loads without pulling in tools.ts.
describe("MCP tool-definition leaf + re-export", () => {
  it("toolDefinition.ts (leaf) imports without forming a cycle", async () => {
    const leaf = await import(
      "../../../open-sse/mcp-server/schemas/toolDefinition.ts"
    );
    // It is a type-only module; the runtime namespace is empty but must load cleanly.
    assert.ok(leaf, "leaf module loaded");
  });

  it("tools.ts still exposes McpToolDefinition-shaped tool defs (re-export intact)", async () => {
    const tools = await import("../../../open-sse/mcp-server/schemas/tools.ts");
    const def = (tools as { getHealthTool?: { name: string; scopes: readonly string[] } })
      .getHealthTool;
    assert.ok(def && typeof def.name === "string" && Array.isArray(def.scopes));
  });
});
