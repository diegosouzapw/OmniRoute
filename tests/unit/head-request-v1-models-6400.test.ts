import { describe, it } from "node:test";
import assert from "node:assert/strict";

import * as modelsRoute from "../../src/app/api/v1/models/route";

/**
 * Regression test for issue #6400.
 *
 * Before the fix, `src/app/api/v1/models/route.ts` exported only `OPTIONS` and
 * `GET`. Next.js 16 App Router auto-derives `HEAD` from `GET` when no explicit
 * handler exists, and the derived `HEAD` streams the full `GET` body (which
 * the client discards). Because `getUnifiedModelsResponse()` enumerates 200+
 * providers on-demand, the body stream stayed open ~6s — clients issuing HEAD
 * as an availability probe (OpenAI SDK, openai-python, httpx, gateway
 * health-checkers) stalled until their timeout fired.
 *
 * RFC 9110 §9.3.2: HEAD MUST close after the headers.
 *
 * Fix: explicit `HEAD` handler that returns `{ status: 200, body: null }`, and
 * `OPTIONS` advertises `HEAD` in `Access-Control-Allow-Methods`.
 */
describe("issue #6400 — HEAD /v1/models returns immediately", () => {
  it("exports an explicit HEAD handler", () => {
    assert.equal(
      typeof (modelsRoute as { HEAD?: unknown }).HEAD,
      "function",
      "HEAD export missing — Next.js will auto-derive from GET and stream the body"
    );
  });

  it("HEAD returns 200 with a null body (no streaming)", async () => {
    const head = (modelsRoute as unknown as {
      HEAD: () => Promise<Response>;
    }).HEAD;
    const response = await head();
    assert.equal(response.status, 200);
    assert.equal(response.body, null, "HEAD body must be null per RFC 9110 §9.3.2");
  });

  it("OPTIONS advertises HEAD in Access-Control-Allow-Methods", async () => {
    const response = await modelsRoute.OPTIONS();
    const methods = response.headers.get("Access-Control-Allow-Methods") ?? "";
    assert.ok(
      /\bHEAD\b/.test(methods),
      `expected HEAD in Access-Control-Allow-Methods, got: ${methods}`
    );
  });
});
