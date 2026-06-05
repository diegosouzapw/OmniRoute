import test from "node:test";
import assert from "node:assert/strict";

const { buildCurl, escSq } =
  await import("../../src/app/(dashboard)/dashboard/providers/utils/buildCurl.ts");

test("buildCurl — generates correct cURL for chat completion", () => {
  const result = buildCurl({
    endpoint: "http://localhost:20128/api/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: "Bearer sk-test-123",
      "Content-Type": "application/json",
    },
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "Hello" }],
      stream: true,
    },
  });

  assert.ok(result.includes("curl -s -X POST"), "should start with curl command");
  assert.ok(result.includes("Authorization"), "should include Authorization header");
  assert.ok(result.includes("Bearer sk-test-123"), "should include the API key");
  assert.ok(result.includes("gpt-4o"), "should include model in body");
  assert.ok(
    result.includes("http://localhost:20128/api/v1/chat/completions"),
    "should include endpoint"
  );
});

test("buildCurl — generates correct cURL for embedding", () => {
  const result = buildCurl({
    endpoint: "http://localhost:20128/api/v1/embeddings",
    headers: {
      Authorization: "Bearer sk-embed",
      "Content-Type": "application/json",
    },
    body: {
      model: "text-embedding-3-small",
      input: "Hello world",
    },
  });

  assert.ok(result.includes("/api/v1/embeddings"), "should include embeddings endpoint");
  assert.ok(result.includes("text-embedding-3-small"), "should include model");
  assert.ok(result.includes("Hello world"), "should include input text");
  assert.ok(result.includes("-X POST"), "should default to POST method");
});

test("buildCurl — escapes single quotes in string values", () => {
  const result = buildCurl({
    endpoint: "http://localhost:20128/api/v1/embeddings",
    headers: {
      Authorization: "Bearer sk-test",
      "Content-Type": "application/json",
    },
    body: {
      model: "text-embedding-3-small",
      input: "It's a great day, isn't it?",
    },
  });

  // The single quotes in the body should be shell-escaped
  assert.ok(!result.includes("It's a great"), "raw single quote should be escaped in output");
  // The escaped form should appear
  assert.ok(result.includes("It"), "escaped body should still contain the text content");
});

test("escSq — escapes single quotes correctly for POSIX shell", () => {
  assert.strictEqual(escSq("hello"), "hello");
  assert.strictEqual(escSq("it's"), "it'\\''s");
  assert.strictEqual(escSq("a'b'c"), "a'\\''b'\\''c");
  assert.strictEqual(escSq("no quotes here"), "no quotes here");
});
