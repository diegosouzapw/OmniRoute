import test from "node:test";
import assert from "node:assert/strict";

// resilience resilience-actions context: implicit ALS accumulator, one store per
// attempt. Fakes only — never a real fetch, never a real database.

const ctx = await import("../../src/lib/usage/resilienceActionsContext.ts");

test("1. round-trip: note inside a context then read returns the summary", () => {
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ parked: true, parkMs: 40000, replayed: true });
    ctx.noteResilienceAction({ rotations: 2 });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(snapshot, {
    rotations: 2,
    park_ms: 40000,
    parked: true,
    replayed: true,
  });
});

test("2. outside a context: note is a no-op, read returns null, never throws", () => {
  ctx.noteResilienceAction({ parked: true });
  assert.equal(ctx.readResilienceActions(), null);
  assert.equal(ctx.serializeResilienceActions(), null);
});

test("3. read is non-destructive: a second read returns the same summary", () => {
  const [first, second] = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ stored429: true });
    return [ctx.readResilienceActions(), ctx.readResilienceActions()];
  });
  assert.deepEqual(first, { stored_429: true });
  assert.deepEqual(second, { stored_429: true });
});

test("3b. reset is explicit: after resetResilienceActions the store reads null", () => {
  const [before, after] = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ stored429: true });
    const b = ctx.readResilienceActions();
    ctx.resetResilienceActions();
    return [b, ctx.readResilienceActions()];
  });
  assert.deepEqual(before, { stored_429: true });
  assert.equal(after, null);
});

test("3c. double persistence keeps the summary (sink resets only on success)", () => {
  // note: two serialize() calls (two INSERT attempts of the same row) both
  // carry the summary; only an explicit reset clears it.
  const [first, second, third] = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ parked: true, parkMs: 40000 });
    const a = ctx.serializeResilienceActions();
    const b = ctx.serializeResilienceActions();
    ctx.resetResilienceActions();
    return [a, b, ctx.serializeResilienceActions()];
  });
  const expected = JSON.stringify({ park_ms: 40000, parked: true });
  assert.equal(first, expected);
  assert.equal(second, expected);
  assert.equal(third, null);
});

test("4. combo isolation by mechanism: two contexts never share notes", () => {
  const first = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ rotations: 3, emptyRetries: 1 });
    return ctx.readResilienceActions();
  });
  const second = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ resumed: true });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(first, { rotations: 3, empty_retries: 1 });
  assert.deepEqual(second, { resumed: true });
});

test("5. monotone accumulation: counters add, flags OR, buffered last-wins", () => {
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ rotations: 1, buffered: "retry" });
    ctx.noteResilienceAction({ rotations: 2, buffered: "pass", continued: 1 });
    ctx.noteResilienceAction({ continued: 2 });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(snapshot, { rotations: 3, continued: 3, buffered: "pass" });
});

test("6. invalid values rejected: negative/finite guards, closed buffered enum", () => {
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ rotations: -5, parkMs: Number.NaN });
    ctx.noteResilienceAction({ buffered: "bogus" } as never);
    ctx.noteResilienceAction({ emptyRetries: 0 });
    return ctx.readResilienceActions();
  });
  assert.equal(snapshot, null);
});

test("7. empty store reads null (absent = no action, never {})", () => {
  const snapshot = ctx.runWithResilienceActionsContext(() => ctx.readResilienceActions());
  assert.equal(snapshot, null);
  const serialized = ctx.runWithResilienceActionsContext(() => ctx.serializeResilienceActions());
  assert.equal(serialized, null);
});

test("8. serialize emits compact JSON with snake_case keys", () => {
  const json = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ parked: true, parkMs: 40000, resumed: true, stored429: true });
    return ctx.serializeResilienceActions();
  });
  assert.equal(
    json,
    JSON.stringify({ park_ms: 40000, parked: true, stored_429: true, resumed: true })
  );
});

test("9. note cap: beyond RESILIENCE_NOTE_CAP notes are dropped, drops exposed", () => {
  assert.ok(ctx.RESILIENCE_NOTE_CAP >= 100);
  ctx.runWithResilienceActionsContext(() => {
    for (let i = 0; i < ctx.RESILIENCE_NOTE_CAP + 5; i++) {
      ctx.noteResilienceAction({ rotations: 1 });
    }
    const snapshot = ctx.readResilienceActions();
    assert.equal(snapshot?.rotations, ctx.RESILIENCE_NOTE_CAP);
    assert.equal(snapshot?.dropped_notes, 5);
  });
});
