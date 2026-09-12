/**
 * Tests for runWithTransientBackendRetry — bounded retry-with-jitter for transient HTTP errors.
 *
 * #PR-12695 review (chatgpt-codex-connector P1): the wrapper cannot recover the
 * scenario it targets when the inner action (`handleSingleModelChat`) cools the
 * failed account via `markAccountUnavailable` on attempt #1. The next attempt
 * inside the wrapper then short-circuits on the Anti-Thundering-Herd guard and
 * cannot re-select the only eligible credential — the retry is a no-op.
 *
 * These tests document the wrapper-level contract callers must satisfy when
 * wrapping `handleSingleModelChat`: pair the wrapper with the
 * `suppressConnectionCooldown: true` runtime option so attempt #1 does not
 * poison the connection's `rateLimitedUntil`.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  runWithTransientBackendRetry,
  isResponseStatusRetryable,
  TRANSIENT_BACKEND_STATUS_CODES,
} from "../transientBackendRetry.ts";

const sleep = (): ((ms: number) => Promise<void>) => {
  const captured: number[] = [];
  const fn = async (_ms: number): Promise<void> => {
    captured.push(_ms);
  };
  return fn;
};

const ok = (status = 200): { ok: boolean; status: number; body: unknown } => ({
  ok: status >= 200 && status < 300,
  status,
  body: null,
});

describe("runWithTransientBackendRetry — isResponseStatusRetryable", () => {
  it("returns true for 502/503/504", () => {
    assert.equal(isResponseStatusRetryable(502), true);
    assert.equal(isResponseStatusRetryable(503), true);
    assert.equal(isResponseStatusRetryable(504), true);
  });

  it("returns false for 429 (per-tenant policy — same retry hits same policy)", () => {
    assert.equal(isResponseStatusRetryable(429), false);
  });

  it("returns false for 4xx (non-transient client errors)", () => {
    assert.equal(isResponseStatusRetryable(400), false);
    assert.equal(isResponseStatusRetryable(401), false);
    assert.equal(isResponseStatusRetryable(403), false);
    assert.equal(isResponseStatusRetryable(404), false);
  });

  it("returns false for 5xx outside the transient trio", () => {
    // 500 is a generic server error, not specifically transient. 501 not
    // implemented. 505 HTTP version not supported. Caller can opt these in
    // via their own logic, but the wrapper's documented contract is 502/503/504.
    assert.equal(isResponseStatusRetryable(500), false);
    assert.equal(isResponseStatusRetryable(501), false);
    assert.equal(isResponseStatusRetryable(505), false);
  });

  it("returns false for null/undefined/non-numeric input", () => {
    assert.equal(isResponseStatusRetryable(undefined), false);
    assert.equal(isResponseStatusRetryable(null), false);
    assert.equal(isResponseStatusRetryable("502"), false);
  });

  it("exported set contains exactly 502, 503, 504", () => {
    assert.deepEqual([...TRANSIENT_BACKEND_STATUS_CODES].sort(), [502, 503, 504]);
  });
});

describe("runWithTransientBackendRetry — happy paths", () => {
  it("returns the first response when ok=true (no retry)", async () => {
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(200);
      },
      { sleep: sleep() }
    );
    assert.equal(result.status, 200);
    assert.equal(invocations, 1);
  });

  it("does not retry a non-transient 4xx response (returns immediately)", async () => {
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(403);
      },
      { sleep: sleep() }
    );
    assert.equal(result.status, 403);
    assert.equal(invocations, 1);
  });
});

describe("runWithTransientBackendRetry — transient retry behavior", () => {
  it("retries up to maxAttempts on transient 502 and returns the last response on exhaustion", async () => {
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: 3, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(result.status, 502, "exhaustion returns the last 502 response");
    assert.equal(invocations, 3, "wrapper invoked the action maxAttempts times");
  });

  it("stops retrying as soon as the action succeeds", async () => {
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return invocations < 2 ? ok(503) : ok(200);
      },
      { maxAttempts: 3, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(result.status, 200);
    assert.equal(invocations, 2, "succeeds on attempt #2 — does not run attempt #3");
  });

  it("emits onRetry with status, attempt, delayMs on each scheduled retry", async () => {
    const captured: Array<{ attempt: number; delayMs: number; status?: number; source?: string }> = [];
    let invocations = 0;
    await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(503);
      },
      {
        maxAttempts: 3,
        baseMs: 1,
        capMs: 8,
        sleep: sleep(),
        source: "test-source",
        onRetry: (info) => {
          captured.push(info);
        },
      }
    );
    assert.equal(captured.length, 2, "onRetry fires between attempts, not after the last");
    assert.equal(captured[0].attempt, 1);
    assert.equal(captured[0].status, 503);
    assert.equal(captured[0].source, "test-source");
    assert.ok(captured[0].delayMs >= 1 && captured[0].delayMs <= 8);
    assert.equal(captured[1].attempt, 2);
  });

  it("throws (does not swallow) when the action itself throws — but only after maxAttempts", async () => {
    let invocations = 0;
    await assert.rejects(
      () =>
        runWithTransientBackendRetry(
          async () => {
            invocations += 1;
            throw new Error("network blip");
          },
          { maxAttempts: 2, baseMs: 1, capMs: 2, sleep: sleep() }
        ),
      /network blip/
    );
    assert.equal(invocations, 2, "throwing action is retried up to maxAttempts");
  });

  it("respects maxAttempts:1 (no retries)", async () => {
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: 1, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(result.status, 502);
    assert.equal(invocations, 1, "maxAttempts:1 means exactly one invocation");
  });
});

describe("runWithTransientBackendRetry — #PR-12695 cooldown-poisoning scenario", () => {
  /**
   * The bot's concern (chat.ts L765, runWithTransientBackendRetry wrapping
   * handleSingleModelChat for the global-fallback):
   *
   *   attempt #1: action returns 502 AND records `rateLimitedUntil` on the
   *               only eligible connection via `markAccountUnavailable`.
   *   attempt #2: a fresh action invocation runs getProviderCredentials and
   *               filters out the cooled connection → no credentials → same 502.
   *
   * The wrapper itself has no knowledge of the cooldown; this test simulates
   * the contract: an action that mimics the chat.ts flow. The "fix" lives at
   * the call site — `suppressConnectionCooldown: true` is passed to
   * handleSingleModelChat so the action DOES NOT poison the connection.
   *
   * This test proves the wrapper-level guarantee the fix relies on: it does
   * actually re-invoke the action on subsequent attempts (not just return
   * cached first-result). Without the `suppressConnectionCooldown` companion
   * option, the second invocation will return the same 502 anyway — but the
   * wrapper's responsibility is to drive the retry; the caller's
   * responsibility is to keep the retry meaningful.
   */
  it("re-invokes the action on each attempt (the fix relies on this contract)", async () => {
    // Track whether the action was re-entered for each attempt. The chat.ts
    // handler relies on the wrapper making multiple fresh invocations so that
    // each attempt can re-fetch credentials (after the previous attempt set
    // a cooldown that the caller-suppressed via suppressConnectionCooldown).
    const seenAtAttempt: number[] = [];
    let attempt = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        attempt += 1;
        seenAtAttempt.push(attempt);
        // Simulate the fixed call site: by the time attempt #2 runs,
        // `suppressConnectionCooldown` would have prevented the cooldown from
        // being recorded, so this attempt still has the same connection
        // available. We just flip the response here.
        return attempt < 3 ? ok(502) : ok(200);
      },
      { maxAttempts: 3, baseMs: 1, capMs: 2, sleep: sleep() }
    );

    assert.equal(result.status, 200, "retry succeeded on attempt #3");
    assert.deepEqual(seenAtAttempt, [1, 2, 3], "wrapper re-invoked action on every attempt");
  });

  it("returns the same response on exhaustion regardless of caller-side cooldown state (wrapper does not cache)", async () => {
    // Simulate the buggy (unfixed) call site: action records cooldown on
    // attempt #1, attempt #2 sees no eligible credentials, attempt #3 same.
    // The wrapper still makes maxAttempts invocations — it is the CALLER's
    // responsibility (via `suppressConnectionCooldown`) to ensure attempt #2
    // can do meaningful work. This test pins the wrapper's contract: it
    // always re-invokes; never short-circuits on its own.
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: 3, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(invocations, 3, "wrapper always invokes exactly maxAttempts times for transient errors");
    assert.equal(result.status, 502, "returns the final transient response on exhaustion");
  });
});

