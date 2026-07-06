/**
 * tests/unit/combo-disable-session-stickiness.test.ts
 *
 * #6168 — "disable session stickiness" opt-out toggle.
 *
 * Two things are covered:
 *  1. resolveDisableSessionStickiness(config, settings) — the real production
 *     resolver used at BOTH call sites in open-sse/services/combo.ts:
 *       per-combo config.disableSessionStickiness (boolean)
 *         → global settings.disableSessionStickiness (boolean)
 *         → default false.
 *  2. The GATE behavior — the exact ternary combo.ts uses at both the main
 *     dispatch loop (combo.ts ~1078) and the round-robin handler (combo.ts ~2404):
 *       const disable = resolveDisableSessionStickiness(config, settings);
 *       const result = disable
 *         ? { targets, messageHash: null, stuck: false }
 *         : await applySessionStickiness(targets, messages);
 *     With the flag ON, applySessionStickiness must NOT run (targets left as-is,
 *     stuck:false, messageHash:null → recordStickyBinding write-back is skipped)
 *     EVEN THOUGH a healthy sticky binding exists. With the flag OFF/absent the
 *     conversation still pins to its sticky connection (#3825 preserved).
 *
 * Saturation is injected via __setStickinessHeadroomFetcherForTests — no network,
 * no DB, fully deterministic.
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { HeadroomSaturation } from "../../open-sse/services/combo/headroomRanking.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

const mod = await import("../../open-sse/services/combo/sessionStickiness.ts");
const {
  applySessionStickiness,
  recordStickyBinding,
  clearAllStickyBindings,
  deriveMessageHash,
  resolveDisableSessionStickiness,
  __setStickinessHeadroomFetcherForTests,
} = mod;

function makeTarget(connectionId: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${connectionId}`,
    executionKey: `key-${connectionId}`,
    modelStr: `gpt-4/${connectionId}`,
    provider: "openai",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  };
}

function injectSat(sat: HeadroomSaturation | undefined): void {
  __setStickinessHeadroomFetcherForTests(async (_id: string) => sat);
}

/**
 * Faithful reproduction of the gate the production call sites use (combo.ts
 * ~1078 main dispatch and ~2404 round-robin — the expression is identical at
 * both). `applySessionStickiness` is wrapped so we can OBSERVE whether it ran.
 */
async function gatedStickiness(
  targets: ResolvedComboTarget[],
  messages: Array<{ role?: string; content?: unknown }> | null | undefined,
  config: Record<string, unknown> | null | undefined,
  settings: Record<string, unknown> | null | undefined,
  observe: { called: number }
) {
  const disable = resolveDisableSessionStickiness(config, settings);
  if (disable) {
    // No-op — applySessionStickiness NOT invoked (recordStickyBinding skipped).
    return { targets, messageHash: null as string | null, stuck: false };
  }
  observe.called += 1;
  return applySessionStickiness(targets, messages);
}

test.beforeEach(() => {
  clearAllStickyBindings();
  injectSat({ util5h: 0.1, util7d: 0.1 }); // healthy — headroom ~0.9
});

test.after(() => {
  __setStickinessHeadroomFetcherForTests(null);
});

// ─── resolveDisableSessionStickiness (production resolver) ────────────────────

test("resolver: default false when neither config nor settings set it", () => {
  assert.equal(resolveDisableSessionStickiness({}, {}), false);
  assert.equal(resolveDisableSessionStickiness(null, null), false);
  assert.equal(resolveDisableSessionStickiness(undefined, undefined), false);
});

test("resolver: global settings fallback (AC #3 global on)", () => {
  assert.equal(
    resolveDisableSessionStickiness({}, { disableSessionStickiness: true }),
    true
  );
  assert.equal(
    resolveDisableSessionStickiness({}, { disableSessionStickiness: false }),
    false
  );
});

