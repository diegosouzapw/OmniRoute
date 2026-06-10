/**
 * Regression guard — CodeQL js/request-forgery alert #323 (v3.8.13).
 *
 * POST /api/providers fires a non-blocking self-fetch to the connection's
 * /sync-models route, forwarding the management cookie + internal sync auth
 * headers. #3267 built that self-fetch origin from `new URL(request.url).origin`
 * — i.e. the client-controlled Host header — so a caller could redirect the
 * credential-bearing internal request to an arbitrary host (SSRF + internal
 * auth-header exfiltration).
 *
 * The origin must come from the trusted loopback/env-pinned base URL
 * (`getModelSyncInternalBaseUrl()`), never from the incoming request.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const routeSrc = readFileSync(
  join(import.meta.dirname, "../../src/app/api/providers/route.ts"),
  "utf8"
);

test("POST /api/providers auto-sync uses the trusted internal origin (not request.url) — #323", () => {
  assert.ok(
    routeSrc.includes("getModelSyncInternalBaseUrl()"),
    "auto-sync self-fetch must derive its origin from getModelSyncInternalBaseUrl()"
  );
  assert.doesNotMatch(
    routeSrc,
    /const\s+internalOrigin\s*=\s*new URL\(request\.url\)\.origin/,
    "auto-sync origin must NOT be derived from the client-controlled request.url/Host (SSRF, CodeQL js/request-forgery #323)"
  );
});
