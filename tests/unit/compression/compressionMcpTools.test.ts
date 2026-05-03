import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmpDir = mkdtempSync(join(tmpdir(), "omniroute-mcp-test-"));
process.env.DATA_DIR = tmpDir;

const {
  handleCompressionStatus,
  handleCompressionConfigure,
  handleSetCompressionEngine,
  handleListCompressionCombos,
  handleCompressionComboStats,
} = await import("../../../open-sse/mcp-server/tools/compressionTools.ts");
const {
  compressionConfigureTool,
  compressionStatusTool,
  setCompressionEngineTool,
  listCompressionCombosTool,
  compressionComboStatsTool,
} = await import("../../../open-sse/mcp-server/schemas/tools.ts");
const { maybeCompressMcpDescription, resetMcpDescriptionCompressionStats } =
  await import("../../../open-sse/mcp-server/descriptionCompressor.ts");

describe("compression MCP tool schemas", () => {
  it("uses canonical read/write compression scopes", () => {
    assert.deepEqual(compressionStatusTool.scopes, ["read:compression"]);
    assert.deepEqual(compressionConfigureTool.scopes, ["write:compression"]);
    assert.deepEqual(setCompressionEngineTool.scopes, ["write:compression"]);
    assert.deepEqual(listCompressionCombosTool.scopes, ["read:compression"]);
    assert.deepEqual(compressionComboStatsTool.scopes, ["read:compression"]);
  });
});

describe("handleCompressionStatus", () => {
  it("returns an object with enabled field", async () => {
    const result = await handleCompressionStatus({});
    assert.ok("enabled" in result);
    assert.equal(typeof result.enabled, "boolean");
  });

  it("returns strategy string", async () => {
    const result = await handleCompressionStatus({});
    assert.equal(typeof result.strategy, "string");
  });

  it("returns settings with maxTokens number", async () => {
    const result = await handleCompressionStatus({});
    assert.ok("settings" in result);
    assert.equal(typeof result.settings.maxTokens, "number");
  });

  it("returns settings with targetRatio 0.7", async () => {
    const result = await handleCompressionStatus({});
    assert.equal(result.settings.targetRatio, 0.7);
  });

  it("returns analytics with totalRequests number", async () => {
    const result = await handleCompressionStatus({});
    assert.ok("analytics" in result);
    assert.equal(typeof result.analytics.totalRequests, "number");
  });

  it("returns analytics with tokensSaved number", async () => {
    const result = await handleCompressionStatus({});
    assert.equal(typeof result.analytics.tokensSaved, "number");
  });

  it("returns cacheStats as null or object", async () => {
    const result = await handleCompressionStatus({});
    assert.ok(result.cacheStats === null || typeof result.cacheStats === "object");
  });

  it("returns analytics compressedRequests as number", async () => {
    const result = await handleCompressionStatus({});
    assert.equal(typeof result.analytics.compressedRequests, "number");
  });

  it("labels MCP description savings as metadata estimates, not provider usage", async () => {
    const result = await handleCompressionStatus({});
    assert.equal(result.analytics.mcpDescriptionCompression.source, "mcp_metadata_estimate");
    assert.equal(result.analytics.mcpDescriptionCompression.notProviderUsage, true);
    assert.equal(typeof result.analytics.mcpDescriptionCompression.charsBefore, "number");
    assert.equal(typeof result.analytics.mcpDescriptionCompression.charsAfter, "number");
  });

  it("snapshots MCP description savings into analytics separately", async () => {
    resetMcpDescriptionCompressionStats();
    const compressed = maybeCompressMcpDescription(
      "The function returns the current weather for a city and the detailed forecast summary.",
      { enabled: true }
    );
    assert.match(compressed, /weather/i);

    const result = await handleCompressionStatus({});
    assert.ok(result.analytics.mcpDescriptionCompression.estimatedTokensSaved > 0);
    assert.ok(result.analytics.mcpDescriptionCompression.persistedEstimatedTokensSaved > 0);
    assert.ok(result.analytics.mcpDescriptionCompression.persistedSnapshots > 0);

    const stats = await handleCompressionComboStats({ since: "all" });
    const mcp = stats.mcpDescriptionCompression as { estimatedTokensSaved?: number };
    const realUsage = stats.realUsage as { bySource?: Record<string, number> };
    assert.ok((mcp.estimatedTokensSaved ?? 0) > 0);
    assert.equal(realUsage.bySource?.mcp_metadata_estimate, undefined);
  });
});

describe("handleCompressionConfigure", () => {
  it("returns success=true when called with empty args", async () => {
    const result = await handleCompressionConfigure({});
    assert.equal(result.success, true);
  });

  it("returns settings object after configure", async () => {
    const result = await handleCompressionConfigure({});
    assert.ok("settings" in result);
    assert.equal(typeof result.settings.enabled, "boolean");
  });

  it("returns updated object", async () => {
    const result = await handleCompressionConfigure({ enabled: true });
    assert.ok("updated" in result);
  });

  it("sets enabled=false and returns success", async () => {
    const result = await handleCompressionConfigure({ enabled: false });
    assert.equal(result.success, true);
  });

  it("sets strategy and returns success", async () => {
    const result = await handleCompressionConfigure({ strategy: "aggressive" });
    assert.equal(result.success, true);
  });

  it("sets RTK and stacked strategies", async () => {
    const rtkResult = await handleCompressionConfigure({ strategy: "rtk" });
    const stackedResult = await handleCompressionConfigure({ strategy: "stacked" });
    assert.equal(rtkResult.success, true);
    assert.equal(stackedResult.success, true);
  });

  it("sets maxTokens and returns success", async () => {
    const result = await handleCompressionConfigure({ maxTokens: 8000 });
    assert.equal(result.success, true);
    assert.ok("updated" in result);
  });

  it("returns settings.maxTokens as number", async () => {
    const result = await handleCompressionConfigure({ maxTokens: 2000 });
    assert.equal(typeof result.settings.maxTokens, "number");
  });

  it("returns settings.targetRatio as 0.7", async () => {
    const result = await handleCompressionConfigure({});
    assert.equal(result.settings.targetRatio, 0.7);
  });
});

describe("compression MCP RTK/combo tools", () => {
  it("sets RTK engine through MCP", async () => {
    const result = await handleSetCompressionEngine({ engine: "rtk", rtkIntensity: "aggressive" });
    assert.equal(result.success, true);
    assert.equal(result.settings.defaultMode, "rtk");
    assert.equal((result.settings.rtkConfig as { intensity?: string }).intensity, "aggressive");
  });

  it("lists compression combos", async () => {
    const result = await handleListCompressionCombos();
    assert.ok(Array.isArray(result.combos));
    assert.ok(result.combos.length >= 1);
  });

  it("returns combo stats summary", async () => {
    const result = await handleCompressionComboStats({ since: "all" });
    assert.ok("byCompressionCombo" in result);
    assert.ok("byEngine" in result);
  });
});
