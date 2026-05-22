/**
 * T-04 fetch-interceptor contract tests.
 *
 * Covers `createOmniRouteFetchInterceptor` (URL-prefix gating, header merge,
 * Content-Type defaulting, input-shape polymorphism) plus the loader
 * integration that wires it into the AuthHook return shape.
 *
 * Strategy: replace `globalThis.fetch` with a closure-based recorder for the
 * duration of each test (saved-and-restored in try/finally — node:test has
 * no built-in spy/restore lifecycle). The recorder captures `(input, init)`
 * as observed by the wrapped global call so we can assert on what was
 * forwarded after header injection.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createOmniRouteAuthHook, createOmniRouteFetchInterceptor } from "../src/index.js";

type FetchCall = { input: Parameters<typeof fetch>[0]; init?: RequestInit };

function installFetchRecorder(response: Response = new Response("ok")) {
  const calls: FetchCall[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: any, init?: any) => {
    calls.push({ input, init });
    return response;
  }) as typeof fetch;
  const restore = () => {
    globalThis.fetch = original;
  };
  return { calls, restore };
}

const BASE = "https://or.example.com/v1";
const KEY = "sk-test-fetch";

test("createOmniRouteFetchInterceptor: targets baseURL → Authorization header injected", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f(`${BASE}/chat/completions`, {
      method: "POST",
      body: JSON.stringify({ x: 1 }),
    });
    assert.equal(calls.length, 1);
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: targets baseURL → Authorization OVERRIDES caller-supplied Bearer", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f(`${BASE}/chat/completions`, {
      method: "POST",
      body: "{}",
      headers: { Authorization: "Bearer attacker-key" },
    });
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    // We own the apiKey for this provider — caller-supplied Bearer must lose.
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: targets baseURL + body → Content-Type defaults to application/json", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f(`${BASE}/chat/completions`, {
      method: "POST",
      body: JSON.stringify({ m: "x" }),
    });
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Content-Type"), "application/json");
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: caller-set Content-Type is NOT overwritten", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f(`${BASE}/v2/whatever`, {
      method: "POST",
      body: "raw",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Content-Type"), "text/plain; charset=utf-8");
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: non-baseURL host → passthrough, no Authorization injected", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f("https://third-party.example.org/v1/chat", {
      method: "POST",
      body: "{}",
      headers: { "X-Caller": "yes" },
    });
    const sent = calls[0]!;
    // Init forwarded verbatim — no header injection.
    const sentHeaders = new Headers((sent.init as RequestInit | undefined)?.headers);
    assert.equal(sentHeaders.get("Authorization"), null, "MUST NOT leak apiKey");
    assert.equal(sentHeaders.get("X-Caller"), "yes");
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: refuses suffix-spoof — `${base}-attacker.evil` does NOT match baseURL", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    // baseURL is `https://or.example.com/v1`. A spoofed
    // `https://or.example.com/v1-attacker.evil/chat` shares the literal prefix
    // but is NOT under our origin path — must be treated as passthrough.
    await f("https://or.example.com/v1-attacker.evil/chat", {
      method: "POST",
      body: "{}",
    });
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit | undefined)?.headers);
    assert.equal(sentHeaders.get("Authorization"), null);
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: URL object input is handled", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f(new URL(`${BASE}/models`), {});
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: Request input is handled (reads .url)", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    const req = new Request(`${BASE}/chat/completions`, {
      method: "POST",
      body: JSON.stringify({ a: 1 }),
      headers: { "X-Caller": "preserved" },
    });
    await f(req);
    const sent = calls[0]!;
    // The interceptor forwards the original Request as `input` but layers our
    // headers into the `init`. We assert against the init view since fetch()
    // resolves headers from init first when both are present.
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
    assert.equal(
      sentHeaders.get("X-Caller"),
      "preserved",
      "Request-attached headers must survive the merge"
    );
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: trailing slash in baseURL is normalized", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({
      apiKey: KEY,
      baseURL: `${BASE}////`,
    });
    await f(`${BASE}/models`, {});
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
  } finally {
    restore();
  }
});

test("createOmniRouteFetchInterceptor: GET without body does NOT set Content-Type", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE });
    await f(`${BASE}/models`); // no init at all
    const sent = calls[0]!;
    const sentHeaders = new Headers((sent.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
    assert.equal(
      sentHeaders.get("Content-Type"),
      null,
      "Content-Type should only default when a body exists"
    );
  } finally {
    restore();
  }
});

// ----------------------------------------------------------------------------
// loader integration
// ----------------------------------------------------------------------------

test("loader: returns fetch fn when apiKey + baseURL both present (via opts)", async () => {
  const hook = createOmniRouteAuthHook({ baseURL: BASE });
  const result = await hook.loader!(async () => ({ type: "api", key: KEY }) as never, {} as never);
  assert.equal((result as { apiKey: string }).apiKey, KEY);
  assert.equal((result as { baseURL: string }).baseURL, BASE);
  assert.equal(
    typeof (result as { fetch?: unknown }).fetch,
    "function",
    "loader must wire fetch interceptor when baseURL resolves"
  );
});

test("loader: returns fetch fn when baseURL is stashed on the auth credential", async () => {
  // Some auth backends attach baseURL alongside the key (post-/connect flow).
  // The loader should pick it up even when plugin opts.baseURL is unset.
  const hook = createOmniRouteAuthHook();
  const result = await hook.loader!(
    async () => ({ type: "api", key: KEY, baseURL: BASE }) as never,
    {} as never
  );
  assert.equal((result as { baseURL?: string }).baseURL, BASE);
  assert.equal(typeof (result as { fetch?: unknown }).fetch, "function");
});

test("loader: omits fetch fn when baseURL missing (apiKey-only return)", async () => {
  const hook = createOmniRouteAuthHook(); // no baseURL opt
  const result = await hook.loader!(async () => ({ type: "api", key: KEY }) as never, {} as never);
  // Interceptor needs a baseURL to gate-keep; without one, fall back to
  // apiKey-only and let the SDK use its default fetch.
  assert.deepEqual(result, { apiKey: KEY });
});

test("loader integration: wired interceptor actually injects Bearer when invoked", async () => {
  // End-to-end: pull the fetch fn out of the loader return and exercise it,
  // proving the wiring matches the standalone interceptor's contract.
  const { calls, restore } = installFetchRecorder();
  try {
    const hook = createOmniRouteAuthHook({ baseURL: BASE });
    const result = await hook.loader!(
      async () => ({ type: "api", key: KEY }) as never,
      {} as never
    );
    const wiredFetch = (result as { fetch: typeof fetch }).fetch;
    await wiredFetch(`${BASE}/v1/models`, {});
    assert.equal(calls.length, 1);
    const sentHeaders = new Headers((calls[0]!.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), `Bearer ${KEY}`);
  } finally {
    restore();
  }
});
