/**
 * #9008 — Claude Code → OmniRoute → Gemini/Antigravity must preserve the
 * caller's PascalCase tool names in tool_use responses.
 *
 * Regression from #7926: gemini-to-claude applied REVERSE_MAP unconditionally
 * (Read → read, WebSearch → websearch). Claude Code then rejects the call with
 * "No such tool available: read".
 *
 * When the request declared PascalCase tools, the response must restore that
 * exact casing — including when the upstream model echoes a lowercased name.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { restoreClaudeToolName } = await import("../../open-sse/services/claudeCodeToolRemapper.ts");

function toolUseName(events: Array<Record<string, unknown>> | null): string | undefined {
  const start = (events || []).find(
    (e) =>
      e.type === "content_block_start" &&
      (e.content_block as Record<string, unknown> | undefined)?.type === "tool_use"
  );
  return (start?.content_block as Record<string, unknown> | undefined)?.name as string | undefined;
}

test("#9008 restoreClaudeToolName: preserves PascalCase from the request map", () => {
  const map = new Map<string, string>([
    ["Read", "Read"],
    ["WebSearch", "WebSearch"],
  ]);
  assert.equal(restoreClaudeToolName("Read", map), "Read");
  assert.equal(restoreClaudeToolName("WebSearch", map), "WebSearch");
});

test("#9008 restoreClaudeToolName: maps lowercased upstream names back to declared PascalCase", () => {
  const map = new Map<string, string>([
    ["Read", "Read"],
    ["WebSearch", "WebSearch"],
  ]);
  assert.equal(restoreClaudeToolName("read", map), "Read");
  assert.equal(restoreClaudeToolName("websearch", map), "WebSearch");
});

test("#9008 restoreClaudeToolName: keeps canonical TitleCase when no request map (#11085 live repro)", () => {
  // Live-tested 2026-08-22 (glm via opencode-go → /v1/messages): the gateway
  // echoed Bash/Read TitleCase and claude-to-openai ships no _toolNameMap;
  // downcasing here made Claude Code reject its own tools. Legacy lowercase
  // clients are protected by explicit alias maps instead of blind downcasing.
  assert.equal(restoreClaudeToolName("Bash", null), "Bash");
  assert.equal(restoreClaudeToolName("Read", undefined), "Read");
});

test("#9008 Gemini → Claude: PascalCase tool_use survives when upstream echoes TitleCase", () => {
  const state = {
    toolNameMap: new Map<string, string>([
      ["Read", "Read"],
      ["WebSearch", "WebSearch"],
    ]),
  };
  const result = geminiToClaudeResponse(
    {
      responseId: "resp-9008-a",
      modelVersion: "gemini-3.6-flash",
      candidates: [
        {
          content: {
            parts: [{ functionCall: { name: "Read", args: { path: "/tmp/a" } } }],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  assert.equal(toolUseName(result), "Read");
});

test("#9008 Gemini → Claude: lowercased upstream name restored to declared PascalCase", () => {
  const state = {
    toolNameMap: new Map<string, string>([
      ["Read", "Read"],
      ["WebSearch", "WebSearch"],
    ]),
  };
  const result = geminiToClaudeResponse(
    {
      responseId: "resp-9008-b",
      modelVersion: "gemini-3.6-flash",
      candidates: [
        {
          content: {
            parts: [{ functionCall: { name: "websearch", args: { query: "omniroute" } } }],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  assert.equal(toolUseName(result), "WebSearch");
});

test("#9008 Claude → Gemini keeps identity toolNameMap entries for PascalCase tools", () => {
  const result = claudeToGeminiRequest(
    "gemini-3.6-flash",
    {
      messages: [{ role: "user", content: "read the file" }],
      tools: [
        {
          name: "Read",
          description: "Read a file",
          input_schema: { type: "object", properties: { path: { type: "string" } } },
        },
        {
          name: "WebSearch",
          description: "Search the web",
          input_schema: { type: "object", properties: { query: { type: "string" } } },
        },
      ],
    },
    false
  );

  assert.ok(result._toolNameMap instanceof Map);
  assert.equal(result._toolNameMap.get("Read"), "Read");
  assert.equal(result._toolNameMap.get("WebSearch"), "WebSearch");
});

test("#9008 OpenAI → Gemini keeps identity toolNameMap entries for PascalCase tools", () => {
  const result = openaiToGeminiRequest(
    "gemini-3.6-flash",
    {
      messages: [{ role: "user", content: "search" }],
      tools: [
        {
          type: "function",
          function: {
            name: "WebSearch",
            description: "Search the web",
            parameters: { type: "object", properties: { query: { type: "string" } } },
          },
        },
      ],
    },
    false
  );

  assert.ok((result as { _toolNameMap?: Map<string, string> })._toolNameMap instanceof Map);
  assert.equal(
    (result as { _toolNameMap: Map<string, string> })._toolNameMap.get("WebSearch"),
    "WebSearch"
  );
});
