/**
 * CodeQL alert 806 — js/insecure-randomness (HIGH) on
 * `open-sse/executors/tinycms.ts`.
 *
 * The TinyCMS executor derives `x-secure-nonce` / `x-session-id` from a nonce
 * that is fed into the upstream request signature (`generateSecurePayload`).
 * That is a security context, so the nonce must never fall back to
 * `Math.random()` — a predictable nonce lets an observer replay or forge a
 * signed request.
 *
 * The regression guard runs the executor with a `globalThis.crypto` that has no
 * `randomUUID` (the exact condition that used to select the `Math.random()`
 * fallback) and asserts the emitted nonce is still a cryptographically strong
 * UUID.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";

import { TinyCmsExecutor } from "../../open-sse/executors/tinycms.ts";
import { setupDomMocks, type DomMockRestore } from "../../open-sse/executors/tinycmsSigner.ts";

let restoreDomMocks: DomMockRestore;

before(() => {
  restoreDomMocks = setupDomMocks();
});

after(() => {
  restoreDomMocks();
});

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

test("TinyCMS nonce stays cryptographically strong when globalThis.crypto has no randomUUID", async () => {
  const originalFetch = globalThis.fetch;
  const originalCryptoDescriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto")!;
  const realCrypto = globalThis.crypto;

  // Keep every other WebCrypto capability, drop only `randomUUID`. This is the
  // branch that previously fell back to `Math.random()`.
  Object.defineProperty(globalThis, "crypto", {
    configurable: true,
    value: {
      getRandomValues: (array: ArrayBufferView) => realCrypto.getRandomValues(array as never),
      subtle: realCrypto.subtle,
    },
  });

  const seenHeaders: Record<string, string>[] = [];

  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    if (new URL(url).hostname === "api64.ipify.org") {
      return new Response(JSON.stringify({ ip: "127.0.0.1" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (new URL(url).pathname === "/api/challenge") {
      return new Response(
        JSON.stringify({
          challenge: "test",
          challengeId: "challenge-id",
          expiresAt: Date.now() + 60_000,
          version: "1",
          difficulty: 0,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    seenHeaders.push((init?.headers ?? {}) as Record<string, string>);
    return new Response("upstream body", { status: 200 });
  }) as typeof fetch;

  try {
    await new TinyCmsExecutor().execute({
      model: "gpt-5-free",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "Rtest-device" },
    });

    assert.equal(seenHeaders.length, 1, "the executor must reach the chat endpoint exactly once");
    const headers = seenHeaders[0]!;
    assert.match(
      headers["x-secure-nonce"] ?? "",
      UUID_RE,
      "x-secure-nonce must be a crypto-strong UUID, never a Math.random() fallback"
    );
    assert.match(
      headers["x-session-id"] ?? "",
      UUID_RE,
      "x-session-id must be a crypto-strong UUID, never a Math.random() fallback"
    );
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(globalThis, "crypto", originalCryptoDescriptor);
  }
});

test("consecutive TinyCMS nonces are unique", async () => {
  const originalFetch = globalThis.fetch;
  const nonces: string[] = [];

  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    if (new URL(url).hostname === "api64.ipify.org") {
      return new Response(JSON.stringify({ ip: "127.0.0.1" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (new URL(url).pathname === "/api/challenge") {
      return new Response(
        JSON.stringify({
          challenge: "test",
          challengeId: "challenge-id",
          expiresAt: Date.now() + 60_000,
          version: "1",
          difficulty: 0,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    nonces.push(((init?.headers ?? {}) as Record<string, string>)["x-secure-nonce"] ?? "");
    return new Response("upstream body", { status: 200 });
  }) as typeof fetch;

  try {
    const executor = new TinyCmsExecutor();
    for (let i = 0; i < 3; i += 1) {
      await executor.execute({
        model: "gpt-5-free",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "Rtest-device" },
      });
    }
    assert.equal(nonces.length, 3);
    assert.equal(new Set(nonces).size, 3, "each request must carry a distinct nonce");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
