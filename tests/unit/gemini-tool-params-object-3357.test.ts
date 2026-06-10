/**
 * Regression test for #3357 — Vertex AI function-calling fails with
 * "functionDeclaration parameters schema should be of type OBJECT".
 *
 * Gemini/Vertex requires every functionDeclaration.parameters to be an OBJECT-typed
 * schema. GitHub Copilot sends some tools (e.g. terminal_last_command) whose `parameters`
 * is present but lacks a top-level `type: "object"` (just `{ properties }`, a scalar type,
 * or `{}`). buildGeminiTools() must coerce the function-parameters root to an object schema
 * before cleaning, otherwise the typeless schema reaches Vertex and 400s.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

function paramsOf(tools: ReturnType<typeof buildGeminiTools>): any {
  return (tools as any)?.[0]?.functionDeclarations?.[0]?.parameters;
}

describe("buildGeminiTools — function parameters must be an OBJECT schema (#3357)", () => {
  it("coerces a typeless parameters schema ({properties} only) to type:object, keeping props", () => {
    const tools = buildGeminiTools([
      {
        type: "function",
        function: {
          name: "terminal_last_command",
          parameters: { properties: { cmd: { type: "string" } } },
        },
      },
    ]);
    const params = paramsOf(tools);
    assert.equal(params.type, "object");
    assert.ok(params.properties && params.properties.cmd, "original properties preserved");
    assert.equal(params.properties.cmd.type, "string");
  });

  it("coerces a scalar-typed parameters schema to type:object", () => {
    const tools = buildGeminiTools([
      { type: "function", function: { name: "weird_tool", parameters: { type: "string" } } },
    ]);
    assert.equal(paramsOf(tools).type, "object");
  });

  it("coerces an empty parameters object to type:object", () => {
    const tools = buildGeminiTools([
      { type: "function", function: { name: "no_args", parameters: {} } },
    ]);
    assert.equal(paramsOf(tools).type, "object");
  });

  it("defaults missing parameters to a type:object schema", () => {
    const tools = buildGeminiTools([
      { type: "function", function: { name: "bare" } },
    ]);
    assert.equal(paramsOf(tools).type, "object");
  });

  it("leaves an already-valid object parameters schema as type:object with its props", () => {
    const tools = buildGeminiTools([
      {
        type: "function",
        function: {
          name: "search",
          parameters: {
            type: "object",
            properties: { query: { type: "string" } },
            required: ["query"],
          },
        },
      },
    ]);
    const params = paramsOf(tools);
    assert.equal(params.type, "object");
    assert.equal(params.properties.query.type, "string");
    assert.deepEqual(params.required, ["query"]);
  });
});
