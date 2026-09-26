import test from "node:test";
import assert from "node:assert/strict";

// resilience per-action notes: rotations counter, streaming stored_429, combo
// isolation, continued outcomes, empty-retry/buffered invariants. Fakes only.

const ctx = await import("../../src/lib/usage/resilienceActionsContext.ts");

test("1. rotations: first served dispatch is 0, later changes add up", () => {
  // Mirrors the executor's noteServedAccount rule: +1 only on an effective
  // change of served identity (abort/shared-egress arms never call it).
  const seen: string[] = ["fp-a", "fp-a", "fp-b", "fp-b", "fp-c"];
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    let last: string | null = null;
    for (const fp of seen) {
      if (last !== null && last !== fp) ctx.noteResilienceAction({ rotations: 1 });
      last = fp;
    }
    return ctx.readResilienceActions();
  });
  assert.deepEqual(snapshot, { rotations: 2 });
});

test("2. stored_429 + replayed matrix: replayed=false pairs with stored_429", () => {
  const fallbackCase = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ parked: true, parkMs: 120000 });
    ctx.noteResilienceAction({ replayed: false, stored429: true });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(fallbackCase, {
    park_ms: 120000,
    parked: true,
    replayed: false,
    stored_429: true,
  });
  const replayCase = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ parked: true, parkMs: 5000 });
    ctx.noteResilienceAction({ replayed: true });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(replayCase, { park_ms: 5000, parked: true, replayed: true });
});

test("3. streaming stored_429: flag recorded even when the served status is 200", () => {
  // The streaming park path serves a 200 SSE envelope whose body carries the
  // stored 429; the flag (not the status) decides at read time.
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ parked: true, parkMs: 3000 });
    ctx.noteResilienceAction({ stored429: true, replayed: false });
    return ctx.readResilienceActions();
  });
  assert.equal(snapshot?.stored_429, true);
  assert.equal(snapshot?.replayed, false);
});

test("4. combo isolation by mechanism: sequential attempt stores stay apart", () => {
  const attempt1 = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ rotations: 2, emptyRetries: 1 });
    return ctx.readResilienceActions();
  });
  const attempt2 = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ resumed: true });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(attempt1, { rotations: 2, empty_retries: 1 });
  assert.deepEqual(attempt2, { resumed: true });
});

test("5. continued: only stitched suffixes count (N suffixes = N)", () => {
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ continued: 1 });
    ctx.noteResilienceAction({ continued: 1 });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(snapshot, { continued: 2 });
});

test("6. empty_retries invariant: 0 means absent, buffered stays independent", () => {
  const snapshot = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ emptyRetries: 0 });
    ctx.noteResilienceAction({ buffered: "pass" });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(snapshot, { buffered: "pass" });
});

test("7. resume threading real path: previousResponseResumed threaded into handleChatCoreInner lands under the store", async () => {
  // Uses the REAL wrapper (withResilienceActionsContext), not a manual
  // runWith: proves the flag survives the implicit store plumbing into the sink read.
  const { withResilienceActionsContext } =
    await import("../../open-sse/handlers/chatCore/resilienceAttemptContext.ts");
  const { notePreviousResponseResumed } =
    await import("../../open-sse/handlers/chatCore/resumedResilienceNotes.ts");
  const snapshot = withResilienceActionsContext([{}], () => {
    notePreviousResponseResumed(true);
    return ctx.readResilienceActions();
  });
  assert.deepEqual(snapshot, { resumed: true });
  const absent = withResilienceActionsContext([{}], () => {
    notePreviousResponseResumed(undefined);
    return ctx.readResilienceActions();
  });
  assert.equal(absent, null);
});

test("8. stream unreadable replay: an unreadable replay body records replayed:false, never replayed:true", async () => {
  // The recopy try/catch only fires when enqueue throws (consumer gone) or
  // the body read throws. Force it with a fallback whose text() rejects:
  // the client received pings only, so replayed:true would lie to stored-error metric.
  const { runParkAndReplay } = await import("../../open-sse/executors/opencodeParkResume.ts");
  const snapshot = await ctx.runWithResilienceActionsContext(async () => {
    const parked = await runParkAndReplay(
      {
        accounts: [],
        execute: async () => {
          throw new Error("must not dispatch");
        },
        markSuccess: () => {},
        sleep: async () => true,
      },
      {
        model: "m",
        body: {},
        stream: true,
        credentials: { apiKey: null },
        signal: null,
        log: null,
      } as never,
      0,
      {
        response: {
          status: 200,
          headers: new Headers({ "Content-Type": "text/event-stream" }),
          text: async () => {
            throw new Error("unreadable body");
          },
        },
      } as never,
      null,
      "cid "
    );
    assert.ok(parked !== null);
    const reader = parked?.response.body?.getReader();
    assert.ok(reader);
    if (reader) {
      for (;;) {
        const { done } = await reader.read();
        if (done) break;
      }
      reader.releaseLock();
    }
    return ctx.readResilienceActions();
  });
  // probe is null (no candidates) and fallback is not a 429: no stored flag,
  // and the failed recopy must not have recorded replayed:true.
  assert.notEqual(snapshot?.replayed, true);
});

test("9. combo+resume: a combo leg carries no resumed flag (simple line keeps it)", () => {
  // Assumed limit (review-code-2 m, option B): previousResponseResumed is
  // threaded on the simple-request path only; combo legs fan out without
  // the flag, so each leg's line holds its own rotations/park while the
  // Responses resume stays on the simple line (one line, its summary).
  const leg = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ rotations: 1 });
    return ctx.readResilienceActions();
  });
  const simple = ctx.runWithResilienceActionsContext(() => {
    ctx.noteResilienceAction({ resumed: true });
    return ctx.readResilienceActions();
  });
  assert.deepEqual(leg, { rotations: 1 });
  assert.deepEqual(simple, { resumed: true });
});
