import test from "node:test";
import assert from "node:assert/strict";

const { transformResponseFromProvider } = await import("../../open-sse/handlers/rerank.ts");

test("transformResponseFromProvider coerces numeric data.id to string for nvidia format", () => {
  const result = transformResponseFromProvider(
    { format: "nvidia" },
    { id: 12345, rankings: [] }
  );

  assert.equal(typeof result.id, "string");
  assert.equal(result.id, "12345");
});

test("transformResponseFromProvider coerces numeric zero data.id to string", () => {
  const result = transformResponseFromProvider(
    { format: "nvidia" },
    { id: 0, rankings: [] }
  );

  assert.equal(typeof result.id, "string");
  assert.equal(result.id, "0");
});

test("transformResponseFromProvider uses fallback when data.id is null", () => {
  const result = transformResponseFromProvider(
    { format: "nvidia" },
    { id: null, rankings: [] }
  );

  assert.ok(result.id.startsWith("rerank-"));
});

test("transformResponseFromProvider uses fallback when data.id is undefined", () => {
  const result = transformResponseFromProvider(
    { format: "nvidia" },
    { rankings: [] }
  );

  assert.ok(result.id.startsWith("rerank-"));
});

test("transformResponseFromProvider passes through string id unchanged", () => {
  const result = transformResponseFromProvider(
    { format: "nvidia" },
    { id: "nvidia-abc", rankings: [] }
  );

  assert.equal(typeof result.id, "string");
  assert.equal(result.id, "nvidia-abc");
});
