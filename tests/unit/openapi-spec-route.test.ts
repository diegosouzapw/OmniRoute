import test from "node:test";
import assert from "node:assert/strict";

const { GET } = await import("../../src/app/api/openapi/spec/route.ts");

test("openapi spec route resolves the repository spec file and returns a parsed catalog", async () => {
  const response = await GET();
  assert.equal(response.status, 200);

  const payload = (await response.json()) as any;
  assert.equal(typeof payload.info, "object");
  assert.ok(Array.isArray(payload.endpoints));
  assert.ok(Array.isArray(payload.schemas));
  assert.ok(payload.endpoints.length > 0);
});
