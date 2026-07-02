import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  forwardDashboardEventToLiveWs,
  __resetLiveWsForwardingState,
} from "../../open-sse/handlers/chatCore/telemetryHelpers.ts";

// #4604 — In single-port Docker deployments the live-WS sidecar (port 20129) is
// not running, but forwardDashboardEventToLiveWs POSTed to it on every compression
// event. Because the global fetch is proxyFetch, each ECONNREFUSED logged a
// "[ProxyFetch] Undici dispatcher failed" warning — 272 times in 42 minutes. The
// forwarder now backs off after consecutive failures (lazy recovery), so a missing
// sidecar stops spamming instead of firing on every request.

beforeEach(() => __resetLiveWsForwardingState());

function makeClock(start = 1000) {
  let t = start;
  const now = () => t;
  return { now, advance: (ms: number) => (t += ms) };
}

test("forwards the event when the sidecar is reachable", async () => {
  let calls = 0;
  const ok = async () => {
    calls++;
    return new Response("ok");
  };
  await forwardDashboardEventToLiveWs("compression.step", { a: 1 }, ok, makeClock().now);
  assert.equal(calls, 1);
});

test("backs off after consecutive failures and stops calling fetch", async () => {
  let calls = 0;
  const fail = async () => {
    calls++;
    throw new Error("connect ECONNREFUSED 127.0.0.1:20129");
  };
  const clock = makeClock();
  // First N attempts go through (and fail); after the threshold the forwarder
  // short-circuits without touching fetch.
  for (let i = 0; i < 10; i++) {
    await forwardDashboardEventToLiveWs("compression.step", {}, fail, clock.now);
  }
  assert.ok(calls >= 1, "should attempt at least once");
  assert.ok(calls <= 3, `should stop after the failure threshold (got ${calls})`);
});

test("retries once after the cooldown window elapses", async () => {
  let calls = 0;
  const fail = async () => {
    calls++;
    throw new Error("ECONNREFUSED");
  };
  const clock = makeClock();
  for (let i = 0; i < 5; i++) {
    await forwardDashboardEventToLiveWs("e", {}, fail, clock.now);
  }
  const afterTrip = calls;
  clock.advance(120_000); // past the cooldown
  await forwardDashboardEventToLiveWs("e", {}, fail, clock.now);
  assert.equal(calls, afterTrip + 1, "should attempt again once cooldown expires");
});

test("a success resets the failure counter", async () => {
  let calls = 0;
  let mode: "fail" | "ok" = "fail";
  const impl = async () => {
    calls++;
    if (mode === "fail") throw new Error("ECONNREFUSED");
    return new Response("ok");
  };
  const clock = makeClock();
  await forwardDashboardEventToLiveWs("e", {}, impl, clock.now); // fail (1)
  mode = "ok";
  await forwardDashboardEventToLiveWs("e", {}, impl, clock.now); // success → reset
  mode = "fail";
  const before = calls;
  // After a reset, the next failures should once again be attempted (not pre-tripped).
  await forwardDashboardEventToLiveWs("e", {}, impl, clock.now);
  assert.equal(calls, before + 1);
});
