import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#222: the Responses API supports "hosted" tools
// that carry no explicit `name` field. The Responses->Chat catch-all branch emitted
// `name: toString(tool.name)`, and `toString(undefined)` returns "", producing an
// anonymous functionDeclaration. After the OpenAI->Gemini step Gemini rejected the
// whole request with a 400:
//   "...function_declarations[N].name: Invalid function name."
// (OmniRoute already throws for *unknown* hosted tool types up front, but a
// whitelisted-type tool — function/custom/command — that arrives without a name
// still fell through the catch-all and produced `name: ""`.)
// Fix: skip any Responses tool that reaches the catch-all without a non-empty
// string name; named tools are unaffected.
const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

test("#222: a Responses tool reaching the catch-all without a name is dropped, not emitted nameless", () => {
  const body = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [
      {
        // Named function tool — must survive.
        type: "function",
        name: "read_file",
        description: "Read a file",
        parameters: { type: "object", properties: { path: { type: "string" } } },
      },
      {
        // Whitelisted "custom" hosted tool with no `name` — passes the up-front
        // validation guard, then reaches the catch-all. Must be filtered out
        // rather than emitted with name: "".
        type: "custom",
      },
    ],
  };

  const out = openaiResponsesToOpenAIRequest("gemini-2.5-pro", body, false, {}) as {
    tools: { type: string; function: { name: string } }[];
  };

  // Only the named tool survives; the nameless hosted tool is gone.
  const names = out.tools.map((t) => t.function?.name).sort();
  assert.deepEqual(names, ["read_file"]);

  // No tool may carry an empty/undefined name — the exact bug Gemini rejected.
  assert.equal(
    out.tools.some((t) => !t.function?.name || t.function.name.trim() === ""),
    false,
    "no nameless functionDeclaration must be emitted"
  );
});

test("#222: a function-type Responses tool with a whitespace-only name is also dropped", () => {
  const body = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [{ type: "function", name: "   " }],
  };

  const out = openaiResponsesToOpenAIRequest("gemini-2.5-pro", body, false, {}) as {
    tools: unknown[];
  };

  assert.equal(out.tools.length, 0, "a whitespace-only name yields no tools");
});
