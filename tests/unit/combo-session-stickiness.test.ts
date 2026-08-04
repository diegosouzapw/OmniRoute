/**
 * tests/unit/combo-session-stickiness.test.ts
 *
 * Unit tests for open-sse/services/combo/sessionStickiness.ts
 *
 * Design: saturation is injected via __setStickinessHeadroomFetcherForTests —
 * no network, no DB, fully deterministic.
 *
 * Coverage:
 * - deriveMessageHash: stable key derivation from first user message
 * - applySessionStickiness: same hash → same connection while healthy
 * - applySessionStickiness: saturated connection → rebind (clear + fall through)
 * - applySessionStickiness: no user message → normal ordering, no crash
 * - applySessionStickiness: different hashes → can map to different connections
 * - applySessionStickiness: saturation fetch error → fail-open
 * - applySessionStickiness: terminal connection status / rateLimitedUntil → rebind (#6692)
 * - recordStickyBinding / clearStickyBinding / peekStickyConnectionId lifecycle
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { HeadroomSaturation } from "../../open-sse/services/combo/headroomRanking.ts";
import type { StickyConnectionHealth } from "../../open-sse/services/combo/sessionStickiness.ts";

const mod = await import("../../open-sse/services/combo/sessionStickiness.ts");
const {
  deriveMessageHash,
  applySessionStickiness,
  recordStickyBinding,
  clearStickyBinding,
  clearAllStickyBindings,
  peekStickyConnectionId,
  __setStickinessHeadroomFetcherForTests,
  __setStickinessConnectionFetcherForTests,
  STICKINESS_HEADROOM_THRESHOLD,
} = mod;

// ─── helpers ─────────────────────────────────────────────────────────────────

function makeTarget(connectionId: string): import("../../open-sse/services/combo/types.ts").ResolvedComboTarget {
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

function injectConnectionHealth(byId: Record<string, StickyConnectionHealth | undefined>): void {
  __setStickinessConnectionFetcherForTests(async (connectionId: string) => byId[connectionId]);
}

// ─── Test lifecycle ───────────────────────────────────────────────────────────

test.beforeEach(() => {
  clearAllStickyBindings();
  // Default: healthy connection (headroom = 0.5)
  injectSat({ util5h: 0.3, util7d: 0.2 });
  // Default: unknown to the connection-health fetcher (fail-open, never terminal).
  // Without this override every test would hit the real dynamic-import → DB path
  // (resolveConnectionHealth's production branch), which is slow and non-deterministic
  // for a unit suite that otherwise makes zero DB calls.
  injectConnectionHealth({});
});

test.after(() => {
  __setStickinessHeadroomFetcherForTests(null);
  __setStickinessConnectionFetcherForTests(null);
});

// ─── deriveMessageHash ───────────────────────────────────────────────────────

test("deriveMessageHash: returns 16-char hex for a plain user message", () => {
  const hash = deriveMessageHash([{ role: "user", content: "Hello world" }]);
  assert.ok(hash !== null, "hash should not be null");
  assert.match(hash!, /^[a-f0-9]{16}$/);
});

test("deriveMessageHash: same content → same hash (stable)", () => {
  const msgs = [{ role: "user", content: "How are you?" }];
  assert.equal(deriveMessageHash(msgs), deriveMessageHash(msgs));
});

test("deriveMessageHash: different first messages → different hashes", () => {
  const h1 = deriveMessageHash([{ role: "user", content: "AAA" }]);
  const h2 = deriveMessageHash([{ role: "user", content: "BBB" }]);
  assert.notEqual(h1, h2);
});

test("deriveMessageHash: skips assistant messages, uses first user", () => {
  const msgs = [
    { role: "assistant", content: "Hi" },
    { role: "user", content: "My real first message" },
  ];
  const direct = [{ role: "user", content: "My real first message" }];
  assert.equal(deriveMessageHash(msgs), deriveMessageHash(direct));
});

test("deriveMessageHash: multi-part content array is hashed on text parts", () => {
  const msgs = [
    {
      role: "user",
      content: [
        { type: "text", text: "Hello" },
        { type: "image_url", url: "http://example.com/img.png" },
      ],
    },
  ];
  const hash = deriveMessageHash(msgs);
  assert.ok(hash !== null);
  assert.match(hash!, /^[a-f0-9]{16}$/);
  // Stability
  assert.equal(deriveMessageHash(msgs), hash);
});

test("deriveMessageHash: null/empty → null (fail-open)", () => {
  assert.equal(deriveMessageHash(null), null);
  assert.equal(deriveMessageHash([]), null);
  assert.equal(deriveMessageHash(undefined), null);
  // No user message
  assert.equal(deriveMessageHash([{ role: "assistant", content: "Hi" }]), null);
});

// ─── applySessionStickiness — main scenarios ──────────────────────────────────

test("same message hash → same connection in repeated calls while healthy", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B"), makeTarget("conn-C")];
  const messages = [{ role: "user", content: "First turn of conversation" }];

  const hash = deriveMessageHash(messages)!;
  assert.ok(hash, "hash must be derivable");

  // Simulate first successful request: record sticky to conn-B
  recordStickyBinding(hash, "conn-B");

  // Call 1
  const r1 = await applySessionStickiness(targets, messages);
  assert.ok(r1.stuck, "should be stuck on first call");
  assert.equal(r1.targets[0].connectionId, "conn-B", "conn-B should be first");

  // Call 2 (same conversation)
  const r2 = await applySessionStickiness(targets, messages);
  assert.ok(r2.stuck, "should remain stuck on second call");
  assert.equal(r2.targets[0].connectionId, "conn-B");
});

test("saturated connection → rebind (clear sticky, return normal ordering)", async () => {
  injectSat({ util5h: 0.9, util7d: 0.9 }); // headroom = 0.1, below threshold
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Saturation test" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);

  assert.equal(result.stuck, false, "should NOT be stuck when saturated");
  // Normal order preserved (conn-A stays at index 0 — just not "stuck")
  assert.equal(result.targets[0].connectionId, "conn-A");

  // Binding must have been cleared — subsequent call also returns not stuck
  // (even with healthy fetcher since the binding is gone)
  injectSat({ util5h: 0.1, util7d: 0.1 }); // now healthy
  const result2 = await applySessionStickiness(targets, messages);
  assert.equal(result2.stuck, false, "binding was cleared, no stickiness on follow-up");
});

test("no user message in body → normal ordering, no crash", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];

  const r1 = await applySessionStickiness(targets, null);
  assert.equal(r1.stuck, false);
  assert.deepEqual(
    r1.targets.map((t) => t.connectionId),
    ["conn-A", "conn-B"]
  );

  const r2 = await applySessionStickiness(targets, []);
  assert.equal(r2.stuck, false);

  const r3 = await applySessionStickiness(targets, undefined);
  assert.equal(r3.stuck, false);
});

test("different message hashes can map to different connections", async () => {
  injectSat({ util5h: 0.0, util7d: 0.0 }); // full headroom
  const targets = [makeTarget("conn-X"), makeTarget("conn-Y")];

  const msgs1 = [{ role: "user", content: "Conversation Alpha" }];
  const msgs2 = [{ role: "user", content: "Conversation Beta" }];

  const hash1 = deriveMessageHash(msgs1)!;
  const hash2 = deriveMessageHash(msgs2)!;
  assert.notEqual(hash1, hash2, "hashes must differ");

  recordStickyBinding(hash1, "conn-X");
  recordStickyBinding(hash2, "conn-Y");

  const r1 = await applySessionStickiness(targets, msgs1);
  const r2 = await applySessionStickiness(targets, msgs2);

  assert.ok(r1.stuck);
  assert.ok(r2.stuck);
  assert.equal(r1.targets[0].connectionId, "conn-X");
  assert.equal(r2.targets[0].connectionId, "conn-Y");
});

test("saturation fetch error → fail-open (original order, no crash)", async () => {
  __setStickinessHeadroomFetcherForTests(async (_id: string) => {
    throw new Error("network failure");
  });

  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Error path" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "must not crash on fetcher error");
  assert.deepEqual(
    result.targets.map((t) => t.connectionId),
    ["conn-A", "conn-B"],
    "original order preserved"
  );
});

test("single target list → no-op, no sticky lookup performed", async () => {
  const targets = [makeTarget("conn-solo")];
  const messages = [{ role: "user", content: "Only one target" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-solo");

  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "no stickiness applied for single target");
  assert.deepEqual(result.targets, targets);
});

test("STICKINESS_HEADROOM_THRESHOLD: connection below threshold is NOT reused", async () => {
  // headroom = 1 − 0.9 = 0.1, clearly below threshold 0.15
  injectSat({ util5h: 0.9, util7d: 0.0 });
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Below threshold" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "connection below threshold must not be reused");
});

test("connection just above threshold IS reused", async () => {
  // headroom = 1 − 0.84 = 0.16 > 0.15
  injectSat({ util5h: 0.84, util7d: 0.0 });
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Above threshold" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);
  assert.ok(result.stuck, "connection just above threshold should be reused");
  assert.equal(result.targets[0].connectionId, "conn-A");
});

test("sticky connection no longer in target list → clear binding, normal order", async () => {
  const targets = [makeTarget("conn-X"), makeTarget("conn-Y")];
  const messages = [{ role: "user", content: "Removed connection" }];
  const hash = deriveMessageHash(messages)!;

  // Sticky to conn-GONE which is NOT in targets
  recordStickyBinding(hash, "conn-GONE");

  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "should not be stuck when connection is gone");
  assert.deepEqual(
    result.targets.map((t) => t.connectionId),
    ["conn-X", "conn-Y"]
  );
});

// ─── recordStickyBinding / clearStickyBinding lifecycle ──────────────────────

test("recordStickyBinding: creates a new binding and stickiness is applied", async () => {
  const targets = [makeTarget("conn-1"), makeTarget("conn-2")];
  const messages = [{ role: "user", content: "Lifecycle test" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-1");

  const r = await applySessionStickiness(targets, messages);
  assert.ok(r.stuck);
  assert.equal(r.targets[0].connectionId, "conn-1");
});

test("clearStickyBinding: removes the binding so next call is normal ordering", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Clear test" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-B");
  clearStickyBinding(hash);

  const r = await applySessionStickiness(targets, messages);
  assert.equal(r.stuck, false, "binding was cleared, no stickiness");
});

test("recordStickyBinding: updating to a new connectionId rebinds correctly", async () => {
  const targets = [makeTarget("conn-OLD"), makeTarget("conn-NEW")];
  const messages = [{ role: "user", content: "Rebind test" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-OLD");
  // Rebind to conn-NEW
  recordStickyBinding(hash, "conn-NEW");

  const r = await applySessionStickiness(targets, messages);
  assert.ok(r.stuck);
  assert.equal(r.targets[0].connectionId, "conn-NEW");
});

test("messageHash is returned in result even when no binding exists", async () => {
  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "No binding yet" }];

  const r = await applySessionStickiness(targets, messages);
  assert.equal(r.stuck, false);
  assert.ok(r.messageHash !== null, "hash should be derivable and returned");
  assert.match(r.messageHash!, /^[a-f0-9]{16}$/);
});

// ─── Terminal connection-status gate (#6692) ─────────────────────────────────
//
// Root cause: headroom (5h/weekly usage %) is orthogonal to account
// availability — a credits_exhausted/banned/expired connection, or one still
// inside its rateLimitedUntil cooldown, reports perfectly healthy headroom,
// so the pre-fix headroom-only gate re-promoted a durably dead connection
// forever. See tests/unit/repro-6692-sticky-terminal.test.ts for the full
// end-to-end repro.

test("#6692: credits_exhausted sticky connection is rebound even with full headroom", async () => {
  injectSat({ util5h: 0.0, util7d: 0.0 }); // full headroom — would pass the old gate
  injectConnectionHealth({ "conn-A": { testStatus: "credits_exhausted" } });

  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Terminal status test" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "credits_exhausted must release the pin");

  // Binding must actually be cleared (not just skipped this call).
  assert.equal(peekStickyConnectionId(hash), null);
});

test("#6692: banned / expired statuses also release the pin", async () => {
  for (const status of ["banned", "expired"]) {
    clearAllStickyBindings();
    injectSat({ util5h: 0.0, util7d: 0.0 });
    injectConnectionHealth({ "conn-A": { testStatus: status } });

    const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
    const messages = [{ role: "user", content: `Status ${status}` }];
    const hash = deriveMessageHash(messages)!;
    recordStickyBinding(hash, "conn-A");

    const result = await applySessionStickiness(targets, messages);
    assert.equal(result.stuck, false, `${status} must release the pin`);
  }
});

test("#6692: connection still inside rateLimitedUntil window releases the pin", async () => {
  injectSat({ util5h: 0.0, util7d: 0.0 });
  const future = new Date(Date.now() + 60_000).toISOString();
  injectConnectionHealth({ "conn-A": { rateLimitedUntil: future } });

  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Cooling down" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "an in-window rateLimitedUntil must release the pin");
});

test("#6692: rateLimitedUntil in the past does NOT release the pin", async () => {
  injectSat({ util5h: 0.0, util7d: 0.0 });
  const past = new Date(Date.now() - 60_000).toISOString();
  injectConnectionHealth({ "conn-A": { rateLimitedUntil: past } });

  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Cooldown expired" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  const result = await applySessionStickiness(targets, messages);
  assert.ok(result.stuck, "an expired rateLimitedUntil must not block reuse");
  assert.equal(result.targets[0].connectionId, "conn-A");
});

test("#6692: connection-health fetch error → fail-open (pin preserved)", async () => {
  injectSat({ util5h: 0.0, util7d: 0.0 });
  __setStickinessConnectionFetcherForTests(async () => {
    throw new Error("db unavailable");
  });

  const targets = [makeTarget("conn-A"), makeTarget("conn-B")];
  const messages = [{ role: "user", content: "Fetch error path" }];
  const hash = deriveMessageHash(messages)!;
  recordStickyBinding(hash, "conn-A");

  // The production resolveConnectionHealth catches internally and returns
  // undefined (never throws) — mirrors resolveSaturation's own internal
  // try/catch. This test injects a THROWING override to prove
  // applySessionStickiness's outer try/catch also fails open end-to-end
  // (same behavior as the existing "saturation fetch error" case above:
  // total fail-open/no-op, never a crash).
  const result = await applySessionStickiness(targets, messages);
  assert.equal(result.stuck, false, "a connection-health fetch error must fail open, not crash");
});

test("peekStickyConnectionId: reflects the current binding without mutating it", () => {
  const messages = [{ role: "user", content: "Peek test" }];
  const hash = deriveMessageHash(messages)!;

  assert.equal(peekStickyConnectionId(hash), null, "no binding yet");
  recordStickyBinding(hash, "conn-peek");
  assert.equal(peekStickyConnectionId(hash), "conn-peek");
  // Peeking again must not clear or otherwise mutate the binding.
  assert.equal(peekStickyConnectionId(hash), "conn-peek");
});
