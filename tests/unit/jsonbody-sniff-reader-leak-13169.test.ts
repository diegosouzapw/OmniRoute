/**
 * Regression test for #13169: the JSON-to-SSE sniff must release the upstream
 * body when it unwinds abnormally.
 *
 * `sniffJsonBodyForSse()` reads the upstream body under `withBodyTimeout()`.
 * On a stalled upstream that rejects, an un-cancelled reader keeps the
 * connection pinned. The upstream stream declares an explicit `cancel()` hook,
 * so the assertions observe real cancellation rather than an incidental close.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { maybeConvertJsonBodyToSse } from "../../open-sse/handlers/chatCore/jsonBodyToSse.ts";

type Deps = Parameters<typeof maybeConvertJsonBodyToSse>[2];

/** Upstream that serves `first` and then stalls forever, tracking cancellation. */
function stallingUpstream(first: string) {
  const state = { cancelled: false };
  let pulls = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulls += 1;
      if (pulls === 1) {
        controller.enqueue(new TextEncoder().encode(first));
        return;
      }
      return new Promise<void>(() => {});
    },
    cancel() {
      state.cancelled = true;
    },
  });
  return { body, state };
}

function timeoutDeps(ms: number): Deps {
  return {
    withBodyTimeout: (<T>(p: Promise<T>) =>
      Promise.race([
        p,
        new Promise<never>((_, reject) =>
          setTimeout(() => {
            const err = new Error(`Response body read timeout after ${ms}ms`);
            err.name = "BodyTimeoutError";
            reject(err);
          }, ms)
        ),
      ])) as Deps["withBodyTimeout"],
    synthesizeOpenAiSseFromJson: () => null,
  } as Deps;
}

describe("jsonBodyToSse upstream body release (#13169)", () => {
  test("cancels the upstream body when the sniff times out", async () => {
    const { body, state } = stallingUpstream('{"choices":[');
    const providerResponse = new Response(body, {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    await assert.rejects(
      () =>
        maybeConvertJsonBodyToSse(providerResponse, { provider: "p", model: "m" }, timeoutDeps(50)),
      (err: Error) => err.name === "BodyTimeoutError"
    );

    // Let any async cancellation settle before observing.
    await new Promise((r) => setTimeout(r, 50));

    assert.equal(state.cancelled, true, "upstream body should be cancelled after the timeout");
  });

  test("does NOT cancel the body on the success path", async () => {
    // A complete SSE-looking body: the sniff hands the reader onward, so
    // cancelling here would truncate a healthy stream.
    const state = { cancelled: false };
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("data: {}\n\n"));
        controller.close();
      },
      cancel() {
        state.cancelled = true;
      },
    });
    const providerResponse = new Response(body, {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    const out = await maybeConvertJsonBodyToSse(
      providerResponse,
      { provider: "p", model: "m" },
      timeoutDeps(5000)
    );

    assert.ok(out instanceof Response, "sniff should return a Response");
    assert.equal(state.cancelled, false, "a healthy body must not be cancelled by the sniff");
  });
});
