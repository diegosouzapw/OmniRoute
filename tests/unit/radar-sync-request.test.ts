import assert from "node:assert/strict";
import test from "node:test";

import {
  RADAR_SYNC_BODY_LIMIT_BYTES,
  validateRadarSyncBody,
} from "../../src/app/api/radar/syncRequest.ts";

function request(body?: string): Request {
  return new Request("http://localhost:20128/api/radar/sync-all", {
    method: "POST",
    ...(body === undefined ? {} : { body }),
  });
}

test("Radar sync body accepts only absent/empty or exactly an empty JSON object", async () => {
  for (const body of [undefined, "", "   ", "{}"] as const) {
    assert.equal(await validateRadarSyncBody(request(body)), "valid", `expected valid: ${body}`);
  }

  for (const body of ['{"unexpected":true}', "null", "[]", '"value"', "{malformed"] as const) {
    assert.equal(
      await validateRadarSyncBody(request(body)),
      "invalid",
      `expected invalid: ${body}`
    );
  }
});

test("Radar sync body stops a chunked stream at the fixed byte limit", async () => {
  let pulls = 0;
  const chunk = new TextEncoder().encode(" ".repeat(512));
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulls += 1;
      controller.enqueue(chunk);
      if (pulls >= 12) controller.close();
    },
  });
  const streamed = new Request("http://localhost:20128/api/radar/sync-all", {
    method: "POST",
    body,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  assert.equal(await validateRadarSyncBody(streamed), "too_large");
  assert.equal(RADAR_SYNC_BODY_LIMIT_BYTES, 1024);
  assert.ok(pulls < 12, "the validator must cancel before buffering the entire stream");
});

test("Radar sync body turns transport and UTF-8 failures into a closed sanitized state", async () => {
  const failedStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(new Error("transport-secret"));
    },
  });
  const failedRequest = new Request("http://localhost:20128/api/radar/sync-all", {
    method: "POST",
    body: failedStream,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  const invalidUtf8 = new Request("http://localhost:20128/api/radar/sync-all", {
    method: "POST",
    body: new Uint8Array([0xff]),
  });

  assert.equal(await validateRadarSyncBody(failedRequest), "read_error");
  assert.equal(await validateRadarSyncBody(invalidUtf8), "read_error");
});
