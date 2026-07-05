import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import { validatedJsonBody } from "@/shared/validation/helpers";

function makeRequest(body: string, contentType = "application/json"): Request {
  return new Request("http://localhost/test", {
    method: "POST",
    headers: { "content-type": contentType },
    body,
  });
}

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

  test("returns a 400 for an empty body", async () => {
    const result = await validatedJsonBody(makeRequest(""), schema);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.response.status, 400);
    }
  });

  test("returns a 400 when required fields are missing entirely", async () => {
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
