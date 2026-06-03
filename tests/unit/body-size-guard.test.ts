import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_BODY_BYTES_AUDIO,
  getBodySizeLimit,
  checkBodySize,
} from "../../src/shared/middleware/bodySizeGuard.ts";
import { requestBodyLimitMbToBytes } from "../../src/shared/constants/bodySize.ts";

test("body size guard uses maxBodySizeMb from settings for regular API routes", () => {
  assert.equal(
    getBodySizeLimit("/api/v1/responses", { maxBodySizeMb: 100 }),
    requestBodyLimitMbToBytes(100)
  );
});

test("body size guard keeps dedicated upload limits as lower bounds", () => {
  assert.equal(
    getBodySizeLimit("/api/v1/audio/transcriptions", { maxBodySizeMb: 1 }),
    MAX_BODY_BYTES_AUDIO
  );
  assert.equal(
    getBodySizeLimit("/api/v1/audio/transcriptions", { maxBodySizeMb: 200 }),
    requestBodyLimitMbToBytes(200)
  );
});

test("checkBodySize reports the configured request limit in 413 responses", async () => {
  const limit = requestBodyLimitMbToBytes(100);
  const request = new Request("http://localhost/api/v1/responses", {
    method: "POST",
    headers: { "content-length": String(limit + 1) },
  });

  const response = checkBodySize(request, limit);

  assert.ok(response);
  assert.equal(response.status, 413);
  const body = await response.json();
  assert.equal(body.error.code, "PAYLOAD_TOO_LARGE");
  assert.match(body.error.message, /100 MB/);
});
