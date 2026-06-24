import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import { readJsonBody } from "@/lib/api/readJsonBody";
import { validatedJsonBody } from "@/shared/validation/helpers";

function makeRequest(body: string, contentType = "application/json"): Request {
  return new Request("http://localhost/test", {
    method: "POST",
    headers: { "content-type": contentType },
    body,
  });
}

describe("readJsonBody", () => {
  test("parses a valid JSON object", async () => {
    const result = await readJsonBody(makeRequest('{"a":1,"b":"x"}'));
    assert.equal(result.success, true);
    if (result.success) {
      assert.deepEqual(result.data, { a: 1, b: "x" });
    }
  });

  test("parses a valid JSON array", async () => {
    const result = await readJsonBody(makeRequest("[1,2,3]"));
    assert.equal(result.success, true);
    if (result.success) {
      assert.deepEqual(result.data, [1, 2, 3]);
    }
  });

  test("parses a JSON null", async () => {
    const result = await readJsonBody(makeRequest("null"));
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data, null);
    }
  });

  test("returns a 400 response for malformed JSON", async () => {
    const result = await readJsonBody(makeRequest("{not json"));
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
      const body = await result.response.json();
      assert.deepEqual(body, {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      });
    }
  });

  test("returns a 400 response for an empty body", async () => {
    const result = await readJsonBody(makeRequest(""));
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
    }
  });

  test("returns a 400 response for a non-JSON content type with non-JSON body", async () => {
    // The body parser doesn't actually inspect the content-type, so a
    // malformed payload should still 400 regardless of header.
    const result = await readJsonBody(makeRequest("plain text", "text/plain"));
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
    }
  });
});

describe("validatedJsonBody", () => {
  const schema = z.object({
    name: z.string().min(1),
    count: z.number().int().nonnegative(),
  });

  test("returns the parsed and validated data on success", async () => {
    const result = await validatedJsonBody(makeRequest('{"name":"hello","count":3}'), schema);
    assert.equal(result.success, true);
    if (result.success) {
      assert.deepEqual(result.data, { name: "hello", count: 3 });
    }
  });

  test("returns a 400 with structured details when the body fails Zod validation", async () => {
    const result = await validatedJsonBody(makeRequest('{"name":"","count":-1}'), schema);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
      const body = await result.response.json();
      assert.equal(body.error.message, "Invalid request");
      assert.ok(Array.isArray(body.error.details));
      // Both `name` (empty) and `count` (negative) should be reported.
      const fields = body.error.details.map((d: { field: string }) => d.field);
      assert.ok(fields.includes("name"));
      assert.ok(fields.includes("count"));
    }
  });

  test("returns a 400 with a body-parse failure for malformed JSON", async () => {
    const result = await validatedJsonBody(makeRequest("not json at all"), schema);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
      const body = await result.response.json();
      assert.deepEqual(body, {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      });
    }
  });

  test("returns a 400 when fields are missing entirely", async () => {
    const result = await validatedJsonBody(makeRequest("{}"), schema);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
      const body = await result.response.json();
      const fields = body.error.details.map((d: { field: string }) => d.field);
      assert.ok(fields.includes("name"));
      assert.ok(fields.includes("count"));
    }
  });

  test("preserves the same envelope shape between parse and validate failure", async () => {
    // Both failure modes should produce the same top-level shape, so client
    // code can use a single parser.
    const parseFailure = await validatedJsonBody(makeRequest("nope"), schema);
    const validateFailure = await validatedJsonBody(makeRequest("{}"), schema);
    assert.equal(parseFailure.success, false);
    assert.equal(validateFailure.success, false);
    if (!parseFailure.success && !validateFailure.success) {
      const parseBody = await parseFailure.response.json();
      const validateBody = await validateFailure.response.json();
      assert.equal(typeof parseBody.error.message, "string");
      assert.equal(typeof validateBody.error.message, "string");
      assert.ok(Array.isArray(parseBody.error.details));
      assert.ok(Array.isArray(validateBody.error.details));
    }
  });
});
