// Regression guard for the Antigravity OAuth login hang.
//
// The dashboard login "just spun forever" because postExchange `await`ed the
// onboardUser retry loop (up to 10×5s, each fetch un-timed) inline, so a slow/
// unreachable Antigravity upstream blocked the /exchange response indefinitely.
//
// Fix: onboarding is fire-and-forget (matches the 9router web flow) and every
// blocking call is AbortSignal.timeout-bounded. This test proves postExchange
// returns promptly regardless of onboarding, and never hangs when an upstream
// stalls.
//
// Flip-proof: revert onboarding to an inline `await` loop and test 1 hangs on the
// onboard gate → times out → fails. Drop the AbortSignal.timeout and test 2
// hangs → fails.

import test from "node:test";
import assert from "node:assert/strict";
import { antigravity } from "../../src/lib/oauth/providers/antigravity.ts";

const originalFetch = globalThis.fetch;

function jsonRes(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// A fetch that rejects when its AbortSignal fires, and otherwise never resolves.
// Mirrors real fetch: an already-aborted signal rejects immediately (so a shared
// deadline reused across fallback endpoints fails fast after the first abort).
function stalledFetch(init?: { signal?: AbortSignal }): Promise<Response> {
  return new Promise((_resolve, reject) => {
    const abortErr = () => new DOMException("The operation was aborted.", "AbortError");
    const signal = init?.signal;
    if (signal?.aborted) {
      reject(abortErr());
      return;
    }
    signal?.addEventListener("abort", () => reject(abortErr()));
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("postExchange returns before onboarding finishes (fire-and-forget — never blocks login)", async () => {
  // The onboard call is gated: it does not resolve until we release it AFTER
  // postExchange has already returned. With the old inline `await` loop,
  // postExchange would block on this gate forever → the test times out. With the
  // fire-and-forget fix it returns immediately.
  let releaseOnboard: () => void = () => {};
  const onboardGate = new Promise<void>((r) => {
    releaseOnboard = r;
  });
  let onboardStarted = false;

  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "user@example.com" });
    if (u.includes("loadCodeAssist")) {
      return jsonRes({
        cloudaicompanionProject: "proj-123",
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) {
      onboardStarted = true;
      await onboardGate;
      return jsonRes({ done: true });
    }
    return jsonRes({});
  }) as typeof fetch;

  const start = Date.now();
  const result = await antigravity.postExchange({ access_token: "tok" } as never);
  const elapsed = Date.now() - start;

  assert.ok(elapsed < 3000, `postExchange must not block on onboarding; took ${elapsed}ms`);
  assert.equal(result.projectId, "proj-123", "projectId still resolved from loadCodeAssist");

  // Let the backgrounded onboarding complete cleanly (no lingering work).
  releaseOnboard();
  await new Promise((r) => setTimeout(r, 50));
  assert.ok(onboardStarted, "onboarding still runs — in the background, after the response");
});

test("postExchange stays timeout-bounded when loadCodeAssist/userinfo stall (no infinite hang)", async () => {
  globalThis.fetch = (async (url: unknown, init?: { signal?: AbortSignal }) => {
    const u = String(url);
    if (u.includes("userinfo") || u.includes("loadCodeAssist") || u.includes("onboardUser"))
      return stalledFetch(init);
    return jsonRes({});
  }) as typeof fetch;

  const start = Date.now();
  const result = await antigravity.postExchange({ access_token: "tok" } as never);
  const elapsed = Date.now() - start;

  // userInfo + loadCodeAssist + onboardUser(attempt) are each AbortSignal.timeout(8s)-bounded.
  // When loadCodeAssist stalls → projectId empty → else-branch attempts onboardUser (also 8s).
  // Worst case: 8 + 8 + 8 = 24s. With onboarding retry of loadCodeAssist also stalling: still
  // within the 8s shared deadline of the retry. Never an infinite hang.
  assert.ok(elapsed < 30000, `postExchange must be timeout-bounded; took ${elapsed}ms`);
  assert.equal(result.projectId, "", "no project when loadCodeAssist times out");
});

// ---------------------------------------------------------------------------
// Tests for the empty-projectId onboarding path (fix for #5193 regression of #2541).
//
// When loadCodeAssist returns empty projectId (no pre-existing Cloud Code project),
// postExchange MUST attempt onboarding inline (not fire-and-forget) so the project
// gets created and discovered within the same login flow.
//
// Flip-proof: remove the `else` branch in postExchange and these tests fail —
// projectId stays empty because onboarding never runs.

test("postExchange attempts onboarding when projectId is empty and returns discovered projectId", async () => {
  // loadCodeAssist returns no project → onboarding should be attempted inline
  // → retry loadCodeAssist returns the newly created project.
  let loadCodeAssistCallCount = 0;
  let onboardUserCalled = false;

  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "new-user@example.com" });
    if (u.includes("loadCodeAssist")) {
      loadCodeAssistCallCount++;
      // First call: no project (triggers onboarding). Second call: project found.
      if (loadCodeAssistCallCount === 1) {
        return jsonRes({
          cloudaicompanionProject: null,
          allowedTiers: [{ id: "legacy-tier", isDefault: true }],
        });
      }
      return jsonRes({
        cloudaicompanionProject: "new-project-456",
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) {
      onboardUserCalled = true;
      return jsonRes({ done: true });
    }
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.ok(onboardUserCalled, "onboardUser must be called when projectId is empty");
  assert.equal(
    loadCodeAssistCallCount,
    2,
    "loadCodeAssist must be called twice: initial (empty) + retry after onboarding"
  );
  assert.equal(
    result.projectId,
    "new-project-456",
    "projectId discovered after onboarding + retry"
  );
});

test("postExchange falls back to empty projectId when onboardUser fails", async () => {
  // loadCodeAssist returns no project → onboarding attempted but fails →
  // projectId remains empty (graceful degradation, never throws).
  let onboardUserCalled = false;

  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "user@example.com" });
    if (u.includes("loadCodeAssist")) {
      return jsonRes({
        cloudaicompanionProject: null,
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) {
      onboardUserCalled = true;
      return jsonRes({ error: "PERMISSION_DENIED" }, 403);
    }
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.ok(onboardUserCalled, "onboardUser must still be attempted even if it may fail");
  assert.equal(
    result.projectId,
    "",
    "projectId stays empty when onboarding fails (graceful degradation)"
  );
});

test("postExchange is timeout-bounded during onboarding attempt (empty projectId)", async () => {
  // loadCodeAssist returns no project → onboarding stalls → timeout kicks in →
  // postExchange returns empty projectId within ~8s (not infinite hang).
  globalThis.fetch = (async (url: unknown, init?: { signal?: AbortSignal }) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "user@example.com" });
    if (u.includes("loadCodeAssist")) {
      return jsonRes({
        cloudaicompanionProject: null,
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) {
      return stalledFetch(init);
    }
    return jsonRes({});
  }) as typeof fetch;

  const start = Date.now();
  const result = await antigravity.postExchange({ access_token: "tok" } as never);
  const elapsed = Date.now() - start;

  assert.ok(elapsed < 22000, `onboarding attempt must be timeout-bounded; took ${elapsed}ms`);
  assert.equal(result.projectId, "", "projectId stays empty when onboarding times out");
});
