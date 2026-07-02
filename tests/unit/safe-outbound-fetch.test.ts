import test from "node:test";
import assert from "node:assert/strict";

const { SafeOutboundFetchError, safeOutboundFetch } =
  await import("../../src/shared/network/safeOutboundFetch.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("safeOutboundFetch retries transient failures for idempotent methods", async () => {
  let attempts = 0;

  globalThis.fetch = async () => {
    attempts += 1;
    if (attempts === 1) {
      throw new Error("socket hang up");
    }

    return Response.json({ ok: true });
  };

  const response = await safeOutboundFetch("https://example.test/models", {
    method: "GET",
    timeoutMs: 100,
    retry: {
      attempts: 2,
      backoffMs: [0],
      methods: ["GET"],
    },
  });

  assert.equal(attempts, 2);
  assert.deepEqual(await response.json(), { ok: true });
});

test("safeOutboundFetch normalizes timeout failures", async () => {
  globalThis.fetch = async (_url, init = {}) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener(
        "abort",
        () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        },
        { once: true }
      );
    });

  await assert.rejects(
    safeOutboundFetch("https://example.test/slow", {
      method: "GET",
      timeoutMs: 5,
      retry: false,
    }),
    (error) => {
      assert.equal(error instanceof SafeOutboundFetchError, true);
      assert.equal((error as any).code, "TIMEOUT");
      (assert as any).equal((error as any).timeoutMs, 5);
      (assert as any).equal((error as any).url, "https://example.test/slow");
      return true;
    }
  );
});

test("safeOutboundFetch blocks redirects when allowRedirect is disabled", async () => {
  globalThis.fetch = async () =>
    new Response(null, {
      status: 302,
      headers: { location: "https://redirect.example.test/login" },
    });

  await assert.rejects(
    safeOutboundFetch("https://example.test/models", {
      method: "GET",
      timeoutMs: 25,
      retry: false,
    }),
    (error) => {
      assert.equal(error instanceof SafeOutboundFetchError, true);
      assert.equal((error as any).code, "REDIRECT_BLOCKED");
      assert.equal((error as any).status, 302);
      assert.equal((error as any).location, "https://redirect.example.test/login");
      return true;
    }
  );
});

test("safeOutboundFetch blocks private hosts when public-only guard is enabled", async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ ok: true });
  };

  await assert.rejects(
    safeOutboundFetch("http://127.0.0.1:11434/models", {
      method: "GET",
      guard: "public-only",
      retry: false,
    }),
    (error) => {
      assert.equal(error instanceof SafeOutboundFetchError, true);
      assert.equal((error as any).code, "URL_GUARD_BLOCKED");
      assert.equal(called, false);
      return true;
    }
  );
});