describe("runWithTransientBackendRetry — abort signal", () => {
  it("throws AbortError when signal is already aborted", async () => {
    const ac = new AbortController();
    ac.abort();
    await assert.rejects(
      () =>
        runWithTransientBackendRetry(
          async () => ok(200),
          { signal: ac.signal, sleep: sleep() }
        ),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.equal((err as Error).name, "AbortError");
        return true;
      }
    );
  });
});

describe("runWithTransientBackendRetry — input validation", () => {
  // #PR-12695 review (kilo-code-bot CRITICAL): the wrapper used to accept any
  // caller-supplied maxAttempts (0, negative, NaN, Infinity) and either
  // return undefined or loop forever. The fix clamps to the documented
  // default of 3 when the input is not a positive integer.
  it("clamps maxAttempts=0 to the default of 3", async () => {
    let invocations = 0;
    const result = await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: 0, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(result.status, 502);
    assert.equal(invocations, 3, "maxAttempts:0 falls back to the default of 3");
  });

  it("clamps negative maxAttempts to the default of 3", async () => {
    let invocations = 0;
    await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: -5, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(invocations, 3, "negative maxAttempts falls back to the default");
  });

  it("clamps NaN/Infinity maxAttempts to the default of 3", async () => {
    let invocations = 0;
    await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: Number.NaN, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(invocations, 3, "NaN maxAttempts falls back to the default");
  });

  it("clamps a non-integer maxAttempts (1.5) to the default of 3", async () => {
    let invocations = 0;
    await runWithTransientBackendRetry(
      async () => {
        invocations += 1;
        return ok(502);
      },
      { maxAttempts: 1.5, baseMs: 1, capMs: 2, sleep: sleep() }
    );
    assert.equal(invocations, 3, "non-integer maxAttempts falls back to the default");
  });
});

