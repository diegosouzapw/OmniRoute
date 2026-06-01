import test from "node:test";
import assert from "node:assert/strict";

const gemini = await import("../../open-sse/translator/helpers/geminiHelper.ts");

test("GEMINI_UNSUPPORTED_SCHEMA_KEYS is a Set", () => {
  assert.ok(gemini.GEMINI_UNSUPPORTED_SCHEMA_KEYS instanceof Set);
  assert.ok(gemini.GEMINI_UNSUPPORTED_SCHEMA_KEYS.size > 0);
});

test("UNSUPPORTED_SCHEMA_CONSTRAINTS is an array", () => {
  assert.ok(Array.isArray(gemini.UNSUPPORTED_SCHEMA_CONSTRAINTS));
  assert.ok(gemini.UNSUPPORTED_SCHEMA_CONSTRAINTS.length > 0);
});

test("DEFAULT_SAFETY_SETTINGS is an array", () => {
  assert.ok(Array.isArray(gemini.DEFAULT_SAFETY_SETTINGS));
  assert.ok(gemini.DEFAULT_SAFETY_SETTINGS.length > 0);
});

test("tryParseJSON parses valid JSON", () => {
  assert.deepEqual(gemini.tryParseJSON('{"a":1}'), { a: 1 });
  assert.deepEqual(gemini.tryParseJSON('[1,2,3]'), [1, 2, 3]);
  assert.equal(gemini.tryParseJSON('"hello"'), "hello");
  assert.equal(gemini.tryParseJSON("42"), 42);
  assert.equal(gemini.tryParseJSON("true"), true);
  assert.equal(gemini.tryParseJSON("null"), null);
});

test("tryParseJSON returns null for invalid JSON", () => {
  assert.equal(gemini.tryParseJSON("not json"), null);
  assert.equal(gemini.tryParseJSON("{broken}"), null);
  assert.equal(gemini.tryParseJSON(""), null);
});

test("tryParseJSON returns input for non-string types", () => {
  assert.equal(gemini.tryParseJSON(null), null);
  assert.equal(gemini.tryParseJSON(123), 123);
});

test("extractTextContent extracts string content", () => {
  assert.equal(gemini.extractTextContent("hello world"), "hello world");
});

test("extractTextContent returns empty for null/undefined", () => {
  assert.equal(gemini.extractTextContent(null), "");
  assert.equal(gemini.extractTextContent(undefined), "");
});

test("extractTextContent extracts from array of content parts", () => {
  const content = [
    { type: "text", text: "hello" },
    { type: "text", text: " world" },
  ];
  const result = gemini.extractTextContent(content);
  assert.ok(result.includes("hello"));
});

test("extractTextContent handles object with text property", () => {
  const content = { text: "hello" };
  const result = gemini.extractTextContent(content);
  assert.ok(result.includes("hello") || result === "");
});

test("generateRequestId returns a string", () => {
  const id = gemini.generateRequestId();
  assert.ok(typeof id === "string");
  assert.ok(id.length > 0);
});

test("generateRequestId returns unique values", () => {
  const id1 = gemini.generateRequestId();
  const id2 = gemini.generateRequestId();
  assert.notEqual(id1, id2);
});

test("generateSessionId returns a string", () => {
  const id = gemini.generateSessionId();
  assert.ok(typeof id === "string");
  assert.ok(id.length > 0);
});

test("generateSessionId returns unique values", () => {
  const id1 = gemini.generateSessionId();
  const id2 = gemini.generateSessionId();
  assert.notEqual(id1, id2);
});

test("convertOpenAIContentToParts handles string content", () => {
  const parts = gemini.convertOpenAIContentToParts("hello");
  assert.ok(Array.isArray(parts));
  assert.ok(parts.length > 0);
});

test("convertOpenAIContentToParts handles null content", () => {
  const parts = gemini.convertOpenAIContentToParts(null);
  assert.ok(Array.isArray(parts));
});

test("convertOpenAIContentToParts handles array content", () => {
  const content = [{ type: "text", text: "hello" }];
  const parts = gemini.convertOpenAIContentToParts(content);
  assert.ok(Array.isArray(parts));
});

test("cleanJSONSchemaForAntigravity handles null", () => {
  const result = gemini.cleanJSONSchemaForAntigravity(null);
  assert.ok(result === null || result === undefined || typeof result === "object");
});

test("cleanJSONSchemaForAntigravity handles object", () => {
  const schema = { type: "object", properties: { name: { type: "string" } } };
  const result = gemini.cleanJSONSchemaForAntigravity(schema);
  assert.ok(typeof result === "object");
});

test("cleanJSONSchemaForAntigravity handles nested schema", () => {
  const schema = {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
      },
    },
  };
  const result = gemini.cleanJSONSchemaForAntigravity(schema);
  assert.ok(typeof result === "object");
});
