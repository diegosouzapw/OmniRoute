/**
 * Anthropic server (built-in) tools must keep their literal `name` in EVERY
 * request section — tools[], message-history `tool_use` blocks, and
 * `tool_choice` — not just in the tools array.
 *
 * Anthropic's server tools are identified by a versioned `type`
 * (e.g. `web_search_20250305`) paired with a FIXED literal `name`
 * (`web_search`, `bash`, …) that the API validates as a pair. The tools-array
 * rewrite is already guarded by `isAnthropicServerToolType`, but the
 * message-history and `tool_choice` rewrites were not. That asymmetry renames
 * only the history/tool_choice reference (`web_search` → `WebSearch`) while
 * tools[] keeps the literal `web_search`, so Anthropic rejects the request:
 *
 *   [400] Tool 'WebSearch' not found in provided tools
 *
 * Same class for the fixed Claude Code rename map: `bash_20250124` carries the
 * literal name `bash`, which `remapToolNamesInRequest` would rewrite to `Bash`
 * (→ `tools.0.bash_20250124.name: Input should be 'bash'`).
 *
 * Regression surfaced on Claude Code 2.1.x native web-search calls; same class
 * as CLIProxyAPI #1094/#1179.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cloakThirdPartyToolNames,
  remapToolNamesInRequest,
} from "../../open-sse/services/claudeCodeToolRemapper.ts";

type AnyRecord = Record<string, unknown>;

describe("cloakThirdPartyToolNames — server-tool names in message history", () => {
  it("keeps a history tool_use reference to a declared web_search server tool", () => {
    const body: AnyRecord = {
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "web_search", input: { query: "x" } }],
        },
      ],
    };
    cloakThirdPartyToolNames(body);
    assert.equal((body.tools as AnyRecord[])[0].name, "web_search");
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "web_search");
  });

  it("keeps a tool_choice reference to a declared web_search server tool", () => {
    const body: AnyRecord = {
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      tool_choice: { type: "tool", name: "web_search" },
    };
    cloakThirdPartyToolNames(body);
    assert.equal((body.tool_choice as AnyRecord).name, "web_search");
  });

  it("still cloaks a third-party history tool_use next to a server tool", () => {
    const body: AnyRecord = {
      tools: [{ type: "web_search_20250305", name: "web_search" }, { name: "mixture_of_agents" }],
      messages: [
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "toolu_1", name: "web_search", input: {} },
            { type: "tool_use", id: "toolu_2", name: "mixture_of_agents", input: {} },
          ],
        },
      ],
    };
    cloakThirdPartyToolNames(body);
    const blocks = (body.messages as AnyRecord[])[0].content as AnyRecord[];
    assert.equal(blocks[0].name, "web_search");
    assert.equal(blocks[1].name, "MixtureOfAgents");
    assert.deepEqual(
      (body.tools as AnyRecord[]).map((t) => t.name),
      ["web_search", "MixtureOfAgents"]
    );
  });

  it("still cloaks a snake_case history name when no server tool declares it", () => {
    const body: AnyRecord = {
      tools: [{ name: "web_search", input_schema: { type: "object" } }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "web_search", input: {} }],
        },
      ],
    };
    cloakThirdPartyToolNames(body);
    // Plain custom tool named web_search (no server type) remains cloakable —
    // symmetrically in tools[] and history.
    assert.equal((body.tools as AnyRecord[])[0].name, "WebSearch");
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "WebSearch");
  });
});

describe("remapToolNamesInRequest — Anthropic server tools", () => {
  it("does not rename a bash server tool to Bash in tools[]", () => {
    const body: AnyRecord = {
      tools: [{ type: "bash_20250124", name: "bash" }],
    };
    remapToolNamesInRequest(body);
    assert.equal((body.tools as AnyRecord[])[0].name, "bash");
    assert.equal((body._toolNameMap as Map<string, string> | undefined)?.size ?? 0, 0);
  });

  it("does not rename history/tool_choice references to a declared bash server tool", () => {
    const body: AnyRecord = {
      tools: [{ type: "bash_20250124", name: "bash" }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "bash", input: { command: "ls" } }],
        },
      ],
      tool_choice: { type: "tool", name: "bash" },
    };
    remapToolNamesInRequest(body);
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "bash");
    assert.equal((body.tool_choice as AnyRecord).name, "bash");
  });

  it("tolerates null entries in tools[] without throwing", () => {
    const body: AnyRecord = {
      tools: [null, { type: "bash_20250124", name: "bash" }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "bash", input: {} }],
        },
      ],
    };
    remapToolNamesInRequest(body);
    assert.equal((body.tools as AnyRecord[])[1].name, "bash");
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "bash");
  });

  it("still renames a plain lowercase custom bash tool to Bash", () => {
    const body: AnyRecord = {
      tools: [{ name: "bash", input_schema: { type: "object" } }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "bash", input: {} }],
        },
      ],
    };
    remapToolNamesInRequest(body);
    assert.equal((body.tools as AnyRecord[])[0].name, "Bash");
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "Bash");
  });
});
