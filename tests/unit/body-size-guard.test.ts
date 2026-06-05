import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_BODY_BYTES_AUDIO,
  MAX_BODY_BYTES_FILE,
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

test("/api/v1/files route has 512 MB dedicated limit floor", () => {
  const limit = getBodySizeLimit("/api/v1/files", { maxBodySizeMb: 1 });
  assert.equal(limit, MAX_BODY_BYTES_FILE);
});

test("/api/v1/files route guard allows 500 MB file upload", () => {
  const thirtyMb = 500 * 1024 * 1024;
  const request = new Request("http://localhost/api/v1/files", {
    method: "POST",
    headers: { "content-length": String(thirtyMb) },
  });
  assert.equal(checkBodySize(request, getBodySizeLimit("/api/v1/files", { maxBodySizeMb: 10 })), null);
});

test("/api/v1/files route guard rejects >512 MB file upload", async () => {
  const tooBig = 600 * 1024 * 1024;
  const request = new Request("http://localhost/api/v1/files", {
    method: "POST",
    headers: { "content-length": String(tooBig) },
  });
  const response = checkBodySize(request, getBodySizeLimit("/api/v1/files", { maxBodySizeMb: 10 }));
  assert.ok(response);
  assert.equal(response.status, 413);
  const body = await response.json();
  assert.equal(body.error.code, "PAYLOAD_TOO_LARGE");
});

test("/api/v1/files route guard allows 15 MB (10 MB+ real-world scenario)", () => {
  const fifteenMb = 15 * 1024 * 1024;
  const request = new Request("http://localhost/api/v1/files", {
    method: "POST",
    headers: { "content-length": String(fifteenMb) },
  });
  assert.equal(checkBodySize(request, getBodySizeLimit("/api/v1/files")), null);
});
