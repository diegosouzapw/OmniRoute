import { test, after } from "node:test";
import assert from "node:assert/strict";
import { startFaultyUpstream } from "../helpers/faultyUpstream.ts";

test("ok mode returns 200 with body", async () => {
  const up = await startFaultyUpstream({ kind: "ok", body: "hello" });
  after(() => up.stop());
  const res = await fetch(up.url);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "hello");
  await up.stop();
});

test("status mode returns the given HTTP error code", async () => {
  const up = await startFaultyUpstream({ kind: "status", code: 503, body: "down" });
  const res = await fetch(up.url);
  assert.equal(res.status, 503);
  assert.equal(await res.text(), "down");
  await up.stop();
});

test("latency mode delays the response", async () => {
  const up = await startFaultyUpstream({ kind: "latency", ms: 120, body: "slow" });
  const t0 = Date.now();
  await (await fetch(up.url)).text();
  assert.ok(Date.now() - t0 >= 100, "should be delayed ~120ms");
  await up.stop();
});

test("reset mode destroys the socket (fetch rejects)", async () => {
  const up = await startFaultyUpstream({ kind: "reset" });
  await assert.rejects(() => fetch(up.url).then((r) => r.text()));
  await up.stop();
});

test("timeout mode never responds (AbortSignal aborts)", async () => {
  const up = await startFaultyUpstream({ kind: "timeout" });
  await assert.rejects(() => fetch(up.url, { signal: AbortSignal.timeout(120) }));
  await up.stop();
});

test("setMode switches behavior on a running server", async () => {
  const up = await startFaultyUpstream({ kind: "ok", body: "a" });
  up.setMode({ kind: "status", code: 429, body: "rl" });
  const res = await fetch(up.url);
  assert.equal(res.status, 429);
  await up.stop();
});
