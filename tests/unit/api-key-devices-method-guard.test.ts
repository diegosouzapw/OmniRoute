import assert from "node:assert/strict";
import test from "node:test";

import { TRACE } from "../../src/app/api/keys/[id]/devices/route.ts";

test("api key devices route returns 405 for TRACE with Allow: GET", async () => {
  const response = await TRACE();

  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET");

  const body = await response.json();
  assert.equal(body?.error?.message, "Method Not Allowed");
});