describe("runWithTransientBackendRetry — isTransientError predicate", () => {
  // #PR-12695 review (kilo-code-bot CRITICAL): the catch block used to retry
  // every thrown error. The fix lets callers supply `isTransientError` to
  // opt into stricter classification; the default stays permissive so
  // network blips don't drop requests on a global-fallback call site.
  it("rethrows immediately when isTransientError returns false", async () => {
    let invocations = 0;
    await assert.rejects(
      () =>
        runWithTransientBackendRetry(
          async () => {
            invocations += 1;
            throw new TypeError("bad config");
          },
          {
            maxAttempts: 5,
            baseMs: 1,
            capMs: 2,
            sleep: sleep(),
            isTransientError: () => false,
          }
        ),
      /bad config/
    );
    assert.equal(
      invocations,
      1,
      "non-transient error must not retry — caller classified it as fatal"
    );
  });

  it("still retries transient errors when isTransientError returns true", async () => {
    let invocations = 0;
    await assert.rejects(
      () =>
        runWithTransientBackendRetry(
          async () => {
            invocations += 1;
            throw new Error("ECONNRESET");
          },
          {
            maxAttempts: 3,
            baseMs: 1,
            capMs: 2,
            sleep: sleep(),
            isTransientError: (e) => (e as Error).message === "ECONNRESET",
          }
        ),
      /ECONNRESET/
    );
    assert.equal(invocations, 3, "transient-classified error is retried up to maxAttempts");
  });

  it("default behaviour: every thrown error is treated as transient (back-compat)", async () => {
    let invocations = 0;
    await assert.rejects(
      () =>
        runWithTransientBackendRetry(
          async () => {
            invocations += 1;
            throw new Error("anything");
          },
          { maxAttempts: 2, baseMs: 1, capMs: 2, sleep: sleep() }
        ),
      /anything/
    );
    assert.equal(
      invocations,
      2,
      "without isTransientError, the wrapper still retries on every thrown error"
    );
  });
});