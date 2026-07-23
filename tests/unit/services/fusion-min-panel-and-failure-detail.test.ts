/**
 * Regression tests for issue #6454.
 *
 * (1) fusionTuning.minPanel=1 must be honored — one fast success + slow stragglers
 *     should trigger the straggler-grace timer immediately (quorum reached at 1),
 *     capping wall time near the grace window instead of waiting for the whole
 *     panel or forcing all N stragglers to arrive.
 * (2) When every panel member fails, the 503 body must carry per-member
 *     reasons (model=status_XXX) so operators can distinguish rate-limit
 *     fan-fail from a broader outage.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { handleFusionChat } from "../../../open-sse/services/fusion.ts";

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string, delayMs = 0): Promise<Response> {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  const make = () =>
    new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  return delayMs > 0 ? new Promise((r) => setTimeout(() => r(make()), delayMs)) : Promise.resolve(make());
}
function errResponse(status: number, delayMs = 0): Promise<Response> {
  const body = JSON.stringify({ error: { message: "boom" } });
  const make = () =>
    new Response(body, { status, headers: { "Content-Type": "application/json" } });
  return delayMs > 0 ? new Promise((r) => setTimeout(() => r(make()), delayMs)) : Promise.resolve(make());
}

test("fusion #6454: minPanel=1 lets the grace-timer fire on the FIRST success (no unbounded wait for a 2nd)", async () => {
  // p/fast returns in 5ms. p/slow-fail delays 3s then errors, p/slow-fail-2 delays 3s then errors.
  // With minPanel=1 (honored), grace timer (50ms) starts at t≈5ms, resolves at t≈55ms.
  // With minPanel clamped to 2 (bug), grace never starts (never reaches 2 oks) so we wait
  // for all stragglers → ~3s wall time or hardTimeout.
  const handleSingleModel = (_b: Body, m: string) => {
    if (m === "p/fast") return okResponse("fast", 5);
    return errResponse(500, 3000); // slow-fail
  };
  const t0 = Date.now();
  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/fast", "p/slow-fail", "p/slow-fail-2"],
    handleSingleModel,
    log,
    tuning: { minPanel: 1, stragglerGraceMs: 50, panelHardTimeoutMs: 10000 },
  });
  const elapsed = Date.now() - t0;
  // Grace must have fired near the fast success — well under the 3s straggler delay.
  assert.ok(
    elapsed < 1500,
    `minPanel=1 must let grace fire at 1st success — took ${elapsed}ms (expected <1500ms)`
  );
  // With 1 survivor, degrade path returns the survivor directly (not 503).
  assert.notEqual(res.status, 503);
});

test("fusion #6454: total panel failure 503 surfaces per-member reason (status codes visible)", async () => {
  const handleSingleModel = async (_b: Body, m: string) => {
    if (m === "p/a") return (await errResponse(429));
    if (m === "p/b") return (await errResponse(503));
    return (await errResponse(500));
  };
  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/a", "p/b", "p/c"],
    handleSingleModel,
    log,
    tuning: { minPanel: 2, stragglerGraceMs: 50, panelHardTimeoutMs: 5000 },
  });
  assert.equal(res.status, 503);
  const body = (await res.clone().json()) as { error: { message: string } };
  const msg = body.error?.message ?? "";
  // Body must name each model AND its status so operator can tell rate-limit
  // (429) from outage (500/503). Before the fix this was an opaque generic string.
  assert.match(msg, /p\/a/, "message should name p/a");
  assert.match(msg, /p\/b/, "message should name p/b");
  assert.match(msg, /p\/c/, "message should name p/c");
  assert.match(msg, /429/, "message should carry status 429");
  assert.match(msg, /503/, "message should carry status 503");
  assert.match(msg, /500/, "message should carry status 500");
});
