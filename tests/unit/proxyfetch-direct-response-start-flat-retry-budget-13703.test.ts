// #13703 — the fresh-socket retry on a direct response-start timeout reuses
// the SAME flat `directHeadersTimeoutMs` budget as the pooled attempt instead
// of the remaining request/target budget. #10214's zombie-socket rationale
// only justifies a bound on the pooled attempt (detecting a silently-dead
// keep-alive socket); the retry is by construction a brand-new socket with no
// zombie to detect, so it should get the REMAINING budget of a much longer
// target timeout (e.g. a combo's 120s), not another flat 30s (2x the flat
// budget total, provider/model-independent).
//
// This probe proves the two attempts are bound by an IDENTICAL fixed timeout
// regardless of any larger caller-side deadline, by measuring the wall-clock
// gap between when each attempt's fetch is invoked and when it is aborted.
import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

function withFastTimeout<T>(ms: number, fn: () => Promise<T>): Promise<T> {
  process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = String(ms);
  return fn().finally(() => {
    delete process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  });
}

test("#13703 fresh-socket retry gets the SAME flat budget as the pooled attempt, not the remaining target budget", async () => {
  const FLAT_TIMEOUT_MS = 80;
  const LARGER_CALLER_DEADLINE_MS = 2_000;
  const callerDeadlineSignal = AbortSignal.timeout(LARGER_CALLER_DEADLINE_MS);

  const attemptStarts: number[] = [];
  const attemptAbortedAfter: number[] = [];

  const mockUndici = (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const start = Date.now();
    attemptStarts.push(start);
    return new Promise<Response>((_, reject) => {
      init?.signal?.addEventListener(
        "abort",
        () => {
          attemptAbortedAfter.push(Date.now() - start);
          reject(
            init.signal!.reason instanceof Error
              ? init.signal!.reason
              : new Error(String(init.signal!.reason))
          );
        },
        { once: true }
      );
    });
  };
  const mockNative = async (): Promise<Response> =>
    new Response("native-should-not-fire", { status: 200 });

  await assert.rejects(
    withFastTimeout(FLAT_TIMEOUT_MS, () =>
      proxyFetch(
        "https://slow-ttfb.example/v1/chat/completions",
        { method: "POST", signal: callerDeadlineSignal },
        { undiciFetch: mockUndici, nativeFetch: mockNative }
      )
    )
  );

  assert.equal(attemptStarts.length, 2, "pooled attempt + fresh-socket retry must both fire");

  const [firstAttemptDuration, secondAttemptDuration] = attemptAbortedAfter;
  const tolerance = 40;

  assert.ok(
    Math.abs(firstAttemptDuration - FLAT_TIMEOUT_MS) < tolerance,
    `pooled attempt should be cut at the flat ${FLAT_TIMEOUT_MS}ms budget, was cut after ${firstAttemptDuration}ms`
  );

  assert.ok(
    secondAttemptDuration > FLAT_TIMEOUT_MS * 2,
    `EXPECTED (fixed) behavior: fresh-socket retry should use the remaining caller ` +
      `budget (~${LARGER_CALLER_DEADLINE_MS - FLAT_TIMEOUT_MS}ms available), not the ` +
      `identical flat ${FLAT_TIMEOUT_MS}ms window. Got ${secondAttemptDuration}ms — ` +
      `proves the retry reuses the same flat budget as the pooled attempt instead of ` +
      `deriving from the timeout cascade / remaining target timeout.`
  );
});
