import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");

/**
 * Regression test for decolua/9router#11444:
 *
 * OpencodeExecutor.transformRequest contained a second hardcoded tool-list
 * truncation (`mb.tools.slice(0, 128)`) on top of the one PR #6193 already
 * removed from the chatCore layer. When a client (opencode/claude-code) sends
 * >128 tools, the opencode executor silently dropped every tool after the
 * 128th (e.g. task, skill, write, read), leaving subagent tasks paralyzed.
 *
 * Tool-list limiting is the chatCore upstreamBody.truncateToolList()'s job
 * (per-provider known/effective limits via toolLimitDetector), NOT the
 * executor's. This test pins that OpencodeExecutor.transformRequest forwards
 * a 150+ tool array intact.
 */
describe("OpencodeExecutor — no hardcoded 128-tool truncation (#11444)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const CREDENTIALS = { apiKey: "test-key" } as Record<string, unknown>;

  function buildTools(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      type: "function",
      function: {
        name: `tool_${i}`,
        description: `tool number ${i}`,
        parameters: { type: "object", properties: {} },
      },
    }));
  }

  function bodyWithTools(tools: unknown[]) {
    return {
      model: "oc/kimi-k2.6",
      stream: true,
      messages: [{ role: "user", content: "hi" }],
      tools,
    };
  }

  it("preserves all 150 tools (no slice(0,128))", () => {
    const tools = buildTools(150);
    const out = executor.transformRequest(
      "oc/kimi-k2.6",
      bodyWithTools(tools),
      true,
      CREDENTIALS
    ) as { tools?: unknown[] };

    assert.ok(Array.isArray(out.tools), "tools array preserved");
    assert.equal(out.tools.length, 150, "all 150 tools must survive transformRequest");
  });

  it("preserves all 300 tools (well beyond the old hardcoded 128 cap)", () => {
    const tools = buildTools(300);
    const out = executor.transformRequest(
      "oc/kimi-k2.6",
      bodyWithTools(tools),
      true,
      CREDENTIALS
    ) as { tools?: unknown[] };

    assert.ok(Array.isArray(out.tools));
    assert.equal(out.tools.length, 300, "all 300 tools must survive transformRequest");
  });

  it("preserves tool order (first AND last tool intact)", () => {
    const tools = buildTools(200);
    const out = executor.transformRequest(
      "oc/kimi-k2.6",
      bodyWithTools(tools),
      true,
      CREDENTIALS
    ) as { tools?: Array<{ function: { name: string } }> };

    assert.equal(out.tools![0].function.name, "tool_0");
    assert.equal(
      out.tools![199].function.name,
      "tool_199",
      "the 200th tool (dropped by the old 128-cap) must still be present"
    );
  });

  it("preserves empty tools array intact", () => {
    const out = executor.transformRequest(
      "oc/kimi-k2.6",
      { model: "oc/kimi-k2.6", messages: [{ role: "user", content: "hi" }], tools: [] },
      true,
      CREDENTIALS
    ) as { tools?: unknown[] };

    assert.equal(out.tools?.length, 0, "empty tools array must be preserved intact");
  });

  it("preserves tool objects content exactly without mutation", () => {
    const tools = [
      { type: "function", function: { name: "custom_tool", description: "desc" } },
    ];
    const out = executor.transformRequest(
      "oc/kimi-k2.6",
      { model: "oc/kimi-k2.6", messages: [{ role: "user", content: "hi" }], tools },
      true,
      CREDENTIALS
    ) as { tools?: typeof tools };

    assert.deepEqual(out.tools, tools, "tool objects must survive transform unchanged");
  });

  it("is a no-op when tools is absent", () => {
    const out = executor.transformRequest(
      "oc/kimi-k2.6",
      { model: "oc/kimi-k2.6", messages: [{ role: "user", content: "hi" }] },
      true,
      CREDENTIALS
    ) as { tools?: unknown[] };

    assert.equal(out.tools, undefined, "no tools key should be introduced");
  });
});
