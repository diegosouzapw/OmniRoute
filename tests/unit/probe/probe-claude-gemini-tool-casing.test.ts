import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../../open-sse/translator/request/claude-to-gemini.ts");
const { geminiToClaudeResponse } =
  await import("../../../open-sse/translator/response/gemini-to-claude.ts");

// Claude Code (Anthropic Messages format) → OmniRoute → Gemini.
//
// Gemini always lowercases tool names in its functionCall responses, so the
// round trip only works if the request translator publishes a lowercase alias
// ("read" → "Read") in `_toolNameMap`. Claude Code registers its tools in
// TitleCase and rejects anything else with "No such tool available: read".
//
// The identity-entry filter in claude-to-gemini.ts dropped `Read → Read`
// (sanitized === original), so no alias reached the response translator and
// `normalizeToolName()` — whose REVERSE_MAP is keyed by TitleCase — left the
// lowercase name untouched. Same class as #9568, which only fixed the
// openai-to-gemini request path.

function claudeBodyWithTools(names: string[]) {
  return {
    messages: [{ role: "user", content: "read package.json" }],
    tools: names.map((name) => ({
      name,
      description: `${name} tool`,
      input_schema: { type: "object", properties: {} },
    })),
  };
}

function firstToolUseName(events) {
  for (const event of events || []) {
    if (event?.type === "content_block_start" && event.content_block?.type === "tool_use") {
      return event.content_block.name;
    }
  }
  return null;
}

function geminiFunctionCallChunk(name: string) {
  return {
    candidates: [
      {
        content: { parts: [{ functionCall: { name, args: { file_path: "package.json" } } }] },
        finishReason: "STOP",
      },
    ],
  };
}

test("claude-to-gemini: TitleCase tool name publishes a lowercase alias in _toolNameMap", () => {
  const translated = claudeToGeminiRequest("gemini-2.5-pro", claudeBodyWithTools(["Read"]), false);

  const map = translated._toolNameMap;
  assert.ok(map instanceof Map, "_toolNameMap must be present so the response can be remapped");
  assert.equal(
    map.get("read"),
    "Read",
    "Gemini lowercases functionCall names — the map needs a 'read' key to restore 'Read'"
  );
});

test("Claude Code round trip: Gemini's lowercase 'read' is restored to 'Read'", () => {
  const translated = claudeToGeminiRequest("gemini-2.5-pro", claudeBodyWithTools(["Read"]), true);

  // chatCore extracts `_toolNameMap` from the translated request body and hands
  // it to the response translator as `state.toolNameMap`.
  const state = { toolNameMap: translated._toolNameMap, contentBlockIndex: 0 };
  const events = geminiToClaudeResponse(geminiFunctionCallChunk("read"), state);

  assert.equal(
    firstToolUseName(events),
    "Read",
    "Claude Code registers 'Read'; emitting 'read' fails with 'No such tool available: read'"
  );
});

test("Claude Code round trip: multiple TitleCase tools survive the lowercase round trip", () => {
  const translated = claudeToGeminiRequest(
    "gemini-2.5-pro",
    claudeBodyWithTools(["Read", "Bash", "WebFetch"]),
    true
  );

  for (const [lowered, expected] of [
    ["read", "Read"],
    ["bash", "Bash"],
    ["webfetch", "WebFetch"],
  ]) {
    const state = { toolNameMap: translated._toolNameMap, contentBlockIndex: 0 };
    const events = geminiToClaudeResponse(geminiFunctionCallChunk(lowered), state);
    assert.equal(firstToolUseName(events), expected, `${lowered} should restore to ${expected}`);
  }
});

test("claude-to-gemini: names actually sanitized for Gemini keep their original mapping", () => {
  // A tool name Gemini cannot accept verbatim must still map back to the original.
  const translated = claudeToGeminiRequest(
    "gemini-2.5-pro",
    claudeBodyWithTools(["mcp__server__do-thing"]),
    false
  );

  const map = translated._toolNameMap;
  assert.ok(map instanceof Map, "sanitized names must still publish a map");
  const restored = [...map.values()];
  assert.ok(
    restored.includes("mcp__server__do-thing"),
    "the original (unsanitized) name must remain reachable for the response translator"
  );
});
