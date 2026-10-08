import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isGeminiModelId, sanitizeToolInputSchemas } from "../src/shared/gemini.js";

describe("Gemini tool-schema sanitising", () => {
  it("recognises the routing forms a Gemini model arrives under", () => {
    for (const id of [
      "gemini-2.5-flash",
      "models/gemini-1.5-pro",
      "google-vertex/gemini-2.0",
      "GEMINI-PRO",
    ]) {
      assert.equal(isGeminiModelId(id), true, id);
    }
    for (const id of ["gpt-5", "claude-opus-5", "", "gemma-2-9b"]) {
      assert.equal(isGeminiModelId(id), false, id);
    }
  });

  it("strips the keywords Gemini rejects, however deep they sit", () => {
    const tools = [
      {
        type: "function" as const,
        name: "edit",
        inputSchema: {
          $schema: "https://json-schema.org/draft-07/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            path: { type: "string" },
            nested: {
              type: "object",
              additionalProperties: true,
              properties: { deep: { type: "string" } },
            },
            list: { type: "array", items: [{ type: "object", additionalProperties: false }] },
          },
        },
      },
    ];
    const out = sanitizeToolInputSchemas(tools);
    assert.notEqual(out, undefined, "a payload that needed cleaning must come back changed");
    const schema = out![0]!.inputSchema as Record<string, any>;
    assert.equal("$schema" in schema, false);
    assert.equal("additionalProperties" in schema, false);
    assert.equal("additionalProperties" in schema["properties"]["nested"], false);
    assert.equal("additionalProperties" in schema["properties"]["list"]["items"][0], false);
    // What the schema means must survive the cleaning.
    assert.equal(schema["properties"]["path"]["type"], "string");
    assert.equal(schema["properties"]["nested"]["properties"]["deep"]["type"], "string");
  });

  it("leaves the caller's tools untouched", () => {
    const tools = [
      {
        type: "function" as const,
        name: "t",
        inputSchema: { type: "object", additionalProperties: false },
      },
    ];
    sanitizeToolInputSchemas(tools);
    assert.equal((tools[0]!.inputSchema as Record<string, unknown>)["additionalProperties"], false);
  });

  it("reports nothing to do rather than cloning a clean payload", () => {
    assert.equal(
      sanitizeToolInputSchemas([
        { type: "function" as const, name: "t", inputSchema: { type: "object", properties: {} } },
      ]),
      undefined
    );
    assert.equal(sanitizeToolInputSchemas(undefined), undefined);
    assert.equal(sanitizeToolInputSchemas([]), undefined);
  });

  it("walks past a provider tool it cannot read without dropping it", () => {
    const tools = [
      { type: "provider" as const, id: "p.search", name: "search", args: {} },
      {
        type: "function" as const,
        name: "t",
        inputSchema: { type: "object", additionalProperties: false },
      },
    ];
    const out = sanitizeToolInputSchemas(tools as never);
    assert.equal(out?.length, 2);
    assert.deepEqual(out![0], tools[0]);
  });
});

describe("the sanitiser repairs schemas without mangling them", () => {
  it("keeps a tool parameter that happens to be named like a keyword", () => {
    const out = sanitizeToolInputSchemas([
      {
        type: "function" as const,
        name: "checkout",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["ref"],
          properties: {
            ref: { type: "string", description: "a git ref" },
            additionalProperties: { type: "boolean" },
          },
        },
      },
    ]);
    const schema = out![0]!.inputSchema as Record<string, any>;
    // The keyword goes; the parameters keep their names, or `required` would
    // point at a property the model can no longer send.
    assert.equal("additionalProperties" in schema, false);
    assert.deepEqual(Object.keys(schema["properties"]).sort(), ["additionalProperties", "ref"]);
    assert.deepEqual(schema["required"], ["ref"]);
  });

  it("forwards a $ref schema untouched rather than widening it to anything", () => {
    assert.equal(
      sanitizeToolInputSchemas([
        { type: "function" as const, name: "t", inputSchema: { $ref: "#/$defs/x" } },
      ]),
      undefined
    );
  });

  it("recognises the Gemini families, and only those", () => {
    for (const id of [
      "gemini",
      "gemini-2.5-flash",
      "models/gemini-1.5-pro",
      "google-vertex/gemini-2.0",
      "GEMINI-3-PRO",
    ]) {
      assert.equal(isGeminiModelId(id), true, id);
    }
    for (const id of [
      "gemini-compatible-proxy",
      "my-gemini-wrapper",
      "openai/gpt-5-gemini-eval",
      "gemma-2-9b",
    ]) {
      assert.equal(isGeminiModelId(id), false, id);
    }
  });
});
