/**
 * Regression test for issue #14480.
 *
 * tests/unit/executor-web-cookie-sweep.test.ts calls every WEB_COOKIE_PROVIDERS
 * executor with `credentials: { apiKey: FAKE_CREDS[providerId] ?? "fake" }` and
 * claims in its own header comment "no real upstream call is needed". Until this
 * fix, tencent-aistudio-web had no FAKE_CREDS entry (see
 * tests/unit/fixtures/web-cookie-fake-creds.fixture.ts), so it received the
 * fallback literal string "fake", which is truthy and passes the executor's only
 * input check (`if (!cookie) { ...401... }` in
 * open-sse/executors/tencent-aistudio-web.ts), so the executor proceeded to a
 * REAL `fetch()` against https://aistudio.tencent.ai — hanging the shard for
 * ~70s on network-isolated runners.
 *
 * This test imports the SAME fixture the sweep test uses, mocks global.fetch,
 * and invokes the executor exactly the way the sweep test invokes every
 * WEB_COOKIE_PROVIDERS executor. It asserts fetch is never called — proving
 * the sweep's own "no real upstream call is needed" claim holds for this
 * provider — and that the short-circuit response still honors the executor
 * wrapper contract.
 */
import { describe, it, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { FAKE_CREDS } from "./fixtures/web-cookie-fake-creds.fixture.ts";

const VALID_BODY = {
  model: "test",
  messages: [{ role: "user", content: "ping" }],
};

describe("#14480 — tencent-aistudio-web must not make a real upstream call from the sweep's fake creds", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("does not call fetch() when given the sweep test's FAKE_CREDS value for tencent-aistudio-web", async () => {
    const fetchMock = mock.fn(async () => {
      return new Response(JSON.stringify({ error: "stubbed" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    });
    // @ts-expect-error - stubbing global fetch for the test
    global.fetch = fetchMock;

    const executor = await getExecutor("tencent-aistudio-web");
    assert.ok(executor, "getExecutor must return an executor for tencent-aistudio-web");

    const result = await executor.execute({
      model: "tencent-aistudio-web",
      body: VALID_BODY,
      stream: false,
      // Exactly how executor-web-cookie-sweep.test.ts invokes every
      // WEB_COOKIE_PROVIDERS executor: FAKE_CREDS["tencent-aistudio-web"] ?? "fake".
      credentials: { apiKey: FAKE_CREDS["tencent-aistudio-web"] ?? "fake" },
      signal: null,
    } as never);

    assert.equal(
      fetchMock.mock.calls.length,
      0,
      "tencent-aistudio-web executor made a REAL fetch() call when given the sweep " +
        `test's FAKE_CREDS fallback (attempted URL: ${
          fetchMock.mock.calls[0] ? String(fetchMock.mock.calls[0].arguments[0]) : "n/a"
        }) — on a network-isolated runner this hangs the shard (issue #14480).`
    );

    // The executor must still honor its wrapper contract on the short-circuit path.
    assert.ok(result.response instanceof Response, "result.response must be a Response");
    assert.equal(result.response.status, 401, "short-circuit path must return 401");
  });
});
