// `FORBIDDEN` in src/shared/constants/upstreamHeaders.ts is documented as the
// hop-by-hop / Host / framing denylist, and it was missing two of the RFC 7230
// §6.1 names. Measured before the fix:
//
//   proxy-authorization   upstream=allow  custom=allow
//   proxy-authenticate    upstream=allow  custom=allow
//   proxy-connection      upstream=BLOCK  custom=BLOCK
//
// `proxy-authorization` is the one that costs something: it authenticates the
// hop to the operator's own proxy, so forwarding it hands that credential to
// the model provider. Five other modules in this repo already strip it
// (reverseProxy HOP_BY_HOP, mitm/sanitizeHeaders, inspector/httpProxyServer,
// tproxy/tlsCapture, openapi/try) — the canonical list did not.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "../../../src/shared/constants/upstreamHeaders.ts";
import { HOP_BY_HOP } from "../../../src/lib/services/reverseProxy.ts";
import { sanitizeUpstreamHeadersMap } from "../../../src/lib/db/models.ts";

test("proxy-authorization and proxy-authenticate are refused", () => {
  for (const name of ["proxy-authorization", "proxy-authenticate"]) {
    assert.equal(isForbiddenUpstreamHeaderName(name), true, name);
    assert.equal(isForbiddenCustomHeaderName(name), true, name);
  }
});

test("the refusal is case-insensitive, like every other name in the list", () => {
  for (const name of ["Proxy-Authorization", "PROXY-AUTHENTICATE", "  Proxy-Authorization  "]) {
    assert.equal(isForbiddenUpstreamHeaderName(name), true, name);
  }
});

test("sanitizeUpstreamHeadersMap drops them and keeps the rest", () => {
  const out = sanitizeUpstreamHeadersMap({
    "Proxy-Authorization": "Basic c2VjcmV0",
    "Proxy-Authenticate": "Basic realm=x",
    "X-Custom": "ok",
  });

  assert.deepEqual(out, { "X-Custom": "ok" });
});

test("the canonical list now covers every hop-by-hop name reverseProxy strips", () => {
  // `reverseProxy.HOP_BY_HOP` is the repo's own RFC 7230 §6.1 list. The two
  // lists drifting apart is what this fix repairs, so compare them directly —
  // `trailers` is the TE token, spelled `trailer` as a header name.
  const missing = [...HOP_BY_HOP]
    .map((name) => (name === "trailers" ? "trailer" : name))
    .filter((name) => !isForbiddenUpstreamHeaderName(name));

  assert.deepEqual(missing, []);
});

test("ordinary headers are still allowed", () => {
  for (const name of ["x-custom", "x-forwarded-for", "user-agent", "accept"]) {
    assert.equal(isForbiddenUpstreamHeaderName(name), false, name);
  }
  // Auth headers stay allowed as *upstream* headers (the credential layer owns
  // them) while remaining forbidden as operator-supplied custom headers.
  assert.equal(isForbiddenUpstreamHeaderName("authorization"), false);
  assert.equal(isForbiddenCustomHeaderName("authorization"), true);
});
