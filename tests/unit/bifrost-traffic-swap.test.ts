/**
 * bifrost-traffic-swap.test — WP-B7.
 *
 * Verifies the `BIFROST_TRAFFIC_PCT` env var controls what percentage
 * of Bifrost-routed requests use Bifrost as the live path:
 *  - 0%   → 0 requests use Bifrost as live; all go to legacy
 *  - 100% → 0 requests fall through; all use Bifrost as live
 *  - 50%  → roughly half-and-half (deterministic by request id)
 *  - decision is stable across calls with the same request id
 */

import { test } from "node:test";
import { strict as assert } from "node:assert";
import { wrapBifrostExecutorWithShadow } from "../../open-sse/executors/bifrostShadowWrap.ts";

interface ExecResult { response: { body: { text: string } } }
function makeExecutor(tag: string) {
  return { execute: async () => ({ response: { body: { text: tag } } }) };
}

function tick(): Promise<void> { return new Promise((r) => setImmediate(r)); }

test("BIFROST_TRAFFIC_PCT=0 routes 0% to Bifrost (legacy always live)", async () => {
  const prev = process.env.BIFROST_TRAFFIC_PCT;
  process.env.BIFROST_TRAFFIC_PCT = "0";
  try {
    const bifrost = makeExecutor("B");
    const legacy = makeExecutor("L");
    const w = wrapBifrostExecutorWithShadow(bifrost, {
      provider: "openai",
      legacyExecute: legacy.execute as never,
    });
    for (let i = 0; i < 20; i++) {
      const r = (await w.wrapped.execute({ requestId: `r${i}` })) as ExecResult;
      assert.equal(r.response.body.text, "L", `requestId=r${i} should route to legacy`);
    }
  } finally {
    if (prev === undefined) delete process.env.BIFROST_TRAFFIC_PCT;
    else process.env.BIFROST_TRAFFIC_PCT = prev;
  }
});

test("BIFROST_TRAFFIC_PCT=100 routes 100% to Bifrost (Bifrost always live)", async () => {
  const prev = process.env.BIFROST_TRAFFIC_PCT;
  process.env.BIFROST_TRAFFIC_PCT = "100";
  try {
    const bifrost = makeExecutor("B");
    const legacy = makeExecutor("L");
    const w = wrapBifrostExecutorWithShadow(bifrost, {
      provider: "openai",
      legacyExecute: legacy.execute as never,
    });
    for (let i = 0; i < 20; i++) {
      const r = (await w.wrapped.execute({ requestId: `r${i}` })) as ExecResult;
      assert.equal(r.response.body.text, "B", `requestId=r${i} should route to Bifrost`);
    }
  } finally {
    if (prev === undefined) delete process.env.BIFROST_TRAFFIC_PCT;
    else process.env.BIFROST_TRAFFIC_PCT = prev;
  }
});

test("BIFROST_TRAFFIC_PCT=50 splits roughly half", async () => {
  const prev = process.env.BIFROST_TRAFFIC_PCT;
  process.env.BIFROST_TRAFFIC_PCT = "50";
  try {
    const bifrost = makeExecutor("B");
    const legacy = makeExecutor("L");
    const w = wrapBifrostExecutorWithShadow(bifrost, {
      provider: "openai",
      legacyExecute: legacy.execute as never,
    });
    let bf = 0;
    let lg = 0;
    for (let i = 0; i < 200; i++) {
      const r = (await w.wrapped.execute({ requestId: `req${i}` })) as ExecResult;
      if (r.response.body.text === "B") bf++;
      else lg++;
    }
    // Allow ±20% deviation around 50/50 — the FNV hash is uniform
    // but the sample is small.
    assert.ok(bf > 70 && bf < 130, `expected 70-130 bifrost, got ${bf}`);
    assert.ok(lg > 70 && lg < 130, `expected 70-130 legacy, got ${lg}`);
    assert.equal(bf + lg, 200);
  } finally {
    if (prev === undefined) delete process.env.BIFROST_TRAFFIC_PCT;
    else process.env.BIFROST_TRAFFIC_PCT = prev;
  }
});

test("decision is deterministic for the same request id", async () => {
  const prev = process.env.BIFROST_TRAFFIC_PCT;
  process.env.BIFROST_TRAFFIC_PCT = "50";
  try {
    const bifrost = makeExecutor("B");
    const legacy = makeExecutor("L");
    const w = wrapBifrostExecutorWithShadow(bifrost, {
      provider: "openai",
      legacyExecute: legacy.execute as never,
    });
    const first = (await w.wrapped.execute({ requestId: "stable-id-42" })) as ExecResult;
    for (let i = 0; i < 5; i++) {
      const r = (await w.wrapped.execute({ requestId: "stable-id-42" })) as ExecResult;
      assert.equal(r.response.body.text, first.response.body.text, "decision must be stable");
    }
  } finally {
    if (prev === undefined) delete process.env.BIFROST_TRAFFIC_PCT;
    else process.env.BIFROST_TRAFFIC_PCT = prev;
  }
});

test("default (no env var) is 100% Bifrost", async () => {
  const prev = process.env.BIFROST_TRAFFIC_PCT;
  delete process.env.BIFROST_TRAFFIC_PCT;
  try {
    const bifrost = makeExecutor("B");
    const legacy = makeExecutor("L");
    const w = wrapBifrostExecutorWithShadow(bifrost, {
      provider: "openai",
      legacyExecute: legacy.execute as never,
    });
    const r = (await w.wrapped.execute({ requestId: "default-test" })) as ExecResult;
    assert.equal(r.response.body.text, "B");
  } finally {
    if (prev === undefined) delete process.env.BIFROST_TRAFFIC_PCT;
    else process.env.BIFROST_TRAFFIC_PCT = prev;
  }
});