test("resolver: per-combo config wins over global (AC #3 precedence)", () => {
  // combo true beats global false
  assert.equal(
    resolveDisableSessionStickiness(
      { disableSessionStickiness: true },
      { disableSessionStickiness: false }
    ),
    true
  );
  // combo false beats global true
  assert.equal(
    resolveDisableSessionStickiness(
      { disableSessionStickiness: false },
      { disableSessionStickiness: true }
    ),
    false
  );
});

test("resolver: non-boolean per-combo value is ignored, falls back to global", () => {
  assert.equal(
    resolveDisableSessionStickiness(
      { disableSessionStickiness: "true" as unknown as boolean },
      { disableSessionStickiness: true }
    ),
    true
  );
});

// ─── Gate behavior — flag ON bypasses stickiness on both paths ────────────────

test("flag ON (per-combo): applySessionStickiness is bypassed even with a healthy binding", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B"), makeTarget("conn-C")];
  const messages = [{ role: "user", content: "identical first message" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-C"); // would normally pin conn-C to index 0

  const observe = { called: 0 };
  const result = await gatedStickiness(
    targets,
    messages,
    { disableSessionStickiness: true },
    { disableSessionStickiness: false },
    observe
  );

  assert.equal(observe.called, 0, "applySessionStickiness must NOT be called when disabled");
  assert.equal(result.stuck, false, "no stickiness applied");
  assert.equal(result.messageHash, null, "no hash → recordStickyBinding write-back skipped");
  assert.deepEqual(
    result.targets.map((t) => t.connectionId),
    ["conn-A", "conn-B", "conn-C"],
    "targets left untouched (no reordering to the sticky connection)"
  );
});

test("flag ON (global settings): identical first message fans out to distinct targets across N requests", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B"), makeTarget("conn-C")];
  const messages = [{ role: "user", content: "same first message every time" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-B");

  // Simulate the round-robin start-index rotation the RR handler applies AFTER
  // the (now-bypassed) stickiness step: rrStartIndex stays at the rotation
  // counter instead of being overridden to the sticky target's index.
  const firstOfEach: string[] = [];
  for (let i = 0; i < 3; i++) {
    const observe = { called: 0 };
    const result = await gatedStickiness(
      targets,
      messages,
      {},
      { disableSessionStickiness: true },
      observe
    );
    assert.equal(observe.called, 0);
    assert.equal(result.stuck, false);
    // Rotation is free to pick index i since stickiness did not force index 0.
    firstOfEach.push(result.targets[i % targets.length].connectionId!);
  }
  assert.deepEqual(
    firstOfEach,
    ["conn-A", "conn-B", "conn-C"],
    "rotation is free — not collapsed onto the sticky connection"
  );
});

// ─── Regression: flag OFF/absent preserves #3825 stickiness ───────────────────

test("flag OFF/absent: identical first message still pins to the same target (#3825 preserved)", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B"), makeTarget("conn-C")];
  const messages = [{ role: "user", content: "identical first message" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-C");

  const observe = { called: 0 };
  const r1 = await gatedStickiness(targets, messages, {}, {}, observe);
  const r2 = await gatedStickiness(targets, messages, {}, {}, observe);

  assert.equal(observe.called, 2, "applySessionStickiness runs on the default path");
  assert.ok(r1.stuck, "first request pins to sticky connection");
  assert.ok(r2.stuck, "second request stays pinned");
  assert.equal(r1.targets[0].connectionId, "conn-C");
  assert.equal(r2.targets[0].connectionId, "conn-C");
});

test("flag explicit false (per-combo) also preserves stickiness", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "pin me" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-B");

  const observe = { called: 0 };
  const result = await gatedStickiness(
    targets,
    messages,
    { disableSessionStickiness: false },
    { disableSessionStickiness: true }, // per-combo false must win
    observe
  );

  assert.equal(observe.called, 1, "per-combo false → stickiness still runs");
  assert.ok(result.stuck);
  assert.equal(result.targets[0].connectionId, "conn-B");
});
