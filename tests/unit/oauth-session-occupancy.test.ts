import { test } from "node:test";
import assert from "node:assert/strict";

import {
  _clearOAuthSessionOccupancyForTest,
  getForeignOAuthSessionCount,
  getOAuthSessionAvailability,
  reserveOAuthSession,
  wrapResponseWithOAuthSessionRelease,
} from "../../open-sse/services/oauthSessionOccupancy.ts";

test.beforeEach(() => _clearOAuthSessionOccupancyForTest());

test("counts foreign sessions while ignoring parallel requests from the same session", () => {
  const releaseA1 = reserveOAuthSession("account-a", "session-a", 60_000, 1_000);
  const releaseA2 = reserveOAuthSession("account-a", "session-a", 60_000, 1_000);

  assert.equal(getForeignOAuthSessionCount("account-a", "session-a", 1_001), 0);
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b", 1_001), 1);
  assert.equal(getOAuthSessionAvailability("account-a", "session-b", 1_001), 0.5);

  releaseA1();
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b", 1_001), 1);
  releaseA2();
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b", 1_001), 0);
});

test("expired leases fail open", () => {
  reserveOAuthSession("account-a", "session-a", 100, 1_000);
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b", 1_099), 1);
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b", 1_100), 0);
});

test("response wrapper releases only after streaming completes", async () => {
  const release = reserveOAuthSession("account-a", "session-a", 60_000);
  const wrapped = wrapResponseWithOAuthSessionRelease(
    new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data"));
          controller.close();
        },
      })
    ),
    release
  );

  assert.equal(getForeignOAuthSessionCount("account-a", "session-b"), 1);
  assert.equal(await wrapped.text(), "data");
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b"), 0);
});

test("response wrapper releases on cancellation", async () => {
  const release = reserveOAuthSession("account-a", "session-a", 60_000);
  const wrapped = wrapResponseWithOAuthSessionRelease(
    new Response(new ReadableStream<Uint8Array>({ pull() {} })),
    release
  );
  await wrapped.body?.cancel("client disconnected");
  assert.equal(getForeignOAuthSessionCount("account-a", "session-b"), 0);
});
