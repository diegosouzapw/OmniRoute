/**
 * GHSA-9m72-44hg-w32g — the standalone bifrost relay route copied ALL upstream
 * response headers (`new Headers(upstream.headers)`) and returned non-2xx bodies
 * verbatim, while its TypeScript sibling routed non-2xx through
 * parseUpstreamError + buildErrorBody + stripStaleEncodingHeaders.
 *
 * The relay sends `Authorization: Bearer ${BIFROST_API_KEY}` to the sidecar, so
 * anything the sidecar (or a further upstream) echoes back — that header, its own
 * `set-cookie`, an `x-api-key` — reached the relay-token holder untouched.
 *
 * Both relay routes copy upstream headers, so the strip is a shared helper used
 * by both rather than a fix in one and a second copy waiting to drift (the
 * failure mode of GHSA-v7g9 and GHSA-qv45).
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/bifrost-relay-response-leak-9m72.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { stripSensitiveResponseHeaders } from "../../open-sse/utils/upstreamResponseHeaders.ts";

const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(`../../${rel}`, import.meta.url)), "utf8");

const BIFROST_ROUTE = "src/app/api/v1/relay/chat/completions/bifrost/route.ts";
const TS_ROUTE = "src/app/api/v1/relay/chat/completions/route.ts";

describe("stripSensitiveResponseHeaders", () => {
  it("drops credentials and cookies the upstream echoed back", () => {
    const upstream = new Headers([
      ["authorization", "Bearer sidecar-secret"],
      ["x-api-key", "op-key"],
      ["x-goog-api-key", "goog-key"],
      ["api-key", "azure-key"],
      ["cookie", "session=abc"],
      ["set-cookie", "session=abc; HttpOnly"],
      ["proxy-authorization", "Basic zzz"],
      ["content-type", "application/json"],
      ["x-request-id", "keep-me"],
    ]);
    const out = stripSensitiveResponseHeaders(upstream);
    for (const gone of [
      "authorization",
      "x-api-key",
      "x-goog-api-key",
      "api-key",
      "cookie",
      "set-cookie",
      "proxy-authorization",
    ]) {
      assert.equal(out.get(gone), null, `${gone} survived`);
    }
    assert.equal(out.get("content-type"), "application/json");
    assert.equal(out.get("x-request-id"), "keep-me");
  });

  it("also drops the stale framing headers", () => {
    const out = stripSensitiveResponseHeaders(
      new Headers([
        ["content-encoding", "gzip"],
        ["content-length", "123"],
        ["transfer-encoding", "chunked"],
        ["x-keep", "yes"],
      ])
    );
    assert.equal(out.get("content-encoding"), null);
    assert.equal(out.get("content-length"), null);
    assert.equal(out.get("transfer-encoding"), null);
    assert.equal(out.get("x-keep"), "yes");
  });

  it("does not mutate the input Headers", () => {
    const input = new Headers([["authorization", "Bearer x"]]);
    stripSensitiveResponseHeaders(input);
    assert.equal(input.get("authorization"), "Bearer x");
  });
});

describe("both relay routes use the shared strip (GHSA-9m72-44hg-w32g)", () => {
  for (const route of [BIFROST_ROUTE, TS_ROUTE]) {
    it(`${route} strips sensitive upstream response headers`, () => {
      const src = read(route);
      assert.ok(
        src.includes("stripSensitiveResponseHeaders"),
        `${route} relays upstream headers verbatim — a sidecar-echoed credential reaches the caller`
      );
      assert.ok(
        !/new Headers\(upstream\.headers\)/.test(src),
        `${route} still copies upstream headers wholesale`
      );
    });
  }

  it("the bifrost route normalizes non-2xx through the error sanitizer", () => {
    const src = read(BIFROST_ROUTE);
    assert.ok(src.includes("buildErrorBody"), "bifrost non-2xx must not be relayed verbatim");
    assert.ok(src.includes("sanitizeErrorMessage"), "bifrost non-2xx must be sanitized (HR#12)");
  });
});
