import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { restoreClaudePassthroughToolUseName } from "../../open-sse/utils/stream.ts";

/**
 * #12721: a Claude SSE passthrough must never hand the client a tool_use name
 * it did not declare. A mapless restoreClaudeToolName "upgrades" known Claude
 * Code names (bash -> Bash), which breaks third-party Anthropic-format clients
 * (pi/OpenCode on claude-format executors like devin-cli-agentic): tool
 * dispatch fails client-side and the echoed history hard-fails with
 * undeclared_historical_tool. Genuine Claude Code clients (declared PascalCase)
 * must still be protected from OpenAI-style upstreams that downcase names
 * (#7926).
 */
describe("restoreClaudePassthroughToolUseName — declared-casing normalization (#12721)", () => {
  const anthropicTools = (names: string[]) =>
    names.map((name) => ({
      name,
      description: "d",
      input_schema: { type: "object", properties: {} },
    }));
  const toolUseBlock = (name: string) => ({
    type: "content_block_start",
    index: 0,
    content_block: { type: "tool_use", id: "toolu_01", name, input: {} },
  });

  it("keeps a lowercase name verbatim when the client declared it lowercase (no map)", () => {
    for (const name of ["bash", "read", "edit", "write", "grep", "glob"]) {
      const parsed = toolUseBlock(name);
      assert.equal(
        restoreClaudePassthroughToolUseName(
          parsed,
          null,
          anthropicTools(["bash", "read", "edit", "write", "grep", "glob"])
        ),
        false
      );
      assert.equal(parsed.content_block.name, name);
    }
  });

  it("does NOT upgrade bash -> Bash when the client declared lowercase (no map) — the #12721 leak", () => {
    const parsed = toolUseBlock("bash");
    assert.equal(
      restoreClaudePassthroughToolUseName(parsed, null, anthropicTools(["bash"])),
      false
    );
    assert.equal(parsed.content_block.name, "bash");
  });

  it("downcases an upstream PascalCase echo back to the declared lowercase spelling (no map)", () => {
    const parsed = toolUseBlock("Bash");
    assert.equal(restoreClaudePassthroughToolUseName(parsed, null, anthropicTools(["bash"])), true);
    assert.equal(parsed.content_block.name, "bash");
  });

  it("keeps Claude Code clients working: upstream downcase restored to declared PascalCase (#7926)", () => {
    const parsed = toolUseBlock("bash");
    assert.equal(restoreClaudePassthroughToolUseName(parsed, null, anthropicTools(["Bash"])), true);
    assert.equal(parsed.content_block.name, "Bash");
  });

  it("prefers the alias map (renamed -> original) over declared casing", () => {
    const parsed = toolUseBlock("Bash");
    const map = new Map([["Bash", "bash"]]);
    assert.equal(restoreClaudePassthroughToolUseName(parsed, map, anthropicTools(["Bash"])), true);
    assert.equal(parsed.content_block.name, "bash");
  });

  it("proxy_ ledger (claude passthrough) must not trigger the canonical upgrade — the #12721 live leak", () => {
    // buildClaudePassthroughToolNameMap always emits proxy_<name> -> <name>
    // for claude passthrough; a non-empty ledger used to route through
    // restoreClaudeToolName whose canonical fallback upgraded bash -> Bash.
    const parsed = toolUseBlock("bash");
    const map = new Map([
      ["proxy_bash", "bash"],
      ["proxy_read", "read"],
    ]);
    assert.equal(
      restoreClaudePassthroughToolUseName(parsed, map, anthropicTools(["bash", "read"])),
      false
    );
    assert.equal(parsed.content_block.name, "bash");
  });

  it("proxy_ ledger still restores prefixed echoes", () => {
    const parsed = toolUseBlock("proxy_bash");
    const map = new Map([["proxy_bash", "bash"]]);
    assert.equal(restoreClaudePassthroughToolUseName(parsed, map, anthropicTools(["bash"])), true);
    assert.equal(parsed.content_block.name, "bash");
  });

  it("leaves undeclared names verbatim instead of canonicalizing them (no map)", () => {
    const parsed = toolUseBlock("memory_store");
    assert.equal(
      restoreClaudePassthroughToolUseName(parsed, null, anthropicTools(["bash"])),
      false
    );
    assert.equal(parsed.content_block.name, "memory_store");
  });

  it("reads OpenAI-style function.name declarations too", () => {
    const parsed = toolUseBlock("bash");
    const tools = [{ type: "function", function: { name: "bash", parameters: {} } }];
    assert.equal(restoreClaudePassthroughToolUseName(parsed, null, tools), false);
    assert.equal(parsed.content_block.name, "bash");
  });

  it("ignores non-tool_use blocks", () => {
    const parsed = {
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "hello" },
    };
    assert.equal(
      restoreClaudePassthroughToolUseName(parsed, null, anthropicTools(["bash"])),
      false
    );
  });
});
