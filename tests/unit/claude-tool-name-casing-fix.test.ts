import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { geminiToClaudeResponse } from "../../open-sse/translator/response/gemini-to-claude.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { restoreClaudeToolName } from "../../open-sse/services/claudeCodeToolRemapper.ts";
import { restoreClaudePassthroughToolUseName } from "../../open-sse/utils/stream.ts";
import {
  buildGeminiThoughtSignatureKey,
  getGeminiThoughtSignature,
} from "../../open-sse/services/geminiThoughtSignatureStore.ts";

interface ClaudeEvent {
  type: string;
  index?: number;
  content_block?: { type: string; id?: string; name?: string; input?: unknown };
}

type TranslatorState = Record<string, unknown>;

function firstToolUse(events: ClaudeEvent[] | null): ClaudeEvent["content_block"] {
  return events?.find(
    (e) => e.type === "content_block_start" && e.content_block?.type === "tool_use"
  )?.content_block;
}

describe("Claude Code Tool Name Casing Fixes", () => {
  it("restoreClaudeToolName maps lowercase tool names to PascalCase", () => {
    assert.equal(restoreClaudeToolName("bash"), "Bash");
    assert.equal(restoreClaudeToolName("read"), "Read");
    assert.equal(restoreClaudeToolName("write"), "Write");
    assert.equal(restoreClaudeToolName("websearch"), "WebSearch");
    assert.equal(restoreClaudeToolName("webfetch"), "WebFetch");
    assert.equal(restoreClaudeToolName("agent"), "Agent");
    assert.equal(restoreClaudeToolName("unknown_third_party", null), "unknown_third_party");
  });

  it("restoreClaudeToolName covers apply_patch and applypatch variants", () => {
    assert.equal(restoreClaudeToolName("apply_patch"), "ApplyPatch");
    assert.equal(restoreClaudeToolName("applypatch"), "ApplyPatch");
  });

  it("restoreClaudeToolName covers the tools the 7-entry map missed", () => {
    assert.equal(restoreClaudeToolName("todowrite"), "TodoWrite");
    assert.equal(restoreClaudeToolName("glob"), "Glob");
    assert.equal(restoreClaudeToolName("grep"), "Grep");
    assert.equal(restoreClaudeToolName("task"), "Task");
    assert.equal(restoreClaudeToolName("skill"), "Skill");
    assert.equal(restoreClaudeToolName("multiedit"), "MultiEdit");
    assert.equal(restoreClaudeToolName("askuserquestion"), "AskUserQuestion");
    assert.equal(restoreClaudeToolName("exitplanmode"), "ExitPlanMode");
  });

  it("restoreClaudeToolName keeps canonical TitleCase with no map (#11085 live repro)", () => {
    // Live-tested 2026-08-22: no-map routes (Claude Code → OpenAI-style
    // upstreams) receive the gateway's TitleCase echo and must keep it —
    // downcasing made Claude Code reject its own tools. XML/OpenCode-style
    // lowercase clients are protected by explicit alias maps instead.
    assert.equal(restoreClaudeToolName("TodoWrite"), "TodoWrite");
    assert.equal(restoreClaudeToolName("Read"), "Read");
  });

  it("restoreClaudeToolName prefers toolNameMap over the static map", () => {
    const toolNameMap = new Map([
      ["custom_read", "CustomRead"],
      ["read", "mcp__fs__read"],
    ]);
    assert.equal(restoreClaudeToolName("custom_read", toolNameMap), "CustomRead");
    // A request-side alias wins over the built-in casing table.
    assert.equal(restoreClaudeToolName("read", toolNameMap), "mcp__fs__read");
    // Names absent from the map still fall back to the static table.
    assert.equal(restoreClaudeToolName("bash", toolNameMap), "Bash");
  });

  it("geminiToClaudeResponse normalizes lowercase tool names to PascalCase", () => {
    const chunk = {
      candidates: [
        {
          content: {
            parts: [{ functionCall: { name: "todowrite", args: { todos: [] } } }],
          },
        },
      ],
    };
    const state: TranslatorState = {};
    const block = firstToolUse(geminiToClaudeResponse(chunk, state) as ClaudeEvent[]);
    assert.equal(block?.name, "TodoWrite");
  });

  it("geminiToClaudeResponse honors state.toolNameMap ahead of the casing table", () => {
    const chunk = {
      candidates: [
        {
          content: { parts: [{ functionCall: { name: "read", args: {} } }] },
        },
      ],
    };
    const state: TranslatorState = { toolNameMap: new Map([["read", "mcp__fs__read"]]) };
    const block = firstToolUse(geminiToClaudeResponse(chunk, state) as ClaudeEvent[]);
    assert.equal(block?.name, "mcp__fs__read");
  });

  it("geminiToClaudeResponse still persists thoughtSignature for follow-up turns (#8979)", () => {
    const chunk = {
      candidates: [
        {
          content: {
            parts: [
              { thoughtSignature: "sig-abc123" },
              { functionCall: { id: "call_sig_1", name: "read", args: {} } },
            ],
          },
        },
      ],
    };
    const state: TranslatorState = { signatureNamespace: "ns-test" };
    const block = firstToolUse(geminiToClaudeResponse(chunk, state) as ClaudeEvent[]);
    assert.equal(block?.name, "Read");
    assert.equal(
      getGeminiThoughtSignature(buildGeminiThoughtSignatureKey("ns-test", "call_sig_1")),
      "sig-abc123"
    );
    assert.equal(state.pendingThoughtSignature, null);
  });

  it("geminiToClaudeResponse persists thoughtSignature for text-extracted tool calls", () => {
    const chunk = {
      candidates: [
        {
          content: {
            parts: [
              {
                thoughtSignature: "sig-text-1",
                text: '<tool_call>{"name":"bash","arguments":{"command":"ls"}}</tool_call>',
              },
            ],
          },
        },
      ],
    };
    const state: TranslatorState = { signatureNamespace: "ns-text" };
    const events = geminiToClaudeResponse(chunk, state) as ClaudeEvent[];
    const block = firstToolUse(events);
    assert.equal(block?.name, "Bash");
    assert.ok(block?.id);
    assert.equal(
      getGeminiThoughtSignature(buildGeminiThoughtSignatureKey("ns-text", block!.id!)),
      "sig-text-1"
    );
  });

  it("openaiToClaudeResponse normalizes lowercase tool names to PascalCase", () => {
    const chunk = {
      choices: [
        {
          delta: {
            tool_calls: [{ index: 0, id: "call_123", function: { name: "bash", arguments: "" } }],
          },
        },
      ],
    };
    const state: TranslatorState = { toolCalls: new Map(), nextBlockIndex: 0 };
    const block = firstToolUse(openaiToClaudeResponse(chunk, state) as ClaudeEvent[]);
    assert.equal(block?.name, "Bash");
  });

  it("openaiToClaudeResponse maps lowercase todowrite to TodoWrite", () => {
    const chunk = {
      choices: [
        {
          delta: {
            tool_calls: [
              { index: 0, id: "call_todo", function: { name: "todowrite", arguments: "" } },
            ],
          },
        },
      ],
    };
    const state: TranslatorState = { toolCalls: new Map(), nextBlockIndex: 0 };
    const block = firstToolUse(openaiToClaudeResponse(chunk, state) as ClaudeEvent[]);
    assert.equal(block?.name, "TodoWrite");
  });

  it("openaiToClaudeResponse restores request-side aliases via state.toolNameMap", () => {
    const chunk = {
      choices: [
        {
          delta: {
            tool_calls: [
              { index: 0, id: "call_alias", function: { name: "SubDispatch", arguments: "" } },
            ],
          },
        },
      ],
    };
    const state: TranslatorState = {
      toolCalls: new Map(),
      nextBlockIndex: 0,
      toolNameMap: new Map([["SubDispatch", "subagents"]]),
    };
    const block = firstToolUse(openaiToClaudeResponse(chunk, state) as ClaudeEvent[]);
    assert.equal(block?.name, "subagents");
  });

  it("restoreClaudePassthroughToolUseName maps lowercase names with no toolNameMap", () => {
    const parsed = { content_block: { type: "tool_use", id: "tool_123", name: "read" } };
    assert.equal(restoreClaudePassthroughToolUseName(parsed, null), true);
    assert.equal(parsed.content_block.name, "Read");
  });

  it("restoreClaudePassthroughToolUseName maps lowercase todowrite to TodoWrite", () => {
    const parsed = { content_block: { type: "tool_use", id: "tool_todo", name: "todowrite" } };
    assert.equal(restoreClaudePassthroughToolUseName(parsed, null), true);
    assert.equal(parsed.content_block.name, "TodoWrite");
  });

  it("restoreClaudePassthroughToolUseName respects toolNameMap when provided", () => {
    const parsed = { content_block: { type: "tool_use", id: "tool_123", name: "custom_tool" } };
    const toolNameMap = new Map([["custom_tool", "CustomTool"]]);
    assert.equal(restoreClaudePassthroughToolUseName(parsed, toolNameMap), true);
    assert.equal(parsed.content_block.name, "CustomTool");
  });

  it("restoreClaudePassthroughToolUseName preserves request-declared casing via toolNameMap", () => {
    // With the request map present, PascalCase survives (no #7926 lowercasing).
    const parsed = { content_block: { type: "tool_use", id: "t", name: "TodoWrite" } };
    const toolNameMap = new Map([["TodoWrite", "TodoWrite"]]);
    assert.equal(restoreClaudePassthroughToolUseName(parsed, toolNameMap), false);
    assert.equal(parsed.content_block.name, "TodoWrite");
  });
});
