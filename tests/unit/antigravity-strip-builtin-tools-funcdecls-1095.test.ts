import test from "node:test";
import assert from "node:assert/strict";

import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

// Regression guard for the Antigravity v1internal 400 that fires when a Gemini
// built-in tool (google_search / web_search / googleSearch ...) is sent in the
// same request as functionDeclarations. The Cloud Code envelope must strip the
// built-in tool names out of functionDeclarations before dispatch.
// Inspired-by decolua/9router#1095 (author @vanszs).

type EnvelopeTool = { functionDeclarations?: Array<{ name: string }> };

function declaredToolNames(result: { request: { tools?: EnvelopeTool[] } }): string[] {
  return (result.request.tools ?? []).flatMap((tool) =>
    (tool.functionDeclarations ?? []).map((fn) => fn.name)
  );
}

const CREDS = { projectId: "proj-1" } as never;

test("Antigravity envelope strips built-in tool names mixed with custom functionDeclarations (#1095)", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "Search and read" }],
      tools: [
        {
          type: "function",
          function: { name: "google_search", parameters: { type: "object", properties: {} } },
        },
        {
          type: "function",
          function: { name: "read_file", parameters: { type: "object", properties: {} } },
        },
      ],
    },
    false,
    CREDS
  );

  const names = declaredToolNames(result);
  // Built-in tool name must be gone from functionDeclarations...
  assert.ok(
    !names.includes("google_search") && !names.includes("googleSearch"),
    `expected built-in tool name stripped, got ${JSON.stringify(names)}`
  );
  // ...while the custom declaration survives.
  assert.ok(names.includes("read_file"), `expected custom tool kept, got ${JSON.stringify(names)}`);
  // toolConfig stays set because custom declarations remain.
  assert.deepEqual(result.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
});

test("Antigravity envelope keeps a normal custom-only tool request intact (#1095 regression)", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "Hello" }],
      tools: [
        {
          type: "function",
          function: { name: "weather", parameters: { type: "object", properties: {} } },
        },
      ],
    },
    false,
    CREDS
  );

  const names = declaredToolNames(result);
  assert.deepEqual(names, ["weather"]);
  assert.deepEqual(result.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
});

test("Antigravity envelope drops tools + toolConfig when only built-in tools are present (#1095)", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "Search the web" }],
      tools: [
        {
          type: "function",
          function: { name: "google_search", parameters: { type: "object", properties: {} } },
        },
      ],
    },
    false,
    CREDS
  );

  const names = declaredToolNames(result);
  assert.ok(
    !names.includes("google_search") && !names.includes("googleSearch"),
    `expected no built-in functionDeclarations, got ${JSON.stringify(names)}`
  );
  // No custom declarations remain -> no VALIDATED toolConfig is forced.
  assert.equal(result.request.toolConfig, undefined);
});
