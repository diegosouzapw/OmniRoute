/**
 * #10214 — Direct (no-proxy) requests stall on a silently-dropped pooled
 * keep-alive socket until the caller's deadline or a service restart.
 *
 * The default direct dispatcher pools keep-alive sockets for up to
 * `fetchKeepAliveTimeoutMs` (4 s). A socket that silently drops (half-open, no
 * RST) surfaces NO transport error — undici's headersTimeout (600 s default) is
 * the only guard, so the existing fresh-socket retry (which fires on
 * UND_ERR/ECONNRESET/fetch-failed) never triggers. Observed live: opencode-go
 * and command-code stall 100% of routed requests until `systemctl restart`.
 *
 * The fix bounds the response-start window for replay-safe requests and retries
 * once on a fresh no-keep-alive dispatcher. Non-idempotent requests cannot be
 * replayed after that ambiguous timeout: their caller deadline remains the
 * response-start bound.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";
import { getDefaultDispatcher, getRetryDispatcher } from "../../open-sse/utils/proxyDispatcher.ts";

function waitForAbort(init?: RequestInit): Promise<Response> {
  return new Promise<Response>((_, reject) => {
    const signal = init?.signal;
    const rejectFromSignal = () =>
      reject(signal?.reason instanceof Error ? signal.reason : new Error(String(signal?.reason)));
    if (signal?.aborted) {
      rejectFromSignal();
      return;
    }
    signal?.addEventListener("abort", rejectFromSignal, { once: true });
  });
}

/** Simulates a silent half-open pooled socket: the request never resolves, but
 *  observes the abort signal like real undici does (rejects with the reason). */
function hangingFetch(capture: {
  calls: number;
  dispatchers: unknown[];
}): (input: RequestInfo | URL, init?: RequestInit) => Promise<Response> {
  return (_input, init) => {
    capture.calls++;
    capture.dispatchers.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
    return waitForAbort(init);
  };
}

async function withFastTimeout<T>(fn: () => Promise<T>): Promise<T> {
  const previous = process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = "25";
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
    else process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = previous;
  }
}

async function withReferencedDeadline<T>(
  timeoutMs: number,
  fn: (signal: AbortSignal, reason: Error) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const reason = new Error(`caller deadline after ${timeoutMs}ms`);
  reason.name = "TimeoutError";
  const timer = setTimeout(() => controller.abort(reason), timeoutMs);
  try {
    return await fn(controller.signal, reason);
  } finally {
    clearTimeout(timer);
  }
}

test("#10214 GET, HEAD, and OPTIONS recover a pooled timeout on a fresh dispatcher", async () => {
  for (const method of ["GET", "HEAD", "OPTIONS"]) {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    const mockUndici = async (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      capture.calls++;
      capture.dispatchers.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
      if (capture.calls === 1) return waitForAbort(init);
      return new Response(method === "HEAD" ? null : "ok", { status: 200 });
    };

    const response = await withFastTimeout(() =>
      withReferencedDeadline(250, (signal) =>
        proxyFetch("https://example.test/resource", { method, signal }, { undiciFetch: mockUndici })
      )
    );

    assert.equal(capture.calls, 2, `${method} must retry the pooled timeout once`);
    assert.equal(await response.text(), method === "HEAD" ? "" : "ok");
    assert.equal(capture.dispatchers[0], getDefaultDispatcher());
    assert.equal(capture.dispatchers[1], getRetryDispatcher());
    assert.notEqual(capture.dispatchers[0], capture.dispatchers[1]);
  }
});

test("a POST with a replayable body waits for its caller deadline without a second send", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };
  const mockUndici = hangingFetch(capture);
  let deadlineReason: Error | null = null;

  const error = await withFastTimeout(() =>
    withReferencedDeadline(80, async (signal, reason) => {
      deadlineReason = reason;
      try {
        await proxyFetch(
          "https://example.test/v1/chat/completions",
          {
            method: "POST",
            body: "{}",
            signal,
          },
          { undiciFetch: mockUndici }
        );
        return null;
      } catch (caught) {
        return caught;
      }
    })
  );

  assert.equal(error, deadlineReason, "the caller deadline must remain the terminal error");
  assert.equal(capture.calls, 1, "an ambiguous POST timeout must not send a second request");
  assert.equal(capture.dispatchers[0], getDefaultDispatcher());
});

test("a Request-carried abort signal survives the direct response-start guard", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };
  const error = await withFastTimeout(() =>
    withReferencedDeadline(80, async (signal, reason) => {
      const request = new Request("https://example.test/v1/chat/completions", {
        method: "POST",
        body: "{}",
        signal,
      });
      try {
        await proxyFetch(request, {}, { undiciFetch: hangingFetch(capture) });
        return null;
      } catch (caught) {
        assert.equal(caught, reason);
        return caught;
      }
    })
  );

  assert.ok(error);
  assert.equal(capture.calls, 1);
});

test("a caller abort is never retried as a transport failure", async () => {
  let undiciCalls = 0;
  let nativeCalls = 0;
  const transportError = Object.assign(new Error("fetch failed"), { code: "UND_ERR_ABORTED" });
  const mockUndici = async (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    undiciCalls++;
    return new Promise<Response>((_resolve, reject) => {
      const rejectAbort = () => reject(transportError);
      if (init?.signal?.aborted) return rejectAbort();
      init?.signal?.addEventListener("abort", rejectAbort, { once: true });
    });
  };

  await withFastTimeout(() =>
    withReferencedDeadline(10, async (signal) => {
      await assert.rejects(
        proxyFetch(
          "https://example.test/resource",
          { method: "GET", signal },
          {
            undiciFetch: mockUndici,
            nativeFetch: async () => {
              nativeCalls++;
              return new Response("unexpected", { status: 200 });
            },
          }
        ),
        (error) => error === transportError
      );
    })
  );

  assert.equal(undiciCalls, 1);
  assert.equal(nativeCalls, 0);
});

test("a stream body remains single-attempt and follows the caller deadline", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]));
      controller.close();
    },
  });

  await withFastTimeout(() =>
    withReferencedDeadline(80, async (signal, reason) => {
      await assert.rejects(
        proxyFetch(
          "https://example.test/upload",
          {
            method: "POST",
            body: stream,
            signal,
          },
          { undiciFetch: hangingFetch(capture) }
        ),
        (error) => error === reason
      );
    })
  );

  assert.equal(capture.calls, 1);
});

test("a healthy POST is untouched by the guard", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };
  const mockUndici = async (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    capture.calls++;
    capture.dispatchers.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
    return new Response("ok", { status: 200 });
  };

  const res = await withFastTimeout(() =>
    proxyFetch(
      "https://opencode.ai/zen/go/v1/chat/completions",
      { method: "POST", body: "{}" },
      { undiciFetch: mockUndici }
    )
  );

  assert.equal(capture.calls, 1, "healthy request must not retry");
  assert.equal(capture.dispatchers[0], getDefaultDispatcher());
  assert.equal(await res.text(), "ok");
});
