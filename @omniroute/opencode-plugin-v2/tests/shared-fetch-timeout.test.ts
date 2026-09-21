import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { defaultOmniRouteModelsFetcher } from "../src/shared/models-map.js";
import { defaultOmniRouteCombosFetcher } from "../src/shared/combos-map.js";

// A fetch stub that hangs until the caller aborts: proves the AbortController
// wiring fires. Rejects with an AbortError like undici does on abort.
function hangingFetch(): typeof fetch {
  return ((url: unknown, init?: { signal?: AbortSignal }) => {
    return new Promise((_resolve, reject) => {
      const signal = init?.signal;
      if (signal?.aborted) {
        reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
        return;
      }
      signal?.addEventListener("abort", () => {
        reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
      });
    }) as Promise<Response>;
  }) as unknown as typeof fetch;
}

describe("shared default fetchers abort on timeout", () => {
  it("models fetcher aborts a hanging request after timeoutMs", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = hangingFetch();
    try {
      await assert.rejects(
        defaultOmniRouteModelsFetcher("https://gw.example.com", "k", 20),
        /aborted/i
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("combos fetcher aborts a hanging request after timeoutMs", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = hangingFetch();
    try {
      await assert.rejects(
        defaultOmniRouteCombosFetcher("https://gw.example.com", "k", 20),
        /aborted/i
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
