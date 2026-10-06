import { test } from "node:test";
import assert from "node:assert/strict";
import { HTTP_STATUS } from "../../open-sse/config/constants.ts";

test("HTTP_STATUS declares UNPROCESSABLE_ENTITY as 422", () => {
  assert.equal(HTTP_STATUS.UNPROCESSABLE_ENTITY, 422);
});
