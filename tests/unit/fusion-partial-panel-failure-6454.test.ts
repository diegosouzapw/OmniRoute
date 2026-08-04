/**
 * Regression test for issue #6454 at the exact panel scale from the report
 * (11 panel members, `fusionTuning.minPanel=1`).
 *
 * #6454 reported that a fusion panel returned the opaque "All fusion panel
 * models failed" error even though only a minority of members were actually
 * cooling down / rate-limited — the majority would have answered given the
 * chance. Root cause (fixed by #6521, merged into this branch already):
 * `open-sse/services/fusion.ts` used to hard-clamp the quorum floor to
 * `Math.max(2, cfg.minPanel)`, silently overriding a user-supplied
 * `minPanel=1` and per-member failure reasons were never surfaced in the
 * 503 body.
 *
 * This file exercises the scenario at the reported scale (11 members) to
 * lock in the fix as a permanent regression guard: a minority cooling down
 * must not sink an otherwise-healthy majority, and a genuinely all-failed
 * panel must still return the documented 503.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { handleFusionChat } from "../../open-sse/services/fusion.ts";

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string): Promise<Response> {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  return Promise.resolve(
    new Response(body, { status: 200, headers: { "Content-Type": "application/json" } })
  );
}

function errResponse(status: number): Promise<Response> {
  const body = JSON.stringify({ error: { message: "boom" } });
  return Promise.resolve(new Response(body, { status, headers: { "Content-Type": "application/json" } }));
}

// Mirrors the #6454 repro: an 11-member "fusion-free" style panel where only
// 2 members are actually cooling/rate-limited and 9 are healthy.
const PANEL_11 = [
  "auto/claude-opus",
  "auto/gpt-5.5",
  "auto/sonar-pro",
  "auto/deepseek-v4",
  "auto/minimax-m3",
  "auto/glm-5.2",
  "auto/zai-glm-4.7",
  "auto/mimo-v2.5",
  "auto/gemma-4-31b",
  "auto/llama-3.3-70b",
  "auto/llama-3.1-8b",
];
const COOLING = new Set(["auto/glm-5.2", "auto/zai-glm-4.7"]);

test("fusion #6454: a cooling minority (2/11) does not sink a healthy majority — panel proceeds, not 'all failed'", async () => {
  const seen: string[] = [];
  const handleSingleModel = (_b: Body, m: string) => {
    seen.push(m);
    if (COOLING.has(m)) return errResponse(429);
    return okResponse(`ans-${m}`);
  };

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "List 3 file operations" }] },
    models: PANEL_11,
    handleSingleModel,
    log,
    judgeModel: "auto/claude-opus",
    tuning: { minPanel: 1, stragglerGraceMs: 4000, panelHardTimeoutMs: 60000 },
  });

  assert.notEqual(res.status, 503, "9/11 healthy members must not be reported as a total panel failure");
  const body = (await res.clone().json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = body.choices?.[0]?.message?.content ?? "";
  assert.ok(text.length > 0, "should carry a real synthesized/answer body, not an error");
  // The judge call is the final dispatch, invoked with every healthy answer available to it.
  assert.equal(seen[seen.length - 1], "auto/claude-opus");
});

test("fusion #6454: a genuinely all-failed 11-member panel still returns the documented 503 (no over-correction)", async () => {
  const handleSingleModel = (_b: Body, m: string) => {
    return COOLING.has(m) ? errResponse(429) : errResponse(500);
  };

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "List 3 file operations" }] },
    models: PANEL_11,
    handleSingleModel,
    log,
    judgeModel: "auto/claude-opus",
    tuning: { minPanel: 1, stragglerGraceMs: 4000, panelHardTimeoutMs: 60000 },
  });

  assert.equal(res.status, 503, "a genuinely all-failed panel must still surface the fusion failure error");
  const body = (await res.clone().json()) as { error: { message: string } };
  assert.match(body.error.message, /All fusion panel models failed/);
});
