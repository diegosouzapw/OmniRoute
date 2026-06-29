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
    if (u.includes("userinfo") || u.includes("loadCodeAssist")) return stalledFetch(init);
    return jsonRes({});
  }) as typeof fetch;

  const start = Date.now();
  const result = await antigravity.postExchange({ access_token: "tok" } as never);
  const elapsed = Date.now() - start;

  // userInfo + loadCodeAssist are AbortSignal.timeout(8s)-bounded (one shared
  // deadline each), so the worst case is ~16s — never an infinite hang.
  assert.ok(elapsed < 22000, `postExchange must be timeout-bounded; took ${elapsed}ms`);
  assert.equal(result.projectId, "", "no project when loadCodeAssist times out");
});
