import test from "node:test";
import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;
const originalTimeoutEnv = process.env.FETCH_TIMEOUT_MS;

async function loadFetchTimeoutModule(tag) {
  return import(`../../src/shared/utils/fetchTimeout.ts?case=${tag}-${Date.now()}`);
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalTimeoutEnv === undefined) {
    delete process.env.FETCH_TIMEOUT_MS;
  } else {
    process.env.FETCH_TIMEOUT_MS = originalTimeoutEnv;
  }
});

test("fetchWithTimeout forwards options and exposes the configured timeout", async () => {
  process.env.FETCH_TIMEOUT_MS = "3210";
  const mod = await loadFetchTimeoutModule("configured-timeout");

  let seenUrl = null;
  let seenOptions = null;
  const expectedResponse = { ok: true, status: 204 };

  globalThis.fetch = async (url, options) => {
    seenUrl = url;
    seenOptions = options;
    return expectedResponse;
  };

  const response = await mod.fetchWithTimeout("https://example.test/ping", {
    method: "POST",
    headers: { "x-test": "1" },
  });

  assert.equal(mod.getConfiguredTimeout(), 3210);
  assert.equal(response, expectedResponse);
  assert.equal(seenUrl, "https://example.test/ping");
  assert.equal(seenOptions.method, "POST");
  assert.equal(seenOptions.headers["x-test"], "1");
  assert.equal(seenOptions.signal instanceof AbortSignal, true);
});

test("fetchWithTimeout converts both pre-aborted and externally aborted requests into FetchTimeoutError", async () => {
  const mod = await loadFetchTimeoutModule("abort");

  const preAborted = new AbortController();
  preAborted.abort();

  globalThis.fetch = async (_url, options) => {
    assert.equal(options.signal.aborted, true);
    const error = new Error("aborted");
    error.name = "AbortError";
    throw error;
  };

  await assert.rejects(
    mod.fetchWithTimeout("https://example.test/pre-aborted", {
      signal: preAborted.signal,
      timeoutMs: 9,
    }),
    (error) => {
      assert.equal(error instanceof mod.FetchTimeoutError, true);
      assert.equal(error.timeoutMs, 9);
      assert.equal(error.url, "https://example.test/pre-aborted");
      assert.match(error.message, /timed out after 9ms/);
      return true;
    }
  );

  const external = new AbortController();
  let fetchSawSignal = false;

  globalThis.fetch = async (_url, options) => {
    fetchSawSignal = true;
    setTimeout(() => external.abort(), 0);
    await new Promise((resolve) => setTimeout(resolve, 5));
    const error = new Error("aborted later");
    error.name = "AbortError";
    throw error;
  };

  await assert.rejects(
    mod.fetchWithTimeout("https://example.test/external-abort", {
      signal: external.signal,
      timeoutMs: 15,
    }),
    (error) => {
      assert.equal(fetchSawSignal, true);
      assert.equal(error instanceof mod.FetchTimeoutError, true);
      assert.equal(error.timeoutMs, 15);
      assert.equal(error.url, "https://example.test/external-abort");
      return true;
    }
  );
});

test("fetchWithTimeout rethrows non-timeout failures unchanged", async () => {
  const mod = await loadFetchTimeoutModule("generic-error");
  const failure = new Error("network down");

  globalThis.fetch = async () => {
    throw failure;
  };

  await assert.rejects(
    mod.fetchWithTimeout("https://example.test/fail", { timeoutMs: 5 }),
    (error) => error === failure
  );
});
