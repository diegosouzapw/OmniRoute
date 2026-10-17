import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";

import { buildErrorBody } from "../../open-sse/utils/error.ts";
import { createVideoLiveSttServer } from "../../scripts/ad-hoc/video-live-stt-server.ts";

for (const authorization of [
  undefined,
  "Bearer production-key-removed-from-copy",
  "Bearer stranger",
]) {
  test(`isolated STT refuses ${authorization === undefined ? "missing" : "unrecognized"} authorization without dispatch`, async (t) => {
    let calls = 0;
    const server = createVideoLiveSttServer({
      ownerKey: "synthetic-owner",
      post: async () => {
        calls += 1;
        return Response.json({ text: "synthetic transcript" });
      },
    });
    t.after(() => {
      server.closeAllConnections();
      server.close();
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    assert.ok(address && typeof address === "object");
    const response = await fetch(`http://127.0.0.1:${address.port}/v1/audio/transcriptions`, {
      method: "POST",
      headers: authorization ? { Authorization: authorization } : {},
      body: "synthetic",
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(response.status, 401);
    assert.equal(calls, 0);
  });
}

test("one-shot STT rejects a second authorized request while the first is in flight", async (t) => {
  let calls = 0;
  let releaseFirst!: () => void;
  let markStarted!: () => void;
  const held = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const started = new Promise<void>((resolve) => {
    markStarted = resolve;
  });
  const server = createVideoLiveSttServer({
    ownerKey: "synthetic-owner",
    post: async () => {
      calls += 1;
      if (calls === 1) {
        markStarted();
        await held;
      }
      return Response.json({ text: "synthetic transcript" });
    },
  });
  t.after(() => {
    releaseFirst();
    server.closeAllConnections();
    server.close();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const send = () =>
    fetch(`http://127.0.0.1:${address.port}/v1/audio/transcriptions`, {
      method: "POST",
      headers: { Authorization: "Bearer synthetic-owner" },
      body: "synthetic",
      signal: AbortSignal.timeout(5000),
    });
  const first = send();
  // Observe the rejection too if cleanup closes the held connection on failure.
  first.catch(() => {});
  try {
    await started;
    const second = await send();
    assert.equal(second.status, 409);
    assert.equal(calls, 1);
    releaseFirst();
    assert.equal((await first).status, 200);
  } finally {
    releaseFirst();
    await first.catch(() => {});
  }
});

test("isolated STT errors use the canonical sanitized envelope", async (t) => {
  const server = createVideoLiveSttServer({
    ownerKey: "synthetic-owner",
    post: async () => {
      throw new Error("synthetic-secret at /private/provider/credentials.ts:14");
    },
  });
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const response = await fetch(`http://127.0.0.1:${address.port}/v1/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: "Bearer synthetic-owner" },
    body: "synthetic",
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(response.status, 500);
  const body = await response.json();
  assert.deepEqual(
    body,
    JSON.parse(JSON.stringify(buildErrorBody(500, "Isolated STT component failed")))
  );
  assert.ok(!body.error.message.includes("at /"));
  assert.ok(!body.error.message.includes("synthetic-secret"));
});
